import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login/Login";
import SigIn from "./Components/Registro/SignIn";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/SignIn" component={SigIn} />
      </Switch>
    </Router>
  );
}

export default App;
