import React from "react";
import "./CardSkills.css";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardSkills = () => (
    <div className="o-card-select-skill rounded">
        <span className="o-x-btn"><FontAwesomeIcon icon={faTimesCircle} /></span>
        <img className="o-selected-skill-img" alt={"skill"} src="https://www.vectorlogo.zone/logos/python/python-icon.svg" />
        <div className="bg-primary text-white">
            <small style={{fontSize:"0.65rem"}}>Adobe Photoshop</small>
        </div>
    </div>
);

export default CardSkills;