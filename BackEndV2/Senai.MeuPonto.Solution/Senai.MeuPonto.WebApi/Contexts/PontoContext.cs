using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Senai.MeuPonto.WebApi.Domains
{
    public partial class PontoContext : DbContext
    {
        public PontoContext()
        {
        }

        public PontoContext(DbContextOptions<PontoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Pontos> Pontos { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=.\\SqlExpress3T; Initial Catalog=M_MeuPonto;User Id=sa;Pwd=sa132");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pontos>(entity =>
            {
                entity.HasKey(e => e.IdPonto);

                entity.Property(e => e.DataHorario).HasColumnType("datetime");

                entity.Property(e => e.Tipo)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Pontos)
                    .HasForeignKey(d => d.IdUsuario)
                    .HasConstraintName("FK__Pontos__IdUsuari__4D94879B");

                entity.Property(e => e.Imagem)
                   .IsRequired()
                   .HasColumnType("text");
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.HasKey(e => e.IdUsuario);

                entity.HasIndex(e => e.Cpf)
                    .HasName("UQ__Usuarios__C1F897319F62E2EB")
                    .IsUnique();

                entity.HasIndex(e => e.Email)
                    .HasName("UQ__Usuarios__A9D10534BA77533A")
                    .IsUnique();

                entity.Property(e => e.Cpf)
                    .IsRequired()
                    .HasColumnName("CPF")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Ni)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Tipo)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });
        }
    }
}
