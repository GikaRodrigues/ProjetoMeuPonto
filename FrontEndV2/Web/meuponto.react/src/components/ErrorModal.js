import React, { Component } from "react";
import "../pages/Login/Login.css";

export default class ErrorModal extends Component {

    render() {
        return (
            <div style={{padding : 10}}>
                <h2 className="titulo-erro" style={{color : "#C90000"}}>Oops!</h2>
                <p>{this.props.mensagemErro}</p>
            </div>
        )
    }
}