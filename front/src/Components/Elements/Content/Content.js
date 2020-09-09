import React from "react";
import classNames from "classnames";
import "./Content.css";
import { Switch, Route } from "react-router-dom";

import Topbar from "./Topbar";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <div
    className={classNames("content container-fluid", {
      "is-open": sidebarIsOpen,
    })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
      <Route exact path="/Loged/" component={() => "Escritorio"} />
      <Route exact path="/Loged/Projects" component={() => "Proyectos"} />
      <Route exact path="/Loged/Contacts" component={() => "Contactos"} />
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
