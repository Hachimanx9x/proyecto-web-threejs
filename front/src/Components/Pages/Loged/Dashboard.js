import React from "react";
import { useHistory } from "react-router";
import SideToggler from "./SideToggler";
//import axios from "axios";
export default function Dashboard() {
  const token = localStorage.getItem("login");
  // console.log("el token es => " + token);
  let temp = `${token}`;
  const history = useHistory();
  //   console.log(temp)/*
  /*  if (
      token === null ||
      token === undefined ||
      token === "" ||
      token === {} ||
      temp === "{}"
    ) {
    //El metodo de redireccionamiento.
    history.push("/Login");
  }*/

  /*
  async componentWillMount() {
    const token = localStorage.getItem("login");
    //console.log("el token es => "+  token);

    if (token === null || token === undefined || token === "") {
      //El metodo de redireccionamiento.
      this.props.history.push("/Login");
    } else {
      const obj = JSON.parse(token);
      const tokensito = obj.token;
      const httpInstance = axios.create({
        baseURL: "http://localhost:3030/",
        timeout: 1000,
        headers: {
          "Content-Type": "application/json",
          authorization: `llave ${tokensito}`,
        },
      }); //

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
      //------
      httpInstance
        .get("proyectos")
        .then((respuesta) => {
          if (respuesta.statusText === "OK") {
            console.log(respuesta.data);
          } else {
            console.log("error fatal");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } //fin del else

    /*
          let myHeaders = new Headers();
          myHeaders.append("authorization", `llave ${tokensito}`);
          
          const requestOptions = {
            mode: 'no-cors',
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
          
         await fetch("http://localhost:3030/proyectos", requestOptions)
         .then(response => response.json())
         .then(data =>{
           console.log(data); 
      
         });
    */
  /*   
     await  fetch("http://localhost:3030/proyectos", {
           mode: 'no-cors',
           method: "GET",
           headers: {
             "Content-type": "application/json",
             'authorization': `llave ${tokensito}`,
           },
         }).then((response) => {
           response.json().then((result) => {
             console.log(result); //falta mapear el resultado
           });
         });
   
         
   
         
       }
   */

  return <SideToggler />;
}
