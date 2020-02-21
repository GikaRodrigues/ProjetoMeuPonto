import React, { Component } from "react";
import "./Login.css";
import logoMeuPonto from "../../assets/img/LogoMeuPonto.png";
import logoSenai from "../../assets/img/senai-logo.png";
import Modal from "react-responsive-modal";
import ErrorModal from "../../components/ErrorModal";
import Axios from "axios";



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            senha: null,
            erro: false,
            mensagemErro: "Ocorreu um erro inesperado",
            disabled: true,
        }
    }

    atualizarEstado = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }


    tentarFazerLogin = (event) => {
        event.preventDefault();

        if (this.state.email === null || this.state.email === "") {
            this.setState({ erro: true });
            this.setState({ mensagemErro: "Preencha o campo de email corretamente" });
        } else if (this.state.senha === null || this.state.senha === "") {
            this.setState({ erro: true });
            this.setState({ mensagemErro: "Preencha o campo da senha corretamente" });
        } else {
            this.efetuarLogin();
        }
    }

    fecharModal = () => {
        this.setState({ erro: false });
    }

    efetuarLogin = () => {
        try {

            var requestBody = {
                email: this.state.email,
                senha: this.state.senha
            }

            let requestUrl = "http://192.168.5.98:5000/api/login"

            Axios.post(requestUrl, requestBody)
                .then(response => {
                    console.log(response);

                    if (response.status === 200) {
                        localStorage.setItem("usuario-meuPonto", response.data.token);
                        this.props.history.push("/")
                    }
                    else if (response.status === 404) {
                        this.setState({ erro: true });
                        this.setState({ mensagemErro: "Email e/ou senha incorretos" })
                    } else {
                        this.setState({ erro: true });
                        this.setState({ mensagemErro: "Ocorreu um erro inesperado. Descrição do erro: " + response.data })
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.setState({ erro: true });
                    this.setState({ mensagemErro: "Ocorreu um erro inesperado. Descrição do erro: " + error })
                })

        } catch (error) {
            this.setState({ erro: true });
            this.setState({ mensagemErro: "Ocorreu um erro inesperado. Por favor, tente novamente" });
        }
    }


    render() {
        return (
            <div className="Login">
                <div className="purple-half">
                    <img className="logo-principal" src={logoMeuPonto} alt="Logo meu ponto" />
                    <img className="logo-senai" src={logoSenai} alt="Logo do SENAI"/>
                </div>

                <Modal
                    className="error-alert"
                    open={this.state.erro}
                    onClose={this.fecharModal}
                    focusTrapped={false}

                    children={<ErrorModal mensagemErro={this.state.mensagemErro} />}
                />

                {/* <div className="form-half"> */}
                <div className="form-box">

                    <h1>Login</h1>

                    <form className="login-form" onSubmit={this.tentarFazerLogin}>
                        <input
                            onInput={this.atualizarEstado}
                            className="input-text-login"
                            name="email"
                            type="email"
                            placeholder="Email"
                            minLength="3"
                            maxLength="100"
                        />

                        <input
                            onInput={this.atualizarEstado}
                            className="input-text-login"
                            name="senha"
                            type="password"
                            placeholder="Senha"
                            minLength="8"
                            maxLength="80"
                        />

                        <input
                            className="submit"
                            type="submit"
                            value="Entrar"
                        />
                    </form>

                </div>
            </div>
            // </div>
        )

    }

}