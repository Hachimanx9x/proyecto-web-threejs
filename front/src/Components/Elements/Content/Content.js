import React from "react";
import classNames from "classnames";
import "./Content.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Projects from "../../Pages/Projects/Projects";
import Topbar from "./Topbar";
import Documentation from "../../Pages/Documentation/Documentation";
import Doc2 from "../../Pages/Documentation/Doc2";
import Loged from "../../Pages/Loged/Loged";
const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <div
    className={classNames("content container-fluid", {
      "is-open": sidebarIsOpen,
    })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
      <Route exact path="/Loged/Desktop" component={() => "Escritorio"} />
      <Route exact path="/Loged/Projects" component={Projects} />
      <Route exact path="/Loged/Contacts" component={Documentation} />
      <Route
        exact
        path="/Loged/SearchContacts"
        component={() => "Búsqueda de Contactos"}
      />
      <Route exact path="Loged" component={Loged}/>
      <Route exact path="/Loged/Calendar" component={Doc2} />
    </Switch>
  </div>
);

export default Content;
