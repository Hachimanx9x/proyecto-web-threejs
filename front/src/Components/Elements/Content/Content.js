import React from "react";
import classNames from "classnames";
import "./Content.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Projects from "../../Pages/Projects/Projects";
import Topbar from "./Topbar";
import Accordion from "../Accordion/Accordion";

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
      <Route exact path="/Loged/Contacts" component={Accordion} />
      <Route
        exact
        path="/Loged/SearchContacts"
        component={() => "Búsqueda de Contactos"}
      />
      <Route exact path="/Loged/Calendar" component={() => "Calendario"} />
    </Switch>
  </div>
);

export default Content;
