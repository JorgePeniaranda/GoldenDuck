import React from 'react';
import { Link } from 'react-router-dom';

const Paso3 = props => {
  return (
    <div className="pasos" id='successful' onKeyDown={props.handleEnterKey}>
      <h4>¡Registro Completado!</h4>
      <p>Has completado exitosamente el registro, a continuación validaremos tu identidad. A la brevedad podras acceder a tu cuenta Golden Duck.</p>
      <Link to="/">Volver</Link>
    </div>
  );
}

export default Paso3;