import React from 'react';
import Swal from "sweetalert2";
import InputPasswordShowBTN from '../../../components/InputPasswordShowBTN/inputPasswordShowBTN';
import PasswordStrenghtMeter from "../../../components/PasswordStrenghtMeter/PasswordStrenghtMeter"

const Paso3 = props => {
  const sendButton = (e) => {
    if(props.values.newPass === "" || props.values.confirmationNewPass == ""){
      Swal.fire({
        title: "Error",
        text: "Ingrese las contraseñas",
        icon: "error",
      });
    }
    else if (props.values.newPass === props.values.confirmationNewPass) {
      /* Base de datos */



      Swal.fire({
        title: "Contraseña Cambiada",
        text: "¡Has cambiado tu contraseña exitosamente!",
        icon: "success",
      }).then(() => {
        window.location.href = "/";
      });
    }
    else{
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error",
      });
    }
  }
  return (
    <div className="pasos" onKeyDown={props.handleEnterKey}>
      <span>Nueva Contraseña</span>
      <div className="input" id='NameCamp'>
        <span class="material-icons-outlined">lock</span>
        <InputPasswordShowBTN name='newPass' onChange={e => {
            props.handleInputChange(e)
          }}/>
      </div>

      <span>Confirme Nueva Contraseña</span>
      <div className="input" id='NameCamp'>
        <span class="material-icons-outlined">lock</span>
        <InputPasswordShowBTN name='confirmationNewPass' onChange={e => {
            props.handleInputChange(e)
          }}/>
      </div>

      <button onClick={sendButton}>Enviar</button>
      <span onClick={props.anteriorPaso} id='optionBottom'>Atrás</span>
    </div>
  );
}

export default Paso3;