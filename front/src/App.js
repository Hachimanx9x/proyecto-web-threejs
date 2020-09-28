import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Pages/Login/Login";
import SigIn from "./Components/Pages/Registro/SignIn";
import "bootstrap/dist/css/bootstrap.min.css";
import Loged from "./Components/Pages/Loged/Loged";
import Projects from "./Components/Pages/Projects/Projects";
import Test from "./Components/Pages/test/test"
import Test3d from "./Components/Pages/test/test3d"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Loged" component={Loged} />
        <Route path="/SignIn" component={SigIn} />
        <Route exact path="/Loged/Projects" component={Loged} />
        <Route exact path="/Loged/Contacts" component={Loged} />
        <Route exact path="/Loged/SearchContacts" component={Loged} />
        <Route exact path="/Loged/Calendar" component={Loged} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/test3d" component={Test3d } />
      </Switch>
    </Router>
  );
}

export default App;
