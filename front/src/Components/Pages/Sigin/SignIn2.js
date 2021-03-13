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
    this.state = { name: "", email: "", password: "", confirmpassword: "" };
    this.RegisterFunction = this.RegisterFunction.bind(this);
  }

  RegisterFunction = async (e) => {
    e.preventDefault();
    const httpInstance = axios.create({
      baseURL: "http://localhost:3030/",
      timeout: 1000,
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
    const { email, password, nombre } = this.state;

    //------
    await httpInstance
      .post("/create/usuario", {
        email,
        password,
        nombre,
      })
      .then((respuesta) => {
        if (respuesta.statusText === "OK") {
          console.log(respuesta.data);
          localStorage.setItem(
            "login",
            JSON.stringify({
              token: respuesta.data.token,
            })
          );

          this.props.history.push("/Dashboard/FinishRegister");
        } else {
          console.log("error fatal");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="container-fluid o-sigin-container h-100 pb-4 pb-sm-0">
        <Navbar />
        <div className="o-sigin-form m-0 mt-sm-5">
          <form onSubmit={this.RegisterFunction}>
            <h3 className="text-white m-0">El mejor lugar</h3>
            <h3 className="text-white m-0">Para tu trabajar con tu equipo</h3>
            <p className="mt-2 text-white font-weight-bold ">
              Bienvenido, por favor registrate
            </p>
            <MDBInput
              onChange={(event) => {
                this.setState({ nombre: event.target.value });
              }}
              label="Nombre"
              className="o-sigin-input text-white"
              type="text"
              icon="user"
            />

            <MDBInput
              onChange={(event) => {
                this.setState({ email: event.target.value });
              }}
              label="Correo"
              className="o-sigin-input mt-5 text-white"
              type="email"
              icon="envelope"
            />
            <MDBInput
              onChange={(event) => {
                this.setState({ password: event.target.value });
              }}
              label="Contraseña"
              className="o-sigin-input mt-5 text-white"
              type="password"
              icon="lock"
            />

            <MDBInput
              onChange={(event) => {
                this.setState({ confirmpassword: event.target.value });
              }}
              label="Confirmar contraseña"
              className="o-sigin-input mt-5 text-white"
              type="password"
              icon="lock"
            />
            <div className="form-row">
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
                  REGISTRARSE
                </button>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <a
                  className=" btn-white z-depth-0 mt-2 text-primary font-weight-bold mr-0 o-button"
                  href="/Login"
                  role="button"
                >
                  CANCELAR
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
