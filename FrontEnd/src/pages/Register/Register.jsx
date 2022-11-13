import React, { Component } from "react";
import { Link } from "react-router-dom";

import ReCAPTCHA from 'react-google-recaptcha'
import randomString from '../../utils/randomString'
import md5 from 'md5'
import Swal from "sweetalert2";
import formFunctions from "../../utils/formFunctions";

import Nav from "../../components/Navbar/Nav"
import "./register.scss";

import FormSection from "./components/FormSection"
import ConfirmationSection from "./components/ConfirmationSection"


const recaptchaRef = React.createRef();

const generateCode = () => {
  var rjqogEqfg = randomString(6);
  var fnbjmDpef = randomString(6);
  sessionStorage.setItem("fnbjmDpef", md5(fnbjmDpef)); // Pasar directamente con randomString() y borrar variable
  sessionStorage.setItem("rjqogEqfg", md5(rjqogEqfg)); // Pasar directamente con randomString() y borrar variable

  console.log('codePhone: ' + rjqogEqfg) /* Sacar al terminar xd */
  console.log('codePhone Encriptado: ' + sessionStorage.getItem("rjqogEqfg")) /* Sacar al terminar xd */
  
  console.log('codeEmail: ' + fnbjmDpef) /* Sacar al terminar xd */
  console.log('codeEmail Encriptado: ' + sessionStorage.getItem("fnbjmDpef")) /* Sacar al terminar xd */

  console.log(""); /* Sacar al terminar xd */
  console.log(""); /* Sacar al terminar xd */
}

export default class Register extends Component {
  state = {
    paso: 1,
    name: "testname",
    surname: "testsurname",
    dni: "11223344",
    email: "testmail@test.com",
    phoneNumber: "1122334455",
    password: "Contrasenia",
    home: "Calle Falsa 321",
    birthDate: "2000-01-01",
    emailCode: "",
    phoneCode: "",
  };

  handleInputChange = (event, directValue = false, name, value) => {
    if (directValue) this.setState({
      [name]: value,
    });
    else this.setState({
      [event.target.name]: event.target.value,
    });
  };
  
  siguientePaso = (event, notCheck = false) => {
    if (notCheck === true) {
      const { paso } = this.state;
      this.setState({
        paso: paso + 1,
      });
    } else if (false) {
      const { paso } = this.state;
      this.setState({
        paso: paso + 1,
      });
    } else if (formFunctions.checkNext(10) === 0) {
      const { paso } = this.state;
      this.setState({
        paso: paso + 1,
      });
    } else if (formFunctions.checkNext(10)[0] === 1){
      Swal.fire({
        title: "Error",
        text: 'Rellene campo ' + formFunctions.checkNext(10)[1],
        icon: "error",
      });
    } else if (formFunctions.checkNext(10)[0] === 2)
      Swal.fire({
        title: "Error",
        text: 'Compruebe campo ' + formFunctions.checkNext(10)[1],
        icon: "error",
      });
  };

  anteriorPaso = (event) => {
    const { paso } = this.state;
    this.setState({
      paso: paso - 1,
    });
  };

  nextButton = (e) => {
    if (document.getElementsByName("sex")[0].checked || document.getElementsByName("sex")[1].checked) {
      generateCode();
      this.siguientePaso(e);
    }
    else{
      Swal.fire({
        title: "Error",
        text: "Indique su Sexo",
        icon: "error",
      });
    }
  }
  
  sendButton = (e) => {
    if (sessionStorage.getItem("fnbjmDpef") === md5(this.state.emailCode) && sessionStorage.getItem("rjqogEqfg") === md5(this.state.phoneCode) && recaptchaRef.current.getValue() != '') {
      /* Base de datos */



      Swal.fire({
        title: "Registro Comleto",
        text: "¡Te has registrado exitosamente!",
        icon: "success",
      }).then(() => {
        window.location.href = "/";
      });
    }
    else if (recaptchaRef.current.getValue() === ''){
      Swal.fire({
        title: "Error",
        text: "Complete el Captcha",
        icon: "error",
      });
    }
    else{
      Swal.fire({
        title: "Error",
        text: "Compruebe los códigos",
        icon: "error",
      });
    }
  }
  render() {
    let values = this.state;
    switch (this.state.paso) {
      case 1:
        return(
          <main id="registerSection">
            <Nav.SingleNavResponsive />
            <h1>Registración</h1>
            <FormSection
                handleInputChange={this.handleInputChange}
                handleEnterKey={this.handleEnterKey}
                values={values}/>
            <span id="acceptTerms">Al continuar y enviar este formulario aceptá los <Link to={'/Terms-And-Conditions'} target='blank' rel="noreferrer">Terminos y Condiciones</Link> de Golden Duck</span>
            <button onClick={this.nextButton}>Siguiente</button>
          </main>
        );
        case 2:
          return(
            <main id="registerSection">
              <Nav.SingleNavResponsive />
              <h1>Registración</h1>
              <ConfirmationSection
                handleInputChange={this.handleInputChange}
                anteriorPaso={this.anteriorPaso}
                handleEnterKey={this.handleEnterKey}
                values={values}/>
              <ReCAPTCHA sitekey="6LeVMaEgAAAAAKS-1eaRymKZPEZDB9D56UG0RWp2" hl="es-419" id='ReCAPTCHA' ref={recaptchaRef} />
              <button onClick={e=>this.sendButton()}>Enviar</button>
            </main>
          );
      default:
        alert("Lo sentimos, hubo un error.");
        window.location.href = "/";
    }
  }
}
