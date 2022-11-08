import React from "react";
import { Link } from "react-router-dom";

import "./login.scss";

import GoldenDuckLogo from "../../assets/img/GoldenDuckLogo.png"

const Login = () => {
  return (
    <main className="loginSection">
      <div id="registerOption">
        <img src={GoldenDuckLogo} alt="logo" />
        <h1>Crea tu cuenta Golden Duck ahora mismo</h1>
        <p>¡Registrate para poder obtener todos los beneficios que Golden Duck te ofrece!</p>
        <Link to='/signin'>Registrarse</Link>
      </div>
      <div id="loginForm">
        <Link to='/' className="home material-icons-outlined">home</Link>
        <div className="loginInputs">
          <h3>Iniciar Sesión</h3>
          <input type="text" placeholder="Usuario" />
          <input type="password" placeholder="Contraseña" />
          <Link to='/forgot-my-password'>Olvide mi Contraseña</Link>
          <Link to='/dashboard' id="login">Ingresar</Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
