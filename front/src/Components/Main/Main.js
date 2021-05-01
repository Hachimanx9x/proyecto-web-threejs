import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Pages/Login/Login2";
import SigIn from "../Pages/Sigin/SignIn2";
import Loged from "../Pages/Loged/Dashboard";
import Test3d from "../Pages/test/test3d";
import LandingPage from "../Pages/LandingPage/LandingPage.jsx";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ruta: "/Dashboard/Projects",
    };
  }
  componentDidMount = () => {
    const token = localStorage.getItem("login");
    let path = window.location.pathname;
    if (token === null || token === undefined || token === "") {
      this.setState({ ruta: "/Login" });
    } else {
      if (path.split("/")[1] !== "Dashboard" && path.split("/")[1] !== "Room") {
        window.location.href = "/Dashboard/Projects";
      }
    }
  };
  render() {
    return (
      <div className="o-container-main">
        <Switch>
          <Route exact path="/Home" component={LandingPage} />
          <Route exact path="/Login" component={Login} />
          <Route path="/SignIn" component={SigIn} />
          <Route path="/Dashboard" component={Loged} />
          <Route exact path="/Room/:id" component={Test3d} />
          <Redirect to={this.state.ruta} />
        </Switch>
      </div>
    );
  }
}

export default Main;
