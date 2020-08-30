import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = { correo: "", password: "",login: false, store:null };
    
  }

  loginfun = () => {
    const { correo, password } = this.state;
    console.log(`El correo es ${correo} y la contraseña es ${password }`) ;
    const url = `http://localhost:3030/login`; 
    console.log("hol1"); 

     fetch(url,{
       method:"POST",
       body: JSON.stringify(this.state),
       headers:{
        'Content-Type': 'application/json'
      }
     })
     .then((response)=>{
       response.json().then(result=>{
         console.log(result.token); 
         localStorage.setItem('login',JSON.stringify({
           token: result.token
         }))
       })
     })
    
  }
 
  

  render() {
    return (
      <div className="o-big-container">
      <div className="o-login">
        <form>
          <h3 className="text-white m-0">El mejor lugar</h3>
          <h3 className="text-white m-0">Para tu trabajar con tu equipo</h3>
          <p className="mt-2 mb-8 text-white font-weight-bold ">
            Bienvenido, por favor ingresa con tu cuenta
          </p>
          <div className="row">
            <div className="form-group col-md-12 input-group-lg">
              <label for="useName" className="font-weight-bold text-info">
                Correo
              </label>
              <input
                type="email"
                class="form-control bg-transparent o-textbox mt-2 text-white o-input"
                id="userName"
                aria-label="Large"
                placeholder="Correo"
                onChange={(event) => {
                  this.setState({ correo: event.target.value });
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12 input-group-lg">
              <label for="useName" className="font-weight-bold text-info">
                Contraseña
              </label>
              <input
                type="password"
                class="form-control bg-transparent o-textbox mt-2 text-white "
                id="userPassword"
                aria-label="Large"
                placeholder="Contraseña"
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div class="form-check mr-4">
              <input type="checkbox" class="form-check-input o-check" />
              <label class="form-check-label font-weight-bold  text-info">
                Remember me
              </label>
            </div>
            <div className="col-sm ml-5">
              <a className="text-info font-weight-bold " href="#">
                Olvidaste tu contraseña?
              </a>
            </div>
          </div>
          <div className="o-buttons">
            <a
              className="btn btn-primary mt-4 o-btn font-weight-bold btn-lg"
              
              onClick={ this.loginfun }
            >
              Ingresar
            </a>

            <a
              className="btn btn-light mt-4 btn-lg text-primary font-weight-bold ml-3"
              href="/Signin"
              role="button"
            >
              Registrarse
            </a>
          </div>
        </form>
      </div>
      <div className="o-mid-container">
        <img
          className="o-background-img"
          alt="imagen login"
          src={require("../../Logos/Group102.png")}
        />
      </div>
    </div>
    );
  }
}

export default Login;
