import React from 'react';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import ReCAPTCHA from 'react-google-recaptcha'
import randomString from '../../../utils/randomString'
import md5 from 'md5'

import formFunctions from '../../../utils/formFunctions';

const recaptchaRef = React.createRef();


const generateCode = () => {
  var eqovcevqEqfg = randomString(6);
  sessionStorage.setItem("eqovcevqEqfg", md5(eqovcevqEqfg)); // Pasar directamente con randomString() y borrar variable

  console.log('codeContact: ' + eqovcevqEqfg) /* Sacar al terminar xd */
  console.log('codeContact Encriptado: ' + sessionStorage.getItem("eqovcevqEqfg")) /* Sacar al terminar xd */

  console.log(""); /* Sacar al terminar xd */
  console.log(""); /* Sacar al terminar xd */
}

const Paso1 = props => {
  const nextButton = (e) =>{
    if (recaptchaRef.current.getValue() != '') {
      generateCode();
      props.siguientePaso(e);
    }
    else{
      Swal.fire({
        title: "Error",
        text: "Complete el Captcha",
        icon: "error",
      });
    }
  }
  return (
    <div onKeyDown={props.handleEnterKey}>
      <label>Email o Telefono:</label> {/* Posibilidad de cambiar a Email para el forgot y agregar validacion por mail */}
      <div className="input">
        <span class="material-icons-outlined">alternate_email</span>
        <input type="text" name="Correo" value={props.values.Correo} className="form-input" id="name" autoFocus autoComplete="off" onChange={e => {
          props.handleInputChange(e)
          formFunctions.typingInput(e, 1, false, 'email')
        }} />
      </div>
      <ReCAPTCHA sitekey="6LeVMaEgAAAAAKS-1eaRymKZPEZDB9D56UG0RWp2" id='ReCAPTCHA' ref={recaptchaRef} />

      <button id='Next' onClick={nextButton}>Siguiente</button>
      <Link to='/Login' id='optionBottom'>Ya tengo una cuenta</Link>
    </div>
  );
}

export default Paso1;