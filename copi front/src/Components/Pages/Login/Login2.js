import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import axios from "axios";
import "./Login2.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", rememberMe: "" };
    this.LoginFunction = this.LoginFunction.bind(this);
  }

  LoginFunction = (e) => {
    e.preventDefault();
    this.props.history.push("/Dashboard/Desktop");
  };

  render() {
    return (
      <div className="container-fluid o-login-container h-100 pb-4 pb-sm-0">
        <div className="o-login-form">
          <h3 className="text-white m-0">El mejor lugar</h3>
          <h3 className="text-white m-0">Para tu trabajar con tu equipo</h3>
          <p className="mt-2 mb-8 text-white font-weight-bold ">
            Bienvenido, por favor ingresa con tu cuenta
          </p>
          <form onSubmit={this.LoginFunction}>
            <div className="row">
              <div className="form-group col-md-12 input-group-lg">
                <label htmlFor="useName" className="font-weight-bold text-info">
                  Correo
                </label>
                <MDBInput
                  onChange={(event) => {
                    this.setState({ email: event.target.value });
                  }}
                  label="Correo"
                  className="o-login-input text-white"
                  type="email"
                  icon="envelope"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12 input-group-lg">
                <label htmlFor="useName" className="font-weight-bold text-info">
                  Contraseña
                </label>
                <MDBInput
                  onChange={(event) => {
                    this.setState({ password: event.target.value });
                  }}
                  label="Contraseña"
                  className="o-login-input text-white"
                  type="password"
                  icon="lock"
                />
              </div>
            </div>

            <div className="form-row">
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
                  className=" blue accent-4 z-depth-0 text-light ml-0 mr-0 mt-4 font-weight-bold o-button"
                  type="button"
                  onClick={this.LoginFunction}
                >
                  INGRESAR
                </button>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <a
                  className=" btn-white z-depth-0 mt-4 text-primary font-weight-bold mr-0 o-button"
                  href="/Signin"
                  role="button"
                >
                  REGISTRARSE
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
