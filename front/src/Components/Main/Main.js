import React, { Component } from "react";
import { Switch, Route, Router, Redirect, withRouter } from "react-router-dom";
import Login from "../Pages/Login/Login";
import SigIn from "../Pages/Registro/SignIn";
import Loged from "../Pages/Loged/Loged";
import Projects from "../Pages/Projects/Projects";
import Test from "../Pages/test/test";
import Test3d from "../Pages/test/test3d";
import "bootstrap/dist/css/bootstrap.min.css";

class Main extends Component {
  Redirect() {
    const token = localStorage.getItem("login");
    //El metodo de redireccionamiento.
    if (token == null || token === undefined) {
      return (
        <div>
          <Redirect to="/Login" />
        </div>
      );
    } else {
      return (
        <div>
          <Redirect to="/Loged/Desktop" />
        </div>
      );
    }
  }
  render() {
    return (
      <div className="o-container-main">
        <Switch>
          <Route exact path="/Login" component={Login} />
          <Route path="/SignIn" component={SigIn} />
          <Route path="/Loged" component={Loged} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/test3d" component={Test3d} />
          {this.Redirect()}
        </Switch>
      </div>
    );
  }
}

export default Main;
