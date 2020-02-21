using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.MeuPonto.WebApi.Domains;
using Senai.MeuPonto.WebApi.Interfaces;
using Senai.MeuPonto.WebApi.Repositorios;
using Senai.MeuPonto.WebApi.ViewModels;

namespace Senai.MeuPonto.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/Json")]
    [ApiController]
    public class PontosController : ControllerBase
    {
        private IPontosRepositorio pontosRepositorio { get; set; }

        public PontosController()
        {
            pontosRepositorio = new PontosRepositorio();
        }

        /// <summary>
        /// Método responsável por listar todos os Pontos cadastrados
        /// </summary>
        /// <returns>Lista de Pontos</returns>
        [HttpGet]
        public IActionResult ListarPontos()
        {
            return Ok(pontosRepositorio.ListarPontos());
        }

        ///// <summary>
        ///// Método responsável por cadastrar novos Pontos
        ///// </summary>
        ///// <param name="pontos"></param>
        ///// <returns>Ok</returns>
        //[HttpPost]
        //public IActionResult CadastrarPontos(Pontos pontos)
        //{
        //    try
        //    {
        //        pontosRepositorio.Cadastrar(pontos);
        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

    

        /// <summary>
        /// Método que lista os Pontos cadastrados pelos Usuários
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Lista de Pontos</returns>
        [Authorize]
        [HttpGet("porusuario")]
        public IActionResult ListarPontosUsuarios()
        {
            try
            {
                var user = HttpContext.User;
                var idUsuario = user.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;

                var id = int.Parse(idUsuario);
                return Ok(pontosRepositorio.BuscarPorUsuario(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// método responsável por cadastrar novos pontos
        /// </summary>
        /// <param name="pontos"></param>
        /// <returns>ok</returns>  
        //[Authorize]
        [Consumes("multipart/form-data")]
        [HttpPost]
        public IActionResult CadastrarPontos(IFormFile foto, [FromForm] string tipo, [FromForm] string dataHora)
        {
            try
            {

                var ponto = new Pontos();


                if (foto != null && foto.Length > 0)
                {
                    // Extrai apenas o nome do arquivo
                    var fileName = Path.GetFileName(foto.FileName);

                    // Define o nome do arquivo
                    var NomeArquivo = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(fileName);


                    //Define um caminho para o arquivo
                    var CaminhoArquivo = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\uploads\\imgs", NomeArquivo);


                    using (var StreamImagem = new FileStream(CaminhoArquivo, FileMode.Create))
                    {
                        foto.CopyTo(StreamImagem);
                    }


                    ponto.Imagem = "wwwroot/uploads/imgs/" + NomeArquivo;
                }


                var id = HttpContext.User.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;
                var idUsuario = int.Parse(id);

                ponto.IdUsuario = Convert.ToInt32(idUsuario);
                ponto.Tipo = Convert.ToString(tipo);
                ponto.DataHorario = DateTime.Parse(Convert.ToString(dataHora));


                pontosRepositorio.Cadastrar(ponto);
                return Ok(ponto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}