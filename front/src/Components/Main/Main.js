import React, { Component } from "react";
import { Switch, Route, Redirect, } from "react-router-dom";
import Login from "../Pages/Login/Login";
import SigIn from "../Pages/Sigin/SignIn";
import Loged from "../Pages/Loged/Dashboard";
import Test from "../Pages/test/test";
import Test3d from "../Pages/test/test3d";
import TestFile from "../Pages/test/testfiles";
import TestAxios from "../Pages/test/maxios";
import "bootstrap/dist/css/bootstrap.min.css";

class Main extends Component {
  Redirect() {
    const token = localStorage.getItem("login");
    //El metodo de redireccionamiento.
    if (token == null || token === undefined) {
      return (

        <Redirect to="/Login" />

      );
    } else {
      return (

        <Redirect to="/Dashboard/Desktop" />

      );
    }
  }
  render() {
    return (
      <div className="o-container-main">
        <Switch>
          <Route exact path="/Login" component={Login} />
          <Route path="/SignIn" component={SigIn} />
          <Route path="/Dashboard" component={Loged} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/test3d" component={Test3d} />
          <Route exact path="/testfile" component={TestFile} />
          <Route exact path="/axios" component={TestAxios} />
          {this.Redirect()}
        </Switch>
      </div>
    );
  }
}

export default Main;
