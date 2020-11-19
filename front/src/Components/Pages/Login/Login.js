import React, { Component } from "react";
import axios from 'axios';
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = { correo: "", password: "", login: false, store: null };
    this.loginfun = this.loginfun.bind(this)
  }
  
  componentWillMount(){
    this.httpInstance = axios.create( {
      baseURL:"http://localhost:3030/",
      timeout: 100000,
      headers: {'Content-Type': 'application/json'}
  });
 this.httpInstance.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedError) {
        // Loggear mensaje de error a un servicio como Sentry
        // Mostrar error genérico al usuario
        return Promise.reject(error);
    }
  }
);

  }

  loginfun =  () => {
   
    const { correo, password } = this.state; 
    console.log(`El correo es ${correo} y la contraseña es ${password}`);  

 
  //------
  this.httpInstance.post('login',{ correo, password }).then(respuesta => {
    if(respuesta.statusText === "OK" ){
      console.log(respuesta.data);
      localStorage.setItem(
        "login",
        JSON.stringify({
          token: respuesta.data.token,
        })
      );
      
      this.props.history.push("/Dashboard/Desktop");
    }else{
      console.log("error fatal")
    }
    
}).catch(error => {
    console.error(error);
})


  };//fin de login fun 

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
                <label htmlFor="useName" className="font-weight-bold text-info">
                  Correo
                </label>
                <input
                  type="email"
                  className="form-control bg-transparent o-textbox mt-2 text-white o-input"
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
                <label htmlFor="useName" className="font-weight-bold text-info">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control bg-transparent o-textbox mt-2 text-white "
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
              <div className="form-check mr-4">
                <input type="checkbox" className="form-check-input o-check" />
                <label className="form-check-label font-weight-bold  text-info">
                  Remember me
                </label>
              </div>
              <div className="col-sm ml-5">
                <a className="text-info font-weight-bold " href="/PasswordRecovering">
                  Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div className="o-buttons">
              <button
                className="btn btn-primary mt-4 o-btn font-weight-bold btn-lg"
                type="button"
                onClick={this.loginfun}
              >
                Ingresar
              </button>

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
            src={require("../../../Logos/Group102.png")}
          />
        </div>
      </div>
    );
  }
}

export default Login;
/*Codugo basura */
/**
 var data = JSON.stringify({ "correo": "micorreo@uao.edu.co", "password": "contraseña123" });

var config = {
    method: 'post',
    url: 'http://localhost:3030/login',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    data: data
};

axios(config)
    .then((response)=> {
      localStorage.setItem(
        "login",
        JSON.stringify({
          token: response.data,
        })
      );
               
    })
    .catch( (error) =>{
        console.log(error);
    }); 
  
 
 const value = JSON.stringify({ correo, password }); 
   console.log(value); 
   await  fetch(url)
  .then(response => response.json())
  .then(data =>{
    console.log(data.token); 
    localStorage.setItem(
      "login",
      JSON.stringify({
        token: data.token,
      }),
      )
      this.props.history.push("/Loged/Desktop");
  });


  await  fetch(url, {
    mode: 'no-cors',
    method: "POST",   
    headers: {
      'Content-Type':'application/json',
      "Access-Control-Allow-Origin":"*"
    },
    body : value,
    redirect: 'follow'
  }).then(async (response) => {
    if (!response.ok){
      console.log("fallo perro"); 
    }else{
      console.log(response); 
      response.json().then((result) => {
         console.log(result.token);
         
         localStorage.setItem(
           "login",
           JSON.stringify({
             token: result.token,
           })
         );
       });
    }

//  await  console.log(response); 
  })

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*");
  
  var raw = JSON.stringify({ correo, password });
  
  var requestOptions = {
    mode: 'no-cors',
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
 await fetch("http://localhost:3030/login", requestOptions)
    .then(response => {
      response.json().then((result)=>{
        console.log(result.token);
      });

    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

*/

 