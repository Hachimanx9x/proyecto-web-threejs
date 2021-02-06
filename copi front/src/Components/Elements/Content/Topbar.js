import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faAlignJustify } from "@fortawesome/free-solid-svg-icons";

const Topbar = ({ toggleSidebar }, props) => {
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);

  return (
    <nav className="navbar sticky-top shadow-sm p-3 mb-5 grey lighten-5 navbar-expand-sm o-nav  rounded">
      <button
        className="btn btn-primary p-0 border-0 z-depth-0  btn-lg text-light  rounded  o-btns"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faAlignLeft} />
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
        className={`${topbarIsOpen ? "collapse" : ""
          } navbar-collapse justify-content-lg-end`}
        id="navbar-menu"
      >
        <a className="nav-link text-info" href="/Dashboard/InfoUser">Foto perfil</a>
      </div>
    </nav>
  );
};

export default Topbar;
