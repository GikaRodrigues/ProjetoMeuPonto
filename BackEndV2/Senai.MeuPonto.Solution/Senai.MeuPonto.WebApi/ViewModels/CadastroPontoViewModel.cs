using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.MeuPonto.WebApi.ViewModels
{
    public class CadastroPontoViewModel
    {
        public int? IdUsuario { get; set; }
        public DateTime DataHorario { get; set; }
        public string Tipo { get; set; }
        public string Imagem { get; set; }
        public IFormFile Foto { get; set; }
    }
}
