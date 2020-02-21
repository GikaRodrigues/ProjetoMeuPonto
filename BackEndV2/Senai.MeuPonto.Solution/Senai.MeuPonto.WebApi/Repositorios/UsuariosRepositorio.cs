using Microsoft.EntityFrameworkCore;
using Senai.MeuPonto.WebApi.Domains;
using Senai.MeuPonto.WebApi.Interfaces;
using Senai.MeuPonto.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.MeuPonto.WebApi.Repositorios
{
    public class UsuariosRepositorio : IUsuariosRepositorio
    {
        /// <summary>
        /// Método para inserir um novo Usuário
        /// </summary>
        /// <param name="usuario"></param>
        public void Cadastrar(Usuarios usuario)
        {
            using (PontoContext ctx = new PontoContext())
            {
                usuario.Tipo = "COMUM";
                usuario.Ativo = false;
                ctx.Usuarios.Add(usuario);
                ctx.SaveChanges();
            }
        }

        /// <summary>
        /// Método para excluir um Usuário existente passando seu "Id"
        /// </summary>
        /// <param name="id"></param>
        public void Deletar(int id)
        {
            using (PontoContext ctx = new PontoContext())
            {
                Usuarios usuario = ctx.Usuarios.Find(id);
                ctx.Usuarios.Remove(usuario);
                ctx.SaveChanges();
            }
        }

        /// <summary>
        /// Método que efetua o login de um Usuário recebendo seu email e senha
        /// </summary>
        /// <param name="login"></param>
        /// <returns>Usuário</returns>
        public Usuarios EfetuarLogin(LoginViewModel login)
        {
            using (PontoContext ctx = new PontoContext())
            {
                Usuarios usuario = ctx.Usuarios.FirstOrDefault(x => x.Email == login.Email && x.Senha == login.Senha);
                if (usuario == null || usuario.Ativo == false)
                {
                    return null;
                }
                return usuario;
            }
        }

        /// <summary>
        /// Método que retorna uma lista de Usuários cadastrados
        /// </summary>
        /// <returns>Lista de Usuários</returns>
        public List<Usuarios> ListarUsuarios()
        {
            using (PontoContext ctx = new PontoContext())
            {
                return ctx.Usuarios.ToList();
            }
        }

        /// <summary>
        /// Método que lista apenas Usários inativos("Ativo" == false)
        /// </summary>
        /// <returns>Lista de Usuários</returns>
        public List<Usuarios> ListarPendentes()
        {
            using (PontoContext ctx = new PontoContext())
            {
                return ctx.Usuarios.Where(x => x.Ativo == false).ToList();
            }
        }

        /// <summary>
        /// Método que lista apenas Usuários ativos("Ativo" == true)
        /// </summary>
        /// <returns>Lista de Usuários</returns>
        public List<Usuarios> ListarAtivos()
        {
            using (PontoContext ctx = new PontoContext())
            {
                return ctx.Usuarios.Where(x => x.Ativo == true).ToList();
            }
        }

        /// <summary>
        /// Método que atualiza um Usuário pelo seu campo "Ativo"
        /// </summary>
        /// <param name="usuario"></param>
        public void Atualizar(Usuarios usuario)
        {
            using (PontoContext ctx = new PontoContext())
            {
                Usuarios usuarioBuscado = ctx.Usuarios.FirstOrDefault(x => x.IdUsuario == usuario.IdUsuario);
                usuarioBuscado.Ativo = usuario.Ativo;
                ctx.Usuarios.Update(usuarioBuscado);
                ctx.SaveChanges();
            }
        }

        /// <summary>
        /// Método que busca um Usuário pelo seu "Id"
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Usuário</returns>
        public Usuarios BuscarPorId(int id)
        {
            using (PontoContext ctx = new PontoContext())
            {
                return ctx.Usuarios.FirstOrDefault(x => x.IdUsuario == id);
            }
        }
    }
}