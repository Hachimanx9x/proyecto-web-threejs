import React from "react";
import classNames from "classnames";
import "./Content.css";
import { Switch, Route } from "react-router-dom";
import Projects from "../../Pages/Projects/Projects";
import Topbar from "./Topbar";
import Documentation from "../../Pages/Documentation/Documentation";
import Doc2 from "../../Pages/Documentation/Doc2";
import Loged from "../../Pages/Loged/Dashboard";
import CreateProject from "../../Pages/Projects/CreateProject";
import SearchTalents from "../../Pages/SearchTalents/SearchTalents";
import Contacts from "../../Pages/Contacts/Contacts";
import CalendarEvents from "../Calendar/CalendarEvents";
import CreateEvent from "../Calendar/CreateEvent";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <div
    className={classNames("content container-fluid", {
      "is-open": sidebarIsOpen,
    })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
      <Route exact path="/Dashboard/Desktop" component={() => "Escritorio"} />
      <Route exact path="/Dashboard/Projects" component={Projects} />
      <Route exact path="/Dashboard/Projects/CreateProject" component={CreateProject} />

      <Route exact path="/Dashboard/Projects/Documentation" component={Documentation} />
      <Route exact path="/Dashboard/Contacts" component={Contacts} />
      <Route
        exact
        path="/Dashboard/SearchTalents"
        component={SearchTalents}
      />
      <Route exact path="Dashboard" component={Loged} />
      <Route exact path="/Dashboard/Projects/Documentation2" component={Doc2} />
      <Route exact path="/Dashboard/Calendar" component={CalendarEvents} />
      <Route exact path="/Dashboard/Calendar/CreateEvent" component={CreateEvent} />
    </Switch>
  </div>
);

export default Content;
