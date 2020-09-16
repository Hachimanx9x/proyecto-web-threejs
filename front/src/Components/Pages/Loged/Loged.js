import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SideBar from "../../Elements/Sidebar/SideBar";
import Content from "../../Elements/Content/Content";

const Loged = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <Router>
      <div className="App wrapper">
        <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
        <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
      </div>
    </Router>
  );
};


export default Loged;
/*
 componentDidMount() {
    const token = localStorage.getItem("login");

    if (token == null || token === undefined) {
      //El metodo de redireccionamiento.
      this.props.history.push("/Signin");
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
          console.log(result);//falta mapear el resultado 
        });
      });
    }
  }
*/