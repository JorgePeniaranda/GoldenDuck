import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile} from 'react-device-detect';

import Mobile from '../../components/mobile/mobile';

import './login.scss';
import Nav from '../../components/navbar/nav'
import InputPasswordShowBTN from '../../components/InputPasswordShowBTN/inputPasswordShowBTN'

const Login = () => {
    if (isMobile) {
        return <Mobile/>;
    }
    return(
        <main className='logSec'>
            <div id="particles"/>
            <div id='bg'>
                <Nav/>
                <div className='text'>
                    <h1>¿No tienes una cuenta?</h1>
                    <i>Para no perderte de todos los beneficios que ofrece tener Golden Duck ¡Puedes empezar a registrarte aqui con solo un click!</i>
                    <Link to={'/Register'}>Aquí</Link>
                </div>
            </div>
            <div className="Login">
                <div className="background"/>
                <h1>Iniciar Sesión</h1>
                <form>
                    <label>Usuario o Telefono</label>
                    <div className="input">
                        <input type="email" name="email" placeholder="Usuario o Telefono" required/>
                        <span className="material-icons-outlined">account_circle</span>
                    </div>
                    <label>Contraseña</label>
                    <div className="input">
                        <InputPasswordShowBTN name='password' placeholder='Contraseña' required={true}/>
                        <span className="material-icons-outlined">lock</span>
                    </div>
                    <div className='check'>
                        <input type="checkbox" />
                        <Link to={'/Forget'}>¿Olvidaste tu Contraseña?</Link>
                    </div>
                    <Link to={'/Panel'}><input type="submit" value="Ingresar"/></Link>
                </form>
            </div>
        </main>
    )
}

export default Login;