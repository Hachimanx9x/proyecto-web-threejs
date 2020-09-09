import React, { Component } from "react";
import "./SignIn.css";

class SigIn extends Component {
  constructor() {
    super();
    this.state = { inputName: "" };
    this.state = { inputEmail: "" };
    this.state = { inputPass: "" };
    this.state = { inputConfirmPass: "" };
  }

  componentWillMount() {
    const token = localStorage.getItem("login");

    if (token == null || token === undefined) {
      //El metodo de redireccionamiento.
      //this.props.history.push("/");
    } else {
      const obj = JSON.parse(token);
      const tokensito = obj.token;

      fetch("http://localhost:3030/api/protegido", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `llave ${tokensito}`,
        },
      }).then((response) => {
        response.json().then((result) => {
          console.log(result);
        });
      });
    }
  }
  cargar() {}

  render() {
    return (
      <div className="o-big-container">
        <div className="o-sigIn">
          <form>
            <h3 className="text-white m-0">El mejor lugar</h3>
            <h3 className="text-white m-0">Para tu trabajar con tu equipo</h3>
            <p className="mt-2 mb-8 text-white font-weight-bold ">
              Bienvenido, por favor registrarte
            </p>
            <div className="row">
              <div className="form-group col-md-12 input-group-lg">
                <label for="userName" className="font-weight-bold text-info">
                  Nombre
                </label>
                <input
                  type="text"
                  class="form-control bg-transparent o-textbox mt-2 text-white o-input"
                  id="userName"
                  aria-label="Large"
                  placeholder="Nombre"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12 input-group-lg">
                <label for="email" className="font-weight-bold text-info">
                  Correo
                </label>
                <input
                  type="email"
                  class="form-control bg-transparent o-textbox mt-2 text-white "
                  id="userEmail"
                  aria-label="Large"
                  placeholder="Correo"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12 input-group-lg">
                <label for="password" className="font-weight-bold text-info">
                  Contraseña
                </label>
                <input
                  type="password"
                  class="form-control bg-transparent o-textbox mt-2 text-white o-input"
                  id="userPassword"
                  aria-label="Large"
                  placeholder="Contraseña"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12 input-group-lg">
                <label for="password" className="font-weight-bold text-info">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  class="form-control bg-transparent o-textbox mt-2 text-white "
                  id="userConfirmPassword"
                  aria-label="Large"
                  placeholder="Confirmar Contraseña"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="col-sm ">
                <a className="text-info font-weight-bold " href="/">
                  Ya tienes cuenta? Ingresa con ella.
                </a>
              </div>
            </div>
            <div className="o-buttons">
              <button
                className="btn btn-primary mt-4 o-btn font-weight-bold btn-lg"
                type="submit"
              >
                Registrarse
              </button>

              <a
                className="btn btn-light mt-4 btn-lg text-primary font-weight-bold ml-3"
                href="/"
                role="button"
              >
                Cancelar
              </a>
            </div>
          </form>
        </div>
        <div className="o-mid-container">
          <img
            className="o-background-img"
            alt="imagen login"
            src={require("../../../Logos/Group102.png")}
          />
        </div>
      </div>
    );
  }
}

export default SigIn;
