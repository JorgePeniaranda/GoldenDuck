import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import "./register.scss";
import GoldenDuckLogo from "../../assets/img/GoldenDuckLogo.png";

import Paso1 from "./components/Paso1";
import Paso2 from "./components/Paso2";
import Paso3 from "./components/Paso3";

import formFunctions from "../../utils/formFunctions";

export default class Register extends Component {
  state = {
    paso: 1,
    name: "",
    dni: "",
    password: "",
    files: "",
    captchaApproves: false,
    termsAccepted: false
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  siguientePaso = (event, notCheck = false) => {
    if (notCheck === true){
      const { paso } = this.state;
      this.setState({
        paso: paso + 1,
      });
    }
    else if (formFunctions.checkNext()) {
      const { paso } = this.state;
      this.setState({
        paso: paso + 1,
      });
    } else
      Swal.fire({
        title: "Error",
        text: "Verifique los campos",
        icon: "error",
      });
  };
  anteriorPaso = (event) => {
    const { paso } = this.state;
    this.setState({
      paso: paso - 1,
    });
  };
  /* Poner que los value sean igual a los state */

  render() {
    let values = this.state;

    switch (this.state.paso) {
      case 1:
        return (
          <main id="registerSection">
            <section id="registerForm">
              <Link to='/'><img src={GoldenDuckLogo} alt="logo"/></Link>
              <h1>Registración</h1>
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
            <main id="registerSection">
              <section id="registerForm">
                <Link to='/'><img src={GoldenDuckLogo} alt="logo"/></Link>
                <h1>Registración</h1>
                  <Paso2
                    handleInputChange={this.handleInputChange}
                    siguientePaso={this.siguientePaso}
                    values={values}
                  />
              </section>
            </main>
          );
          case 3:
            return (
              <main id="registerSection">
                <section id="registerForm">
                  <Link to='/'><img src={GoldenDuckLogo} alt="logo"/></Link>
                    <Paso3
                      handleInputChange={this.handleInputChange}
                      siguientePaso={this.siguientePaso}
                      values={values}
                    />
                </section>
              </main>
            );
          default:
            return (
              <main id="registerSection">
                <section id="registerForm">
                  <Link to='/'><img src={GoldenDuckLogo} alt="logo"/></Link>
                  <h1>Error</h1>
                  <Link to="/">Volver</Link>
                </section>
              </main>
            );
    }
  }
}
