import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faDoorOpen,
  faCalendarAlt,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../Logos/softmedia_logo.svg";
import LogoSmall from "../../../Logos/Logo.svg";

const deleteUser = () => {
  localStorage.setItem("login", "");

  console.log(localStorage.getItem("login"));
};
const SideBar = ({ isOpen, toggle }) => {
  const token = localStorage.getItem("login");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeLink, setActiveLink] = useState(true);
  const obj = JSON.parse(token);

  const data = obj.data;
  if (data.herramientas.length === 0) {
    setActiveLink(false);
  }

  useEffect(() => {
    function resize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", resize);
    resize();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <div id="sidebar" className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>

        <NavLink
          to="/Dashboard/Projects"
          className={token === "registrandose" ? "disabled" : ""}
        >
          {" "}
          <img
            src={windowWidth < 590 ? Logo : isOpen ? Logo : LogoSmall}
            alt="Softmedia"
            className={
              "text-center " +
              (windowWidth > 590 && !isOpen ? "o-small-logo" : "")
            }
          />
        </NavLink>
      </div>
      <div className="side-menu">
        <div className="list-unstyled pb-3">
          <NavLink
            activeClassName="active"
            className={token === "registrandose" ? "disabled" : ""}
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
            className={token === "registrandose" ? "disabled" : ""}
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
            className={token === "registrandose" ? "disabled" : ""}
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
        </div>
      </div>
    </div>
  );
};

export default SideBar;
