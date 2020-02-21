import React, { Component } from "react";
import iconeAceitar from "../assets/icons/accept-green-icon.png";


export default class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaUsuarios: [],
        }
    }


    componentDidMount() {
        if (this.props.tipoExibido === "pendentes") {
            this.carregarUsuariosPendentes();
        } else if (this.props.tipoExibido === "cadastrados") {
            this.carregarUsuariosCadastrados();
        }
    }

    carregarUsuariosPendentes = () => {
        let requestUrl = "http://192.168.5.98:5000/api/usuarios";
        let token = localStorage.getItem("usuario-meuPonto");

        fetch(requestUrl, {
            headers: {
                "Authorization": "Bearer " + token,
            },
        })
            .then(response => response.json())
            .then(data => this.setState({ listaUsuarios: data }))
            .catch(error => {
                console.log(error)
            })
            console.log(this.props.tipoExibido)

    }

    carregarUsuariosCadastrados = () => {
        let requestUrl = "http://192.168.5.98:5000/api/usuarios";
        let token = localStorage.getItem("usuario-meuPonto");

        fetch(requestUrl, {
            headers: {
                "Authorization": "Bearer " + token,
            },
        })
            .then(response => response.json())
            .then(data => this.setState({ listaUsuarios: data }))
            .catch(error => {
                console.log(error)
            })

        console.log(this.state.listaUsuarios)
    }


    render() {
        return (
            <table className="table  table-hover tabela-usuarios table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">NI</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Aceitar</th>
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
                                {this.props.tipoExibido === "pendentes" ?
                                    <td>
                                        <img 
                                        src={iconeAceitar} 
                                        alt="Aceitar usuário" 
                                        title="Aceitar Usuario" 
                                        className="accept-icon icon"/>
                                    </td>
                                    :
                                    null
                                }

                                {this.props.tipoExibido === "cadastrados" ?
                                    <td>
                                        <img 
                                        src={iconeAceitar} 
                                        alt="Desativar usuário" 
                                        title="Desativar usuário" 
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
        )
    }
}