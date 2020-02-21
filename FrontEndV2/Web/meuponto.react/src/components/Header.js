import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import logoSenai from "../assets/img/senai-logo.png";
import logoPrincipal from "../assets/img/LogoMeuPonto.png";
import iconeSair from "../assets/icons/logout-icon.png";
import "../pages/Home/Home.css"


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldRedirect: false,
        }
    }

    fazerLogout = () => {
        localStorage.removeItem("usuario-meuPonto");
        this.setState({ shouldRedirect: true })
    }

    render() {
        if (this.state.shouldRedirect === true) {
            return (
                <Redirect to="/login" />
            )
        } else {
            return (
                <header className="Header">
                    <div className="container">

                        <img src={logoSenai} className="senai header-icon" alt="Logo do Meu Ponto"/>
                        <img src={logoPrincipal} className="logo header-icon" alt="Logo do SENAI"/>

                        <span onClick={() => this.fazerLogout()} className="logout-button" >
                            <img src={iconeSair} className="sair header-icon" alt=""/>
                            <p>Sair</p>
                        </span>
                    </div>
                </header>
            )
        }

    }
}