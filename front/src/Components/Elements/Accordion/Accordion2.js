import React from "react";
import "./AccordionStyles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AccordionStyles.css";
import {
  faPlus, faCaretRight, faMinus } from "@fortawesome/free-solid-svg-icons";
const Accordion2 = ({title, active, setActive}) => {
    return(
        <div className="accordion-section">
        <button className="accordion-title" >
          <p >{title}</p>
          <span onClick={() => setActive(title)} className={active ? "accordion-icon rotate" : "accordion-icon"}>
          <FontAwesomeIcon icon={active ? faMinus: faPlus } className="mr-2 rotated" />
          </span>
        </button>
  
        <div className={(active === title ? "show": "" ) + " accordion-content"}>
          aaaa
        </div>
      </div>
    )
}

export default Accordion2;