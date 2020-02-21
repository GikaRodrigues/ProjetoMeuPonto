using System;
using System.Collections.Generic;

namespace Senai.MeuPonto.WebApi.Domains
{
    public class Usuarios
    {
        public int IdUsuario { get; set; }
        public string Ni { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Tipo { get; set; }
        public bool? Ativo { get; set; }

        public ICollection<Pontos> Pontos { get; set; }

        public Usuarios()
        {
            Pontos = new HashSet<Pontos>();
        }
    }
}
