import React from 'react';
import { Link } from 'react-router-dom';

import formFunctions from '../../../utils/formFunctions';
import PasswordStrenghtMeter from './PasswordStrenghtMeter';
import InputPasswordShowBTN from '../../../components/InputPasswordShowBTN/inputPasswordShowBTN';

const Paso1 = props =>{
  return (
    <div onKeyDown={props.handleEnterKey}>
      <label>Nombre:</label> {/* Posibilidad de cambiar a Email para el forgot y agregar validacion por mail */}
      <div className="input" id='NameCamp'> {/* Nombre */}
          <span class="material-icons-outlined">person</span>
          <input type="text" name="name" value={props.values.name} className="form-input" id="name" autoFocus autoComplete="off" onChange={e => {
            props.handleInputChange(e)
            formFunctions.typingInput(e, 1, false, 'text')
          }}/>
      </div>

      <label>DNI:</label>
      <div className="input" id='SurnameCamp'> {/* DNI */}
          <span class="material-icons-outlined">fingerprint</span>
          <input type="text" name="dni" value={props.values.dni} minLength={8} maxLength={8} className="form-input" autoComplete="off" onChange={e => {
            props.handleInputChange(e)
            formFunctions.typingInput(e, 8, true, 'int')
          }}/>
      </div>

      <label>Contraseña:</label> {/* Contraseña */}
      <div className="input" id='passwordShowBarContainer'>
        <span class="material-icons-outlined" id='showInputSpan'>lock</span>
        <div id='password'>
          <InputPasswordShowBTN name='password' value={props.values.password} onChange={props.handleInputChange}/>
          <PasswordStrenghtMeter password={props.values.password}/>
        </div>
      </div>

        <button id='Next' onClick={props.siguientePaso}>Siguiente</button>
        <Link to='/Login' id='loginRedirect'>Ya tengo una cuenta</Link>
    </div>
  );
}

export default Paso1;