import React, { Component } from "react";
import SideToggler from "./SideToggler";

class Loged extends Component {
 async componentWillMount() {
    const token = localStorage.getItem("login");
    console.log("el token es => "+  token); 
  
    if (token == null || token === undefined || token == "") {
      //El metodo de redireccionamiento.
      this.props.history.push("/Login");
    } else {
      const obj = JSON.parse(token);
      const tokensito = obj.token;


      var myHeaders = new Headers();
      myHeaders.append("authorization", `llave ${tokensito}`);
      
      var requestOptions = {
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

      */
    }
  }
  render() {
    return <SideToggler />;
  }
}

export default Loged;
