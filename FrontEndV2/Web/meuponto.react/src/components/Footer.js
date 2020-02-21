import React from "react";
import logoSenai from "../assets/img/senai-logo.png";


export default function Footer() {
    return (

        <footer className="rodape">
            <div className="infos">
                <img src={logoSenai} alt="Logo do Senai" className="logo-senai-footer"/>
                <p className="bigger">Escola SENAI de Informática</p>
                <p>Al. Barão de Limeira, 512 - Santa Cecília, São Paulo</p>
                <div className="flex-textos">
                    <p> Contatos: (11) 3273-5000</p>
                    <p>informatica@sp.senai.br</p>
                </div>
            </div>
        </footer>
    )
}