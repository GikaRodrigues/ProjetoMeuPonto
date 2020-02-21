using Senai.MeuPonto.WebApi.Domains;
using Senai.MeuPonto.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.MeuPonto.WebApi.Interfaces
{
    public interface IUsuariosRepositorio
    {
        Usuarios EfetuarLogin(LoginViewModel login);
        void Cadastrar(Usuarios usuario);
        List<Usuarios> ListarUsuarios();
        void Deletar(int id);
        List<Usuarios> ListarPendentes();
        List<Usuarios> ListarAtivos();
        void Atualizar(Usuarios usuario);
        Usuarios BuscarPorId(int id);
    }
}

