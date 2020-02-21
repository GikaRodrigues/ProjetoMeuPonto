import React, { Component } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Modal from "react-responsive-modal";
import ErrorModal from "../../components/ErrorModal";
import SuccessModal from "../../components/SucessModal";
import iconeAceitar from "../../assets/icons/accept-green-icon.png";
import iconeRecusar from "../../assets/icons/decline-user-darkred-icon.png"


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoExibido: "",
            listaUsuarios: [],
            erro: false,
            sucesso: false,
            mensagemErro: null,
            mensagemSucesso: null,
        }
    }


    componentDidMount() {
        this.setState({tipoExibido : "pendentes"})
        this.carregarUsuariosPendentes();
    }


    mostrarPendentes = (event) => {
        this.setState({listaUsuarios : []})
        this.setState({ tipoExibido: "pendentes" });
        this.carregarUsuariosPendentes();
    }

    mostrarCadastrados = (event) => {
        this.setState({listaUsuarios : []})
        this.setState({ tipoExibido: "cadastrados" });
        this.carregarUsuariosCadastrados();
    }

    carregarUsuariosPendentes = () => {

        let requestUrl = "http://192.168.5.98:5000/api/usuarios/pendentes";
        let token = localStorage.getItem("usuario-meuPonto");

        fetch(requestUrl, {
            headers: {
                "Authorization": "Bearer " + token,
            },
        })
            .then(response => response.json())
            .then(data => this.setState({ listaUsuarios: data }))
            .catch(error => {
                this.setState({ erro: true });
                this.setState({ mensagemErro: "Ocorreu um erro inesperado: \n" + error + ". \n Por favor, atualize a página e tente novamente" })
                console.log(error)
            })

        console.log(this.state.listaUsuarios)
    }

    carregarUsuariosCadastrados = () => {
        let requestUrl = "http://192.168.5.98:5000/api/usuarios/ativos";
        let token = localStorage.getItem("usuario-meuPonto");

        fetch(requestUrl, {
            headers: {
                "Authorization": "Bearer " + token,
            },
        })
            .then(response => response.json())
            .then(data => this.setState({ listaUsuarios: data }))
            .catch(error => {
                this.setState({ erro: true });
                this.setState({ mensagemErro: "Ocorreu um erro inesperado: \n" + error + ". \n Por favor, atualize a página e tente novamente" })
                console.log(error)
            })

        console.log(this.state.listaUsuarios)
    }


    alterarStatus = (usuario) => {
        let requestUrl = "http://192.168.5.98:5000/api/usuarios/" + usuario.idUsuario;
        let token = localStorage.getItem("usuario-meuPonto");

        let requestBody = {
            ativo : !usuario.ativo
        }

        fetch(requestUrl,{
            method : "PUT",
            headers:{
                "Content-type" : "application/json",
                "Authorization" : "Bearer " + token,
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (response.status === 200){
                this.tirarUsuarioDaLista(usuario);
                this.setState({sucesso : true});
                this.setState({mensagemSucesso : "Usuário " + usuario.nome + " alterado com sucesso!"})
            }
        })
        .catch(error => {
            this.setState({ erro: true });
            this.setState({ mensagemErro: "Ocorreu um erro inesperado: \n" + error + ". \n Por favor, atualize a página e tente novamente" })
            console.log(error)
        })
    }


    tirarUsuarioDaLista = (usuario) =>{
        let lista = this.state.listaUsuarios;

        let novaLista = lista.filter(item => {
            return( item.idUsuario != usuario.idUsuario )
        })

        this.setState(() => ({listaUsuarios : novaLista}));
    }

    fecharModal = () => {
        this.setState({ erro: false });
        this.setState({ sucesso : false})
    }

    render() {
        return (
            <div className="Home">
                <Header />
                <main className="container">

                    <Modal
                        className="error-alert"
                        open={this.state.erro}
                        onClose={this.fecharModal}
                        focusTrapped={false}

                        children={ <ErrorModal mensagemErro={this.state.mensagemErro} />}
                    />

                    <Modal
                        className="success-alert"
                        open={this.state.sucesso}
                        onClose={this.fecharModal}
                        focusTrapped={false}

                        children={ <SuccessModal mensagemSucesso={this.state.mensagemSucesso} />}
                    />  


                    <h1>Administrar Usuários</h1>

                    <div className="options">
                        <span
                            onClick={() => this.mostrarPendentes()}
                            className={this.state.tipoExibido === "pendentes" ? "option selected" : "option"}
                            id="pendentes">
                            Usuários Pendentes
                        </span>

                        <span
                            onClick={() => this.mostrarCadastrados()}
                            className={this.state.tipoExibido === "cadastrados" ? "option selected" : "option"}
                            id="cadastrados">
                            Usuários Cadastrados
                        </span>
                    </div>


                    <table className="table table-hover tabela-usuarios">
                        <thead>
                            <tr>
                                <th className="smaller-column" scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">NI</th>
                                <th scope="col">CPF</th>
                                <th className="smaller-column" scope="col">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listaUsuarios.map(item => {
                                return (
                                    <tr key={item.idUsuario}>
                                        <th scope="row">{item.idUsuario}</th>
                                        <td>{item.nome}</td>
                                        <td>{item.ni}</td>
                                        <td>{item.cpf}</td>
                                        {this.state.tipoExibido === "pendentes" ?
                                            <td className="option-td" onClick={() => this.alterarStatus(item)}>
                                                <img
                                                    src={iconeAceitar}
                                                    alt="Aceitar usuário"
                                                    title={"Aceitar usuário " + item.nome}
                                                    className="accept-icon icon" />
                                            </td>
                                            :
                                            null
                                        }

                                        {this.state.tipoExibido === "cadastrados" ?
                                            <td className="option-td" onClick={() => this.alterarStatus(item)}>
                                            <img
                                                    src={iconeRecusar}
                                                    alt="Desativar usuário"
                                                    title={"Desativar usuário " + item.nome}
                                                    className="decline-icon icon" />
                                            </td>
                                            :
                                            null
                                        }

                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>



                </main>
                <Footer />
            </div>
        )
    }
}