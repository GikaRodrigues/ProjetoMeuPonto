using Microsoft.EntityFrameworkCore;
using Senai.MeuPonto.WebApi.Domains;
using Senai.MeuPonto.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.MeuPonto.WebApi.Repositorios
{
    public class PontosRepositorio : IPontosRepositorio
    {
        /// <summary>
        /// Método para inserir um novo Ponto
        /// </summary>
        /// <param name="ponto"></param>
        public void Cadastrar(Pontos ponto)
        {
            using(PontoContext ctx = new PontoContext())
            {
                ctx.Pontos.Add(ponto);
                ctx.SaveChanges();
            }
        }

        /// <summary>
        /// Método para listar os Pontos cadastrados junto com o "Id" do Usuário a quem ele pertence
        /// </summary>
        /// <returns>Lista de Pontos</returns>
        public List<Pontos> ListarPontos()
        {
            using(PontoContext ctx = new PontoContext())
            {
                return ctx.Pontos.Include(x => x.IdUsuarioNavigation).ToList();
            }
        }

        /// <summary>
        /// Método que lista os Pontos cadastrados por um Usuário
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Lista de Pontos</returns>
        public List<Pontos> BuscarPorUsuario(int id)
        {
            //List<Pontos> Pontos = new List<Pontos>();

            //using (SqlConnection con = new SqlConnection(StringConexao))
            //{
            //    string Query = "SELECT P.IdPonto , P.Tipo , P.Imagem , P.DataHorario , P.IdUsuario FROM Pontos P WHERE P.IdUsuario = @id";

            //    con.Open();

            //    SqlDataReader rdr;

            //    using (SqlCommand cmd = new SqlCommand(Query, con))
            //    {

            //        cmd.Parameters.AddWithValue("@Id", id);

            //        rdr = cmd.ExecuteReader();

            //        while (rdr.Read())
            //        {

            //            Pontos Ponto = new Pontos
            //            {
            //                IdPonto = Convert.ToInt32(rdr["EstudioId"]),
            //                Tipo = rdr["Tipoo"].ToString(),
            //                 Imagem= rdr["Imagem"].ToString(),
            //                 DataHorario = Convert.ToDateTime(rdr["DataHorario"]),

            //            };
            //            Pontos.Add(Ponto);
            //        };
            //    }
            //}
            //return Pontos;

            using (PontoContext ctx = new PontoContext())
            {
                return ctx.Pontos.Where(x => x.IdUsuario == id).Include(x => x.IdUsuarioNavigation).ToList();
            }
        }

        public Pontos BuscarPontoPorId(int id)
        {
            using(PontoContext ctx = new PontoContext())
            {
                return ctx.Pontos.FirstOrDefault(x => x.IdPonto == id);
            }
        }

        public void AtualizarPontoImagem(Pontos ponto)
        {
            using(PontoContext ctx = new PontoContext())
            {
                Pontos pontoBuscado = ctx.Pontos.FirstOrDefault(x => x.IdPonto == ponto.IdPonto);
                pontoBuscado.Imagem = ponto.Imagem;
                ctx.Pontos.Update(ponto);
                ctx.SaveChanges();
            }
        }
    }
}
