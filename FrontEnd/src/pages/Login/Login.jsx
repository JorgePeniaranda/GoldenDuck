import React from "react";
import { Link } from "react-router-dom";

import "./login.scss";

import NavList from "../../components/Navbar/Nav";

const Login = () => {
  return (
    <main id="loginSection">
      <NavList.SingleNavResponsive />
      <div className="content">
        <div id="registerOption">
          <h1>Crea tu cuenta Golden Duck ahora mismo</h1>
          <p>
            ¡Registrate para poder obtener todos los beneficios que Golden Duck te
            ofrece!
          </p>
          <Link to="/signin">Registrarse</Link>
        </div>
        <div id="loginForm">
          <div className="loginInputs">
            <h3>Iniciar Sesión</h3>
            <input type="text" placeholder="Usuario" />
            <input type="password" placeholder="Contraseña" />
            <Link to="/forgot-my-password">Olvide mi Contraseña</Link>
            <Link to="/signin" id="registeMobileButton">Crear Cuenta</Link>
            <Link to="/dashboard" id="login">
              Ingresar
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
