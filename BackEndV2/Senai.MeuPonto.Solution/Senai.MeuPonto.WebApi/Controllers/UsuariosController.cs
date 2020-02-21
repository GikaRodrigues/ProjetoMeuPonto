using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.MeuPonto.WebApi.Domains;
using Senai.MeuPonto.WebApi.Interfaces;
using Senai.MeuPonto.WebApi.Repositorios;


namespace Senai.MeuPonto.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/Json")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private IUsuariosRepositorio usuarioRepositorio { get; set; }

        public UsuariosController()
        {
            usuarioRepositorio = new UsuariosRepositorio();
        }

        /// <summary>
        /// Método que lista todos os Usuários cadastrados
        /// </summary>
        /// <returns>Lista de Usuários</returns>
        [HttpGet]
        public IActionResult ListarUsuarios()
        {
            return Ok(usuarioRepositorio.ListarUsuarios());
        }

        /// <summary>
        /// Método para cadastrar novos Usuários
        /// </summary>
        /// <param name="usuarios"></param>
        /// <returns>Ok</returns>
        [HttpPost]
        public IActionResult Cadastrar(Usuarios usuarios)
        {
            try
            {
                usuarioRepositorio.Cadastrar(usuarios);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        /// <summary>
        /// Método que exclui um Usuário passando seu "Id"
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Ok</returns>
        [HttpDelete("{id}")]
        public IActionResult DeletarUsuario(int id)
        {
            try
            {
                usuarioRepositorio.Deletar(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Método responsável por listar apenas Usuários inativos("Ativo" == false)
        /// </summary>
        /// <returns>Ok</returns>
        [HttpGet("Pendentes")]
        public IActionResult ListarPendentes()
        {
            return Ok(usuarioRepositorio.ListarPendentes());
        }

        /// <summary>
        /// Método responsável por listar apenas Usuários ativos("Ativo" == true)
        /// </summary>
        /// <returns>Ok</returns>
        [HttpGet("Ativos")]
        public IActionResult ListarAtivos()
        {
            return Ok(usuarioRepositorio.ListarAtivos());
        }

        /// <summary>
        /// Método para atualizar os status(campo "Ativo") dos Usuários cadastrados
        /// </summary>
        /// <param name="usuario"></param>
        /// <param name="id"></param>
        /// <returns>Ok</returns>
        [HttpPut("{id}")]
        public IActionResult Atualizar(Usuarios usuario, int id)
        {
            try
            {
                Usuarios UsuarioBuscado = usuarioRepositorio.BuscarPorId
                    (id);
                if (UsuarioBuscado == null)
                    return NotFound();

                usuario.IdUsuario = id;
                usuarioRepositorio.Atualizar(usuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

    }
}