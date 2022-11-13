import React from 'react';

import ReactCodeInput from 'react-code-input'

const ConfirmationSection = props =>{
  return(
    <section id="confirmationSection">
      <span className="material-icons-outlined" id="backArrow" onClick={props.anteriorPaso}>arrow_back</span>
      <div className="formSection">
        <h5>Confirmar Email</h5>
        <p>Revisa tu mail <span>{props.values.email}</span> e ingresa el código recibido, Si no lo encuentras prueba buscarlo en la categoria "Spam"</p>
        <ReactCodeInput type='text' fields={6} onChange={e =>{
          props.handleInputChange(e, true, "emailCode", e);
        }}/>
      </div>
      <div className="formSection">
        <h5>Confirmar Teléfono</h5>
        <p>Revisa tu teléfono con número <span>{props.values.phoneNumber}</span> e ingresa el código recibido</p>
        <ReactCodeInput type='text' fields={6} onChange={e =>{
          props.handleInputChange(e, true, "phoneCode", e);
        }}/>
      </div>
    </section>
  );
}

export default ConfirmationSection;