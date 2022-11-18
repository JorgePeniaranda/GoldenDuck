import React from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';

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
{/*               <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle />
                <TextField id="input-with-sx" label="Usuario..." variant="standard" />
              </Box> */}
            <input type="password" placeholder="Contraseña" />
            <Link to="/forgot-my-password">Olvide mi Contraseña</Link>
            <Link to="/signin" id="registeMobileButton">Crear Cuenta</Link>
            <Link to="/dashboard/money" id="login">
              Ingresar
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
