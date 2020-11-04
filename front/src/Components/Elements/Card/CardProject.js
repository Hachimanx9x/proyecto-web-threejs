import React from "react";
import project from "../../../project.PNG";
import PropTypes from "prop-types";

const CardProject = ({ title, description, image }) => {
  return (
    <div className="card m-3 o-card-project">
      <div className="card-header bg-transparent o-card-project-title">{title}</div>
      <img className="card-img o-card-project-image" src={image} />
      <div className="card-body o-card-description">
        <p className="card-text o-card-description-text ">{description}</p>
      </div>
      <div className="card-footer bg-transparent border-transparent">
        <a href="#" className="btn btn-primary btn-sm o-card-project-button mr-4">
          Crear
        </a>
        <a
          href="#"
          className="btn btn-light border-primary text-primary btn-sm o-card-project-button ml-4"
        >
          Eliminar
        </a>
      </div>
    </div>
  );
};
CardProject.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
export default CardProject;
