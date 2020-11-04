import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faProjectDiagram,
  faDoorOpen,
  faCalendarAlt,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
 const deleteUser = (props) =>{
    localStorage.setItem(
      "login",
      ""
    );

    console.log(localStorage.getItem("login"))
  }
const SideBar = ({ isOpen, toggle }) => {
 
  return(
  <div id="sidebar" className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>Project Logo</h3>
    </div>
    <div className="side-menu">
      <div className="list-unstyled pb-3">

      <NavLink  activeClassName="active" to="/Loged/Desktop">
        <div className="nav-item">
          <li tag={Link} to={"/Loged/Desktop"}>
           
              <button className="btn o-link-btn  font-weight-bold " >          
              <FontAwesomeIcon icon={faHome} className="mr-2" />   
              Escritorio 
              </button>
                           
           
          </li>
        </div>
        </NavLink>

        <NavLink exact activeClassName="active" to="/Loged/Projects">
        <div className="nav-item">
          <li tag={Link} to={"/Loged/Projects"}>
          
                <button className="btn   o-link-btn  font-weight-bold ">
                <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
                Proyectos
              </button>
           
          </li>
        </div>
        </NavLink>

        <NavLink  activeClassName="active" to="/Loged/SearchContacts">
        <div className="nav-item">
          <li tag={Link} to={"/Loged/SearchContacts"}>
           
                <button className="btn   o-link-btn  font-weight-bold " >
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                Buscar Talentos
              </button>
           
          </li>
        </div>
        </NavLink>
        
            <NavLink  activeClassName="active" to="/Loged/Contacts">
              <div className="nav-item"  >
          <li tag={Link} to={"/Loged/Contacts"}>
                <button className="btn   o-link-btn  font-weight-bold " >
                <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
                Contactos
              </button>
          </li>
        </div>
        </NavLink>

        <NavLink  activeClassName="active" to="/Loged/Calendar">
        <div className="nav-item">
          <li tag={Link} to={"/Loged/Calendar"}>    
                <button className="btn   o-link-btn  font-weight-bold ">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Calendario
              </button>
          
          </li>
        </div>
        </NavLink>


        <div className="nav-item">
          <li tag={Link} to={"/Login"}>
           
              <a href="/Login" onClick={deleteUser} className="btn   o-link-btn  font-weight-bold ">
                <FontAwesomeIcon icon={faDoorOpen} className="mr-2" />
                Salir
              </a>
           
          </li>
        </div>
      </div>
      
    </div>
  </div>)
};

export default SideBar;
