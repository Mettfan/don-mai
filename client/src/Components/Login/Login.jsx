import React from "react";
import './Login.css'
export default function Login () {
    return ( <>
    
        <div className="IniciarSesionContainer">
            <div className="loginText">
                Inicia Sesión
            </div>
            <form className="loginForm">
                <label className="labelLogin">Email</label>
                <input id="emailInput" type='text' name="Email" placeholder="Email"></input>
                <label className="labelLogin">Constraseña</label>
                <input type='password' name="Constraseña" placeholder="Constraseña"></input>
                <button className="buttonLogin">Entrar</button>
                <a>¿Olvidaste tu contraseña?</a>
            </form>
        </div>
    
    </>)
}