import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import "./ForgotPassword.scss";
import GoldenDuckLogo from "../../assets/img/GoldenDuckLogo.png";

import Paso1 from "./components/Paso1";
import Paso2 from "./components/Paso2";
import Paso3 from "./components/Paso3";

import formFunctions from "../../utils/formFunctions";

export default class Register extends Component {
  state = {
    paso: 2,
    Correo: "testCorreo@test.com",
    Codigo: "",
    newPass: "",
    confirmationNewPass: ""
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
    } else if (formFunctions.checkNext(1) === 0) {
      const { paso } = this.state;
      this.setState({
        paso: paso + 1,
      });
    } else if (formFunctions.checkNext(1)[0] === 1){
      Swal.fire({
        title: "Error",
        text: 'Rellene campo ' + formFunctions.checkNext(1)[2],
        icon: "error",
      });
    } else if (formFunctions.checkNext(1)[0] === 2)
      Swal.fire({
        title: "Error",
        text: 'Compruebe campo ' + formFunctions.checkNext(1)[2],
        icon: "error",
      });
  };

  anteriorPaso = (event) => {
    const { paso } = this.state;
    this.setState({
      paso: paso - 1,
    });
  };

  render() {
    let values = this.state;

    switch (this.state.paso) {
      case 1:
        return (
          <main id="forgotSection">
            <section id="forgotSection">
              <Link to="/">
                <img src={GoldenDuckLogo} alt="logo" />
              </Link>
              <h2>Cambiar Contraseña</h2>
              <Paso1
                handleInputChange={this.handleInputChange}
                siguientePaso={this.siguientePaso}
                values={values}
              />
            </section>
          </main>
        );
      case 2:
        return (
          <main id="forgotSection">
            <section id="forgotSection">
              <Link to="/">
                <img src={GoldenDuckLogo} alt="logo" />
              </Link>
              <h2>Cambiar Contraseña</h2>
              <Paso2
                handleInputChange={this.handleInputChange}
                siguientePaso={this.siguientePaso}
                anteriorPaso={this.anteriorPaso}
                values={values}
              />
            </section>
          </main>
        );
      case 3:
        return (
          <main id="forgotSection">
            <section id="forgotSection">
              <Link to="/">
                <img src={GoldenDuckLogo} alt="logo" />
              </Link>
              <h2>Cambiar Contraseña</h2>
              <Paso3
                handleInputChange={this.handleInputChange}
                siguientePaso={this.siguientePaso}
                anteriorPaso={this.anteriorPaso}
                values={values}
              />
            </section>
          </main>
        );
      default:
        alert("Lo sentimos, hubo un error.");
        window.location.href = "/";
    }
  }
}
