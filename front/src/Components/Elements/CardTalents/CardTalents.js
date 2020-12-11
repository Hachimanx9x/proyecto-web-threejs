import React from "react";
import "./CardTalent.css";
import PropTypes from "prop-types";

const CardTalent = (name,description,picture,job,skills) => (
    <div>
        
  </div>  
);

CardTalent.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    skills: PropTypes.array.isRequired,
};

export default CardTalent;
