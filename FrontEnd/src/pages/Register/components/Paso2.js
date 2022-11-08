import React from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha'
import { FileUploader } from "react-drag-drop-files";
import Swal from 'sweetalert2';

const fileTypes = ["JPG", "PNG"];

const Paso2 = props => {
  const handleChange = (file) => {
    console.log(file) // pasar archivos al estado
  };
  const sendButton = () => {
    if (document.getElementById("checkPESTEL").checked) {
      props.siguientePaso(null, true) // aca tiene que ir la comprobación de los archivos y la wea
    }
    else {
      Swal.fire({
        title: "Error",
        text: "Debes aceptar los terminos y condiciones",
        icon: "error",
      });
    }
  }
  return (
    <div className="pasos" id='paso2' onKeyDown={props.handleEnterKey}>
      <span>Suba una foto del frente y dorso del DNI, junto a una foto suya de frente para confirmar su identidad</span>
      <FileUploader handleChange={handleChange} hoverTitle="Suelte aquí" minSize={3} classes="fileDrop" name="files" types={fileTypes} label="Suba los archivos aquí" />
      <ReCAPTCHA sitekey="l o l" id='ReCAPTCHA' /* onChange={onChange} */ />
      <div id='PESTEL'>
        <input type='checkbox' id='checkPESTEL' />
        <label>Acepto <Link to={'/Terms-And-Conditions'}>Terminos y Condiciones</Link></label>
      </div>
      <button onClick={sendButton}>Enviar</button>
    </div>
  );
}

export default Paso2;