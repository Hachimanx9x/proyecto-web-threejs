import React from "react";
import project from "../../../project.PNG";
import PropTypes from "prop-types";

const CardProject = ({ title, description, image }) => {
  return (
    <div class="card m-3 o-card-project">
      <div class="card-header bg-transparent o-card-project-title">{title}</div>
      <img class="card-img o-card-project-image" src={image} />
      <div class="card-body">
        <p class="card-text o-card-project-text">{description}</p>
      </div>
      <div class="card-footer bg-transparent border-transparent">
        <a href="#" class="btn btn-primary btn-sm o-card-project-button mr-4">
          Crear
        </a>
        <a
          href="#"
          class="btn btn-light border-primary text-primary btn-sm o-card-project-button ml-4"
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
