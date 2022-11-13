import React from 'react';
import ReactCodeInput from 'react-code-input'
import Swal from 'sweetalert2';
import md5 from 'md5';

const Paso2 = props => {
  const sendButton = () => {
    if (props.values.Codigo === "") {
      Swal.fire({
        title: "Error",
        text: "Ingrese Código",
        icon: "error",
      });
    }
    else if (sessionStorage.getItem("eqovcevqEqfg") === md5(props.values.Codigo)) {
      props.siguientePaso(null, true)
    }
    else {
      Swal.fire({
        title: "Error",
        text: "Código Erróneo",
        icon: "error",
      });
    }
  }
  return (
    <div className="pasos" id='paso2' onKeyDown={props.handleEnterKey}>
      <p>Compruebe el correo <span>{props.values.Correo}</span> para encontrar el codigo de verificación, recuerda que puede encontrarse en "spam"</p>
      <ReactCodeInput type='text' fields={6} onChange={e =>{
          props.handleInputChange(e, true, "Codigo", e);
        }}/>
      <button onClick={sendButton}>Siguiente</button>
      <span onClick={props.anteriorPaso} id='optionBottom'>Atrás</span>
    </div>
  );
}

export default Paso2;