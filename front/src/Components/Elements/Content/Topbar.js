import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faAlignJustify,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import User from "../../../Logos/user-icon.png";
const Topbar = ({ toggleSidebar, sidebarIsOpen }, props) => {
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const token = localStorage.getItem("login");
  let activeLink = true;

  let name = "Perfil";
  let foto = User;
  if (token !== "" && token !== undefined && token !== null) {
    const obj = JSON.parse(token);
    const data = obj.data;
    name = data.nombre.split(" ", 1);
    if (data.herramientas.length === 0) {
      activeLink = false;
    }
    if (data.foto !== null && data.foto !== "null") {
      foto = data.foto;
    }
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
    <nav className="navbar sticky-top shadow-sm p-3 mb-5 grey lighten-5 navbar-expand o-nav  rounded">
      <button
        className="btn btn-primary p-0 border-0 z-depth-0  btn-lg text-light  rounded  o-btns"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon
          icon={windowWidth < 590 ? faBars : faChevronRight}
          className={
            windowWidth > 590
              ? "o-topbar-arrow " +
                (sidebarIsOpen ? "" : "o-topbar-arrow-close")
              : ""
          }
          style={{ fontSize: "1.5rem" }}
        />
      </button>
      <button
        className="navbar-toggler btn btn-light z-depth-0  btn-lg text-secondary border   p-3 rounded o-btns   "
        data-toggle="collapse"
        aria-label="Toggle navigation"
        onClick={toggleTopbar}
      >
        <FontAwesomeIcon icon={faAlignJustify} />
      </button>
      <div
        className={`${
          topbarIsOpen ? "collapse" : ""
        } navbar-collapse justify-content-end`}
        id="navbar-menu"
      >
        <a
          className={`nav-link text-info d-flex aligin-items-center ${
            !activeLink ? " disabled" : ""
          }`}
          href="/Dashboard/InfoUser"
        >
          <label className="m-auto pr-1 font-weight-bold">{name}</label>
          <img
            src={foto}
            alt="User"
            style={{ height: "3rem", width: "3rem", borderRadius: "50%" }}
          />
        </a>
      </div>
    </nav>
  );
};

export default Topbar;
