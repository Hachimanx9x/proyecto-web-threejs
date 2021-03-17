import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Pages/Login/Login2";
import SigIn from "../Pages/Sigin/SignIn2";
import Loged from "../Pages/Loged/Dashboard";
import Test from "../Pages/test/test";
import Test3d from "../Pages/test/test3d";
import Test3d2 from "../Pages/test/tes3dsimple";
import TestFile from "../Pages/test/testfiles";
import TestAxios from "../Pages/test/maxios";
import LandingPage from "../Pages/LandingPage/LandingPage.jsx";

class Main extends Component {
  Redirect() {
    const token = localStorage.getItem("login");
    //El metodo de redireccionamiento.
    if (token == null || token === undefined) {
      return <Redirect to="/Home" />;
    } else {
      return <Redirect to="/Dashboard/Desktop" />;
    }
  }
  render() {
    return (
      <div className="o-container-main">
        <Switch>
          <Route exact path="/Home" component={LandingPage} />
          <Route exact path="/Login" component={Login} />
          <Route path="/SignIn" component={SigIn} />
          <Route path="/Dashboard" component={Loged} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/test3d" component={Test3d} />
          <Route exact path="/test3dsimple" component={Test3d2} />
          <Route exact path="/testfile" component={TestFile} />
          <Route exact path="/axios" component={TestAxios} />
          {this.Redirect()}
        </Switch>
      </div>
    );
  }
}

export default Main;
