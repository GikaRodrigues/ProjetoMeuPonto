import React, { Component } from "react";
import "../pages/Login/Login.css";

export default class SuccessModal extends Component {

    render() {
        return (
            <div style={{padding : 10}}>
                <h2 className="titulo-erro" style={{color : "#01ff95"}}>Sucesso!</h2>
                <p>{this.props.mensagemSucesso}</p>
            </div>
        )
    }
}