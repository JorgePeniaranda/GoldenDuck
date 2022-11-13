import React from 'react';

import formFunctions from "../../../utils/formFunctions";
import InputPasswordShowBTN from "../../../components/InputPasswordShowBTN/inputPasswordShowBTN"
import PasswordStrenghtMeter from "../../../components/PasswordStrenghtMeter/PasswordStrenghtMeter"

const FormSection = props =>{
  return(
    <section id="formSection">
      <div className="inputsList">
        <div className="inputContainer">
          <span>Datos</span>
          <input type="text" name="name" placeholder="Nombre" value={props.values.name} onChange={e => {
            props.handleInputChange(e)
            formFunctions.typingInput(e, 1, false, 'text')
          }} />
        </div>
        
        <div className="inputContainer">
          <input type="text" name="surname" placeholder="Apellido" value={props.values.surname} onChange={e => {
            props.handleInputChange(e)
            formFunctions.typingInput(e, 1, false, 'text')
          }} />
        </div>
        
        <div className="inputContainer">
          <input type="text" name="dni" campo='DNI' placeholder="DNI" minLength={8} maxLength={8} value={props.values.dni} onChange={e => {
            props.handleInputChange(e)
            formFunctions.typingInput(e, 8, true, 'int')
          }} />
        </div>
      </div>
      <div className="inputsList">
        <div className="inputContainer">
          <span>Cuenta y Contacto</span>
          <input type="text" name="email" placeholder="Email" value={props.values.email} onChange={e => {
            props.handleInputChange(e)
            formFunctions.typingInput(e, 1, false, 'email')
          }} />
        </div>
        
        <div className="inputContainer">
          <input type="phone" name="phoneNumber" value={props.values.phoneNumber} minLength={11} maxLength={11} placeholder="Teléfono" onChange={e => {
            props.handleInputChange(e)
            formFunctions.typingInput(e, 11, true, 'int')
          }} />
        </div>
        
        <div className="inputContainer" id="passwordInputDiv">
          <InputPasswordShowBTN name="password" value={props.values.password} placeholder="Contraseña" onChange={e => {
            props.handleInputChange(e)
          }}/>
          <PasswordStrenghtMeter password={props.values.password}/>
        </div>
      </div>
      <div className="inputsList">
        <div className="inputContainer">
          <span>Información</span>
          <input type="text" name="home" value={props.values.home} placeholder="Domicilio" onChange={e => {
            props.handleInputChange(e)
            formFunctions.typingInput(e, 1, false, 'text')
          }} />
        </div>

        <div className="inputContainer">
          <input type="date" name="birthDate" value={props.values.birthDate} onChange={e => {
            props.handleInputChange(e)
            formFunctions.typingInput(e, 1, false, 'text')
          }} />
          <span id="nacSpan">Fecha de Nacimiento</span>
        </div>
        
        <div className="inputContainer" id="sexInputRadio">
          <label>
            <input type="radio" name="sex" value="male" onChange={e => {
              props.handleInputChange(e)
              formFunctions.typingInput(e, 1, false, 'text')
            }} />Masculino
          </label>

          <label>
            <input type="radio" name="sex" value="female" onChange={e => {
              props.handleInputChange(e)
              formFunctions.typingInput(e, 1, false, 'text')
            }} />Femenino
          </label>
        </div>
      </div>
    </section>
  );
}

export default FormSection;