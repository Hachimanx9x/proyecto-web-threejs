import React, { useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SubMenu = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(!collapsed);
  const { icon, title, items } = props;

  return (
    <div>
      <li
        onClick={toggle}
        className={classNames("nav-item  ", {
          "menu-open": !collapsed,
        })}
      >
        <a className=" dropdown-toggle">
          <FontAwesomeIcon icon={icon} />
          {title}
        </a>
      </li>
      <div className={`${collapsed ? "collapse" : ""} items-menu  `} id="menu">
        {items.map((item, index) => (
          <li key={index} className="nav-item">
            <a className="nav-lik" tag={Link} to={item.target}>
              {item.title}
            </a>
          </li>
        ))}
      </div>
    </div>
  );
};

export default SubMenu;
