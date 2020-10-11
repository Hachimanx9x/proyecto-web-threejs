import React, { Component } from "react";
import SideToggler from "./SideToggler";

class Loged extends Component {
  componentWillMount() {
    const token = localStorage.getItem("login");
  /*
    if (token == null || token === undefined || token == "") {
      //El metodo de redireccionamiento.
      this.props.history.push("/Login");
    } else {
      const obj = JSON.parse(token);
      const tokensito = obj.token;

      fetch("http://localhost:3030/proyectos", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `llave ${tokensito}`,
        },
      }).then((response) => {
        response.json().then((result) => {
          console.log(result); //falta mapear el resultado
        });
      });
    }*/
  }
  render() {
    return <SideToggler />;
  }
}

export default Loged;
