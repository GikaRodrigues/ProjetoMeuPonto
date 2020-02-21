import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import jsonwebtoken from "jsonwebtoken";
import {Route, Link, BrowserRouter, Switch, Redirect} from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home.js";


const PrivateRoute = ({component : Component}) => (
    <Route
        render={props =>
        localStorage.getItem("usuario-meuPonto") !== null  && jsonwebtoken.decode(localStorage.getItem("usuario-meuPonto")).Permissao === "ADMINISTRADOR"? (
            <Component {...props}/> 
        ) : (
                <Redirect 
                to={{pathname : "/login"}}
                />
            )
        }
    />    
)

const Routing = (
    <BrowserRouter>
        <div>
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/" component={Home} />
        </div>
    </BrowserRouter>
)



ReactDOM.render(Routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
