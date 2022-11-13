import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReCAPTCHA from 'react-google-recaptcha'

import Nav from "../../components/Navbar/Nav"
import "./register.scss";
import InputPasswordShowBTN from "../../components/InputPasswordShowBTN/inputPasswordShowBTN"
import PasswordStrenghtMeter from "../../components/PasswordStrenghtMeter/PasswordStrenghtMeter"

import formFunctions from "../../utils/formFunctions";

export default class Register extends Component {
  state = {
    paso: 1,
    name: "",
    surname: "",
    dni: "",
    email: "",
    phoneNumber: "",
    password: "",
    home: "",
    birthDate: "",
    captchaApproves: false,
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    return (
      <main id="registerSection">
        <Nav.SingleNavResponsive />
        <h1>Registración</h1>
        <section id="registerSection">
          <div className="inputsList">
            <div className="inputContainer">
              <span>Datos</span>
              <input type="text" name="name" placeholder="Nombre" value={this.state.name} onChange={e => {
                this.handleInputChange(e)
                formFunctions.typingInput(e, 1, false, 'text')
              }} />
            </div>
            
            <div className="inputContainer">
              <input type="text" name="surname" placeholder="Apellido" value={this.state.surname} onChange={e => {
                this.handleInputChange(e)
                formFunctions.typingInput(e, 1, false, 'text')
              }} />
            </div>
            
            <div className="inputContainer">
              <input type="text" name="dni" placeholder="DNI" value={this.state.dni} onChange={e => {
                this.handleInputChange(e)
                formFunctions.typingInput(e, 1, false, 'int')
              }} />
            </div>
          </div>
          <div className="inputsList">
            <div className="inputContainer">
              <span>Cuenta y Contacto</span>
              <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={e => {
                this.handleInputChange(e)
                formFunctions.typingInput(e, 1, false, 'text')
              }} />
            </div>
            
            <div className="inputContainer">
              <input type="phone" name="phoneNumber" value={this.state.phoneNumber} placeholder="Telefono" onChange={e => {
                this.handleInputChange(e)
                formFunctions.typingInput(e, 1, false, 'text')
              }} />
            </div>
            
            <div className="inputContainer" id="passwordInputDiv">
              <InputPasswordShowBTN name="password" value={this.state.password} placeholder="Contraseña" onChange={e => {
                this.handleInputChange(e)
                formFunctions.typingInput(e, 1, false, 'text')
              }}/>
              <PasswordStrenghtMeter password={this.state.password}/>
            </div>
          </div>
          <div className="inputsList">
            <div className="inputContainer">
              <span>Información</span>
              <input type="text" name="home" value={this.state.home} placeholder="Domicilio" onChange={e => {
                this.handleInputChange(e)
                formFunctions.typingInput(e, 1, false, 'text')
              }} />
            </div>

            <div className="inputContainer">
              <input type="date" name="birthDate" value={this.state.birthDate} onChange={e => {
                this.handleInputChange(e)
                formFunctions.typingInput(e, 1, false, 'text')
              }} />
              <span id="nacSpan">Fecha de Nacimiento</span>
            </div>
            
            <div className="inputContainer" id="sexInputRadio">
              <label>
                <input type="radio" name="sex" value="male" onChange={e => {
                  this.handleInputChange(e)
                  formFunctions.typingInput(e, 1, false, 'text')
                }} />Masculino
              </label>

              <label>
                <input type="radio" name="sex" value="female" onChange={e => {
                  this.handleInputChange(e)
                  formFunctions.typingInput(e, 1, false, 'text')
                }} />Femenino
              </label>
            </div>
          </div>
        </section>
        <span id="acceptTerms">Al continuar y enviar este formulario aceptá los <Link to={'/Terms-And-Conditions'} target='blank' rel="noreferrer">Terminos y Condiciones</Link> de Golden Duck</span>
        <button>Enviar</button>
      </main>
    );
  }
}
