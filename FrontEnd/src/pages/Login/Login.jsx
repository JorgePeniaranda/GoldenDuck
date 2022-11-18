import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import "./login.scss";

import NavList from "../../components/Navbar/Nav";

const Login = () => {

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

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
            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '50%' }}>
              <TextField id="input-with-sx" label="Usuario" variant="standard" />
            </Box>

            <FormControl sx={{ m: 1, width: '50%' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
              <Input
                id="standard-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
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
