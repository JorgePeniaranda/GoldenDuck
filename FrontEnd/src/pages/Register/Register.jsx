import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReCAPTCHA from 'react-google-recaptcha'

import Nav from "../../components/Navbar/Nav"
import "./register.scss";
import GoldenDuckLogo from "../../assets/img/GoldenDuckLogo.png";

import formFunctions from "../../utils/formFunctions";

export default class Register extends Component {
  state = {
    paso: 1,
    name: "",
    dni: "",
    password: "",
    files: "",
    captchaApproves: false,
    termsAccepted: false,
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
            <input type="text" name="" onChange={e => {
              this.handleInputChange(e)
              formFunctions.typingInput(e, 1, false, 'text')
            }}/>
            <input type="text" name="" onChange={e => {
              this.handleInputChange(e)
              formFunctions.typingInput(e, 1, false, 'text')
            }} />
            <input type="text" name="" onChange={e => {
              this.handleInputChange(e)
              formFunctions.typingInput(e, 1, false, 'text')
            }} />
          </div>
          <div className="inputsList">
            <input type="text" name="" onChange={e => {
              this.handleInputChange(e)
              formFunctions.typingInput(e, 1, false, 'text')
            }} />
            <input type="text" name="" onChange={e => {
              this.handleInputChange(e)
              formFunctions.typingInput(e, 1, false, 'text')
            }} />
            <input type="text" name="" onChange={e => {
              this.handleInputChange(e)
              formFunctions.typingInput(e, 1, false, 'text')
            }} />
          </div>
          <div className="inputsList">
            <input type="text" name="" onChange={e => {
              this.handleInputChange(e)
              formFunctions.typingInput(e, 1, false, 'text')
            }} />
            <input type="text" name="" onChange={e => {
              this.handleInputChange(e)
              formFunctions.typingInput(e, 1, false, 'text')
            }} />
            <ReCAPTCHA sitekey="6LeVMaEgAAAAAKS-1eaRymKZPEZDB9D56UG0RWp2" id='ReCAPTCHA' /* onChange={onChange} */ />
          </div>
        </section>
        <button>Enviar</button>
      </main>
    );
  }
}
