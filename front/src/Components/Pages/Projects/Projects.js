import React, { Component } from "react";
import CardProject from "../../Elements/Card/CardProject";
import projectPNG from "../../../project.PNG";
import illustration from "../../../ilustracion-equipo-de-trabajo.jpg";

class Projects extends Component {
  render() {
    return (
      <div>
        {" "}
        <h4>Proyectos</h4>
        <div className="row">
          <div className="card m-3 o-card-project">
            <div className="card-header bg-transparent o-card-project-title">
              Proyectos
            </div>
            <img className="card-img o-card-project-image" alt="baseImage" src={projectPNG} />
            <div className="card-body o-card-description">
              <p className="card-text o-card-description-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <div className="card-footer bg-transparent border-transparent">
              <a href="/Dashboard/Projects/CreateProject" className="btn btn-primary z-depth-0 p-2 btn-sm o-card-project-button">
                Crear
              </a>
            </div>
          </div>
          <CardProject
            title="Creación de entorno 3d para la web"
            description="Este proyecto es una guía firme de como unir un grupo de trabajo para la creación de un sistema multimedia.    Some quick example text to build on the card title and make up
            the bulk of the card's content. Some quick example text to build on the card title and make up
            the bulk of the card's content. Some quick example text to build on the card title and make up
            the bulk of the card's content. Some quick example text to build on the card title and make up
            the bulk of the card's content."
            image={illustration}
          />
          <CardProject
            title="Creación de entorno 3d para la web"
            description="Este proyecto es una guía firme de como unir un grupo de trabajo para la creación de un sistema multimedia."
            image={illustration}
          />
          <CardProject
            title="Creación de entorno 3d para la web"
            description="Este proyecto es una guía firme de como unir un grupo de trabajo para la creación de un sistema multimedia."
            image={illustration}
          />
          <CardProject
            title="Creación de entorno 3d para la web"
            description="Este proyecto es una guía firme de como unir un grupo de trabajo para la creación de un sistema multimedia."
            image={illustration}
          />
        </div>{" "}
      </div>
    );
  }
}

export default Projects;
