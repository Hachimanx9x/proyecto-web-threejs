import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import axios from "axios";
import "./Login2.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Navbar from "../../Elements/Navbar/Navbar";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      rememberMe: "",
      validEmail: true,
      validpassword: true,
      emailMessage: "",
      passwordMessage: "",
    };
    this.LoginFunction = this.LoginFunction.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  handleValidation = () => {
    const { email, password } = this.state;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
  };

  LoginFunction = async (e) => {
    e.preventDefault();
    await this.handleValidation();
    if (this.state.validEmail && this.state.validpassword) {
      const httpInstance = axios.create({
        baseURL: "http://localhost:3030/",
        timeout: 10000,
        headers: { "Content-Type": "application/json" },
      });
      httpInstance.interceptors.response.use(null, (error) => {
        const expectedError =
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500;
        if (!expectedError) {
          // Loggear mensaje de error a un servicio como Sentry
          // Mostrar error genérico al usuario
          return Promise.reject(error);
        }
      });
      const { email, password } = this.state;
      await httpInstance
        .post("login", { email: email, password: password })
        .then((respuesta) => {
          if (respuesta.statusText === "OK") {
            console.log(respuesta.data);
            localStorage.setItem(
              "login",
              JSON.stringify({
                token: respuesta.data.token,
                data: respuesta.data.datos,
              })
            );

            this.props.history.push("/Dashboard/Desktop");
          } else {
            console.log("error fatal");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  render() {
    return (
      <div className="container-fluid o-login-container h-100 pb-4 pb-sm-0">
        <Navbar />
        <div className="o-login-form">
          <h3 className="text-white m-0 mt-4 mt-sm-0">El mejor lugar</h3>
          <h3 className="text-white m-0">Para tu trabajar con tu equipo</h3>
          <p className="mt-2 text-white font-weight-bold ">
            Bienvenido, por favor ingresa con tu cuenta
          </p>
          <form className="position-relative" onSubmit={this.LoginFunction}>
            <div className={this.state.validEmail ? "" : "o-login-error"}>
              <MDBInput
                onChange={(event) => {
                  this.setState({ email: event.target.value });
                }}
                label="Correo"
                className={
                  (this.state.validEmail ? "" : "is-invalid ") +
                  "o-login-input mt-5 text-white"
                }
                type="text"
                maxLength="250"
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
            <div className={this.state.validpassword ? "" : "o-login-error"}>
              <MDBInput
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
                label="Contraseña"
                className={
                  (this.state.validpassword ? "" : "is-invalid ") +
                  "o-login-input mt-5 text-white"
                }
                type="password"
                icon="lock"
                maxLength="15"
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
            <div className="form-row mt-5">
              <div className="form-check col-6">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input "
                    id="chekRemberme"
                  />
                  <label
                    className="custom-control-label  font-weight-bold  text-info"
                    htmlFor="chekRemberme"
                  >
                    Recuerdame
                  </label>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <a
                  className="text-info text-right o-login-text font-weight-bold "
                  href="/PasswordRecovering"
                >
                  Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div className="row ml-1">
              <div className="col-6">
                <button
                  className=" bg-primary z-depth-0 text-light ml-0 mr-0 mt-4 font-weight-bold o-button"
                  type="submit"
                >
                  Ingresar
                </button>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <a
                  className=" btn-white z-depth-0 mt-4 text-primary font-weight-bold mr-0 o-button"
                  href="/Signin"
                  role="button"
                >
                  Registrarse
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
