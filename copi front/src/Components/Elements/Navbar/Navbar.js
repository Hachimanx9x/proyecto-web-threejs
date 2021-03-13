import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../Logos/softmedia_logo.svg";
import "./Navbar.css";
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
export default function Navbar() {
  const [navbarIsOpen, setNavbarOpen] = useState(true);
  const toggleNavbar = () => setNavbarOpen(!navbarIsOpen);
  const size = useWindowSize();

  return (
    <nav
      className="navbar mt-1 fixed-top shadow-none navbar-expand-sm o-navbar  rounded"
      style={
        size.width > 590 ? { padding: "0 10rem" } : { padding: "0 0 0 1rem" }
      }
    >
      <a href="#">
        <img src={Logo} alt="Softmedia" />
      </a>

      <button
        className="navbar-toggler btn text-white bg-transparent border-0 z-depth-0  btn-lg text-secondary border   p-3 rounded o-btns   "
        data-toggle="collapse"
        aria-label="Toggle navigation"
        onClick={toggleNavbar}
      >
        <FontAwesomeIcon
          icon={faBars}
          style={{ color: "white", fontSize: "1.5rem" }}
        />
      </button>
      <div
        className={`${navbarIsOpen ? "collapse" : ""} navbar-collapse `}
        id="navbar-menu"
      >
        <NavLink activeClassName="active" to="/Home">
          <div className="o-navbar-item">
            <button className="btn z-depth-0 o-navbar-btn ">Explorar</button>
          </div>
        </NavLink>

        <NavLink activeClassName="active" className="ml-auto" to="/Login">
          <div className="o-navbar-item">
            <button className="btn z-depth-0  o-navbar-btn ">Ingresar</button>
          </div>
        </NavLink>
        <NavLink activeClassName="active" to="/SignIn">
          <div className="o-navbar-item">
            <button className="btn z-depth-0  o-navbar-btn ">
              Registrarse
            </button>
          </div>
        </NavLink>
      </div>
    </nav>
  );
}
