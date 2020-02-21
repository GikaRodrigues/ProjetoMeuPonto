using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Senai.MeuPonto.WebApi.Domains;
using Senai.MeuPonto.WebApi.Interfaces;
using Senai.MeuPonto.WebApi.Repositorios;
using Senai.MeuPonto.WebApi.ViewModels;

namespace Senai.MeuPonto.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/Json")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuariosRepositorio usuarioRepositorio { get; set; }

        public LoginController()
        {
            usuarioRepositorio = new UsuariosRepositorio();
        }

        /// <summary>
        /// Método responsável por fazer o login de Usuário
        /// </summary>
        /// <param name="login"></param>
        /// <returns>Usuário</returns>
        [HttpPost]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                Usuarios usuarios = usuarioRepositorio.EfetuarLogin(login);
                if (usuarios == null)
                {
                    return NotFound(new { mensagem = "Usuario ou senha invalidos" });
                }

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuarios.Email),
                    new Claim(JwtRegisteredClaimNames.Gender, usuarios.Nome),
                    new Claim("cpf", usuarios.Cpf),
                    new Claim(JwtRegisteredClaimNames.Prn, usuarios.Ni),
                    new Claim("chave", "valor"),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarios.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Role, usuarios.Tipo),
                    new Claim("Permissao", usuarios.Tipo)
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("chave-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "MeuPonto.WebApi",
                    audience: "MeuPonto.WebApi",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}