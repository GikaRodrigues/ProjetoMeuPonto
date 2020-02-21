using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;

namespace Senai.MeuPonto.WebApi.Domains
{
    public class Pontos
    {
        public int IdPonto { get; set; }
        public int? IdUsuario { get; set; }
        public DateTime DataHorario { get; set; }
        public string Tipo { get; set; }
        public string Imagem { get; set; }

        public Usuarios IdUsuarioNavigation { get; set; }
    }
}
