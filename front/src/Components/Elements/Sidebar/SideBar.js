import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faDoorOpen,
  faCalendarAlt,
  faUserFriends,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../Logos/softmedia_logo.svg";
import LogoSmall from "../../../Logos/Logo.svg";
import useWindowSize from "../Hooks/useWindowSize";

const deleteUser = () => {
  localStorage.setItem("login", "");

  console.log(localStorage.getItem("login"));
};
const SideBar = ({ isOpen, toggle }) => {
  const { width } = useWindowSize();
  const token = localStorage.getItem("login");
  let activeLink = true;
  if (token !== "" && token !== undefined && token !== null) {
    const obj = JSON.parse(token);
    const data = obj.data;
    if (data.herramientas.length === 0) {
      activeLink = false;
    }
  }
  return (
    <div id="sidebar" className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>

        <NavLink
          to="/Dashboard/Projects"
          className={!activeLink ? "disabled" : ""}
        >
          {" "}
          <img
            src={width < 590 ? Logo : isOpen ? Logo : LogoSmall}
            alt="Softmedia"
            className={
              "text-center " + (width > 590 && !isOpen ? "o-small-logo" : "")
            }
          />
        </NavLink>
      </div>
      <div className="side-menu">
        <div className="list-unstyled pb-3 d-flex flex-column justify-content-end h-100 ">
          <NavLink
            activeClassName="active"
            className={!activeLink ? "disabled" : ""}
            to="/Dashboard/Projects"
          >
            <div className="nav-item">
              <li tag={Link} to={"/Dashboard/Projects"}>
                <button className="btn z-depth-0 o-link-btn font-weight-bold text-capitalize">
                  <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
                  <p> Proyectos</p>
                </button>
              </li>
            </div>
          </NavLink>

          <NavLink
            activeClassName="active"
            to="/Dashboard/Contacts"
            className={!activeLink ? "disabled" : ""}
          >
            <div className="nav-item">
              <li tag={Link} to={"/Dashboard/Contacts"}>
                <button className="btn z-depth-0 o-link-btn font-weight-bold text-capitalize">
                  <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
                  <p> Contactos</p>
                </button>
              </li>
            </div>
          </NavLink>

          <NavLink
            activeClassName="active"
            to="/Dashboard/Calendar"
            className={!activeLink ? "disabled" : ""}
          >
            <div className="nav-item">
              <li tag={Link} to={"/Dashboard/Calendar"}>
                <button className="btn z-depth-0 o-link-btn font-weight-bold text-capitalize">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                  {"   "} <p> Calendario</p>
                </button>
              </li>
            </div>
          </NavLink>
          <div className="nav-item">
            <li tag={Link} to={"/Login"}>
              <a
                href="/Login"
                onClick={deleteUser}
                className="btn z-depth-0 o-link-btn font-weight-bold text-capitalize"
              >
                <FontAwesomeIcon icon={faDoorOpen} className="mr-2" />
                <p> Salir</p>
              </a>
            </li>
          </div>

          <div
            className={`${width < 590 ? "d-none" : ""} mt-auto border-0 h-auto`}
          >
            <button
              className="btn btn-block bg-transparent border-0 z-depth-0"
              onClick={toggle}
            >
              <h2>
                <FontAwesomeIcon
                  className={
                    "o-topbar-arrow w-100 " +
                    (isOpen ? "" : "o-topbar-arrow-close")
                  }
                  icon={faAngleDoubleRight}
                />
              </h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
/**    ? "o-topbar-arrow " +
                (sidebarIsOpen ? "" : "o-topbar-arrow-close")
              : "" */
