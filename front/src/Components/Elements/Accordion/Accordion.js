import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AccordionStyles.css";
import {
  faPlus, faCaretRight, faMinus } from "@fortawesome/free-solid-svg-icons";
const Accordion = (props) => {
  const [active, setActive] = useState(false);
  const contentRef = useRef(null);
  
  var activeTitle = "";
  useEffect(() => { 
    contentRef.current.style.maxHeight = active
      ? `500px`
      : "0px";
  }, [contentRef, active]);

  const toogleActive = () => {
    setActive(!active);
    console.log(active);
    activeTitle = props.title;
    console.log(activeTitle);
    
  };

  const titleStyle = {
    fontWeight: 600,
    fontSize: "14px"
  };

  return (
    <div className= " accordion-section" >
      <button className="accordion-title" onClick={toogleActive}>
        <p style={titleStyle}>{props.title}</p>
        <span className={active ? "accordion-icon rotate" : "accordion-icon"}>
        <FontAwesomeIcon icon={active ? faMinus: faPlus } className="mr-2 rotated" />
        </span>
      </button>

      <div ref={contentRef}   className={(active ? "show " : "") + " accordion-content " }>
        {props.children}
      </div>
    </div>
  );
};

export default Accordion;
