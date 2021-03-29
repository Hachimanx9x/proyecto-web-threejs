import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import axios from "axios";
import "./SignIn2.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Navbar from "../../Elements/Navbar/Navbar";

class SigIn extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      validName: true,
      validEmail: true,
      validpassword: true,
      validpasswordConfirmation: true,

      emailMessage: "",
      passwordMessage: "",
      passwordMessageConfirmation: "",
      nameMessage: "",
    };
    this.RegisterFunction = this.RegisterFunction.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }
  handleValidation = () => {
    const { name, email, password, confirmpassword } = this.state;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const letters = /^[a-z][a-z\s]*$/;

    //Validaciones del nombre.
    if (name.trim() === "") {
      this.setState({
        validName: false,
        nameMessage:
          "El nombre es requerido. Por favor ingresa tu nombre completo",
      });
    } else if (!name.toLocaleLowerCase().match(letters)) {
      this.setState({
        validName: false,
        nameMessage: "El nombre solo debe contener letras.",
      });
    } else {
      this.setState({
        validName: true,
      });
    }
    //Validaciones del correo.
    if (email.trim() === "") {
      this.setState({
        validEmail: false,
        emailMessage:
          "Por favor ingresa una dirección de correo. Ej: correo@dominio.com",
      });
    } else if (!validEmail) {
      this.setState({
        validEmail: false,
        emailMessage:
          "Correo inválido. Debe contener un signo '@' y un dominio después del signo. Ej: correo@dominio.com",
      });
    } else {
      this.setState({
        validEmail: true,
      });
    }
    //Validaciones de la contraseña.
    if (password.trim() === "") {
      this.setState({
        validpassword: false,
        passwordMessage: "La contraseña es requerida.",
      });
    } else if (password.trim().length < 6) {
      this.setState({
        validpassword: false,
        passwordMessage: "La contraseña debe tener al menos 6 caracteres.",
      });
    } else {
      this.setState({
        validpassword: true,
      });
    }
    //Validaciones de la segunda contraseña.
    if (confirmpassword.trim() === "") {
      this.setState({
        validpasswordConfirmation: false,
        passwordMessageConfirmation: "La contraseña es requerida.",
      });
    } else if (confirmpassword.trim().length < 6) {
      this.setState({
        validpasswordConfirmation: false,
        passwordMessageConfirmation:
          "La contraseña debe tener al menos 6 caracteres.",
      });
    }
    if (
      confirmpassword.trim() !== "" &&
      password.trim() !== "" &&
      password === confirmpassword &&
      password.trim().length < 6
    ) {
      this.setState({
        validpassword: false,
        passwordMessage: "La contraseña debe tener al menos 6 caracteres.",
        validpasswordConfirmation: false,
        passwordMessageConfirmation:
          "La contraseña debe tener al menos 6 caracteres.",
      });
    } else if (
      confirmpassword.trim() !== "" &&
      password.trim() !== "" &&
      password === confirmpassword
    ) {
      this.setState({
        validpassword: true,
        validpasswordConfirmation: true,
      });
    } else if (
      confirmpassword.trim() !== "" &&
      password.trim() !== "" &&
      password !== confirmpassword
    ) {
      this.setState({
        validpassword: false,
        passwordMessage: "La contraseñas no coinciden.",
        validpasswordConfirmation: false,
        passwordMessageConfirmation: "La contraseñas no coinciden.",
      });
    }
  };
  RegisterFunction = async (e) => {
    e.preventDefault();

    await this.handleValidation();
    if (
      this.state.validEmail &&
      this.state.validpassword &&
      this.state.validName
    ) {
      localStorage.setItem("login", "registrandose");
      this.props.history.push("/Dashboard/FinishRegister");
    }
  };

  render() {
    return (
      <div className="container-fluid o-sigin-container h-100 pb-4 pb-sm-0">
        <Navbar />
        <div className="o-sigin-form m-0 mt-sm-5">
          <form className="position-relative" onSubmit={this.RegisterFunction}>
            <h3 className="text-white m-0">El mejor lugar</h3>
            <h3 className="text-white m-0">Para tu trabajar con tu equipo</h3>
            <p className="mt-2 text-white font-weight-bold ">
              Bienvenido, por favor registrate
            </p>
            <div className={this.state.validName ? "" : "o-sigin-error"}>
              <MDBInput
                onChange={(event) => {
                  this.setState({ name: event.target.value });
                }}
                label="Nombre"
                className={
                  (this.state.validName ? "" : "is-invalid ") +
                  "o-sigin-input mt-4 mt-sm-5 text-white"
                }
                type="text"
                icon="user"
              />
            </div>
            <div className="row position-absolute m-0 justify-content-end w-100">
              <small
                className={
                  this.state.validName ? "invisible" : "text-danger error-text"
                }
              >
                {this.state.nameMessage}
              </small>
            </div>
            <div className={this.state.validEmail ? "" : "o-sigin-error"}>
              <MDBInput
                onChange={(event) => {
                  this.setState({ email: event.target.value });
                }}
                label="Correo"
                className={
                  (this.state.validEmail ? "" : "is-invalid ") +
                  "o-sigin-input  mt-4 mt-sm-5  text-white"
                }
                type="text"
                icon="envelope"
              />
            </div>
            <div className="row position-absolute m-0 justify-content-end w-100">
              <small
                className={
                  this.state.validEmail ? "invisible" : "text-danger error-text"
                }
              >
                {this.state.emailMessage}
              </small>
            </div>
            <div className={this.state.validpassword ? "" : "o-sigin-error"}>
              <MDBInput
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
                label="Contraseña"
                className={
                  (this.state.validpassword ? "" : "is-invalid ") +
                  "o-sigin-input  mt-4 mt-sm-5  text-white"
                }
                type="password"
                icon="lock"
              />
            </div>
            <div className="row position-absolute m-0 justify-content-end w-100">
              <small
                className={
                  this.state.validpassword
                    ? "invisible"
                    : "text-danger error-text"
                }
              >
                {this.state.passwordMessage}
              </small>
            </div>
            <div
              className={
                this.state.validpasswordConfirmation ? "" : "o-sigin-error"
              }
            >
              <MDBInput
                onChange={(event) => {
                  this.setState({ confirmpassword: event.target.value });
                }}
                label="Confirmar contraseña"
                className={
                  (this.state.validpasswordConfirmation ? "" : "is-invalid ") +
                  "o-sigin-input  mt-4 mt-sm-5  text-white"
                }
                type="password"
                icon="lock"
              />
            </div>
            <div className="row position-absolute m-0 justify-content-end w-100">
              <small
                className={
                  this.state.validpasswordConfirmation
                    ? "invisible"
                    : "text-danger error-text"
                }
              >
                {this.state.passwordMessageConfirmation}
              </small>
            </div>
            <div className="form-row mt-4">
              <div className="col-12 ">
                <a
                  className="text-info o-sigin-text font-weight-bold "
                  href="/Login"
                >
                  ¿Ya tienes cuenta? Ingresa con ella.
                </a>
              </div>
            </div>
            <div className="row ml-1">
              <div className="col-6">
                <button
                  className=" blue accent-4 z-depth-0 text-light ml-0 mr-0 mt-2 font-weight-bold o-button"
                  type="submit"
                >
                  Registrarse
                </button>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <a
                  className=" btn-white z-depth-0 mt-2 text-primary font-weight-bold mr-0 o-button"
                  href="/Login"
                  role="button"
                >
                  Cancelar
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SigIn;
