using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.MeuPonto.WebApi.ViewModels
{
    public class LoginViewModel
    {
        /// <summary>
        /// Campos de Usuários requiridos na hora de eftuar o login 
        /// </summary>
        [Required]
        public string Email { get; set; }
        [Required]
        public string Senha { get; set; }
    }
}
