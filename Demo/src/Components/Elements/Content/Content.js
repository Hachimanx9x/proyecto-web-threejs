import React from "react";
import classNames from "classnames";
import "./Content.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Projects from "../../Pages/Projects/Projects";
import Topbar from "./Topbar";
import Documentation from "../../Pages/Documentation/Documentation";
import Doc2 from "../../Pages/Documentation/Doc2";
import Loged from "../../Pages/Loged/Dashboard";
import CreateProject from "../../Pages/Projects/CreateProject";
import SearchTalents from "../../Pages/SearchTalents/SearchTalents";
import Contacts from "../../Pages/Contacts/Contacts";
import CalendarEvents from "../../Pages/Calendar/CalendarEvents";
import CreateEvent from "../../Pages/Calendar/CreateEvent";
import ContactProfile from "../../Pages/ContactProfile/ContactProfile";
import Desktop from "../../Pages/Desktop/Desktop";
import FinishRegister from "../../Pages/Sigin/FinishRegister";
import Meetings from "../../Pages/Meetings/Meetings";
import Activities from "../../Pages/Activities/Activities";
import DocSMMV from "../../Pages/Documentation/DocSMMV";
import DocCEM from "../../Pages/Documentation/DocCEM";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <div
    className={classNames("content container-fluid", {
      "is-open": sidebarIsOpen,
    })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
      <Route exact path="Dashboard" component={Loged} />
      <Route exact path="/Dashboard/Projects" component={Desktop} />
      <Route
        exact
        path="/Dashboard/Projects/CreateProject"
        component={CreateProject}
      />{" "}
      <Route
        exact
        path="/Dashboard/Projects/DocumentationSMMV"
        component={DocSMMV}
      />
      <Route
        exact
        path="/Dashboard/Projects/DocumentationCEM"
        component={DocCEM}
      />
      <Route exact path="/Dashboard/Projects/:id" component={CreateProject} />
      <Route exact path="/Dashboard/Activities" component={Activities} />
      <Route exact path="/Dashboard/Contacts" component={Contacts} />
      <Route exact path="/Dashboard/Contacts/:id" component={ContactProfile} />
      <Route exact path="/Dashboard/Calendar" component={CalendarEvents} />
      <Route
        exact
        path="/Dashboard/Calendar/CreateEvent"
        component={CreateEvent}
      />
      <Route
        exact
        path="/Dashboard/Projects/Documentation"
        component={Documentation}
      />
      <Route exact path="/Dashboard/Projects/Documentation2" component={Doc2} />
      <Route exact path="/Dashboard/Meetings" component={Meetings} />
      <Route
        exact
        path="/Dashboard/FinishRegister"
        component={FinishRegister}
      />
      <Redirect to="/Dashboard/Projects" />
    </Switch>
  </div>
);

export default Content;
