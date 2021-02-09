import React, { Component } from "react";
import CardProject from "../../Elements/CardProjects/CardProject";
import projectPNG from "../../../project.PNG";
import illustration from "../../../ilustracion-equipo-de-trabajo.jpg";
import axios from "axios";
class Projects extends Component {
  componentDidMount() {
    const token = localStorage.getItem("login");
    const obj = JSON.parse(token);
    const tokensito = obj.token;
    const httpInstance = axios.create({
      baseURL: "http://localhost:3030/",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
        authorization: `llave ${tokensito}`,
      },
    }); //

    httpInstance.interceptors.response.use(null, (error) => {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
      if (!expectedError) {
        // Loggear mensaje de error a un servicio como Sentry
        // Mostrar error genérico al usuario
        return Promise.reject(error);
      }
    });
    //------
    httpInstance
      .get("proyectos")
      .then((respuesta) => {
        if (respuesta.statusText === "OK") {
          console.log(respuesta.data);
        } else {
          console.log("error fatal");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <div className="mb-3 mb-sm-0 pb-5 pb-sm-0">
        <h4>Proyectos</h4>
        <div className="row">
          <div className="card m-3 o-card-project">
            <div className="card-header bg-transparent o-card-project-title">
              Proyectos
            </div>
            <img
              className="card-img o-card-project-image"
              alt="baseImage"
              src={projectPNG}
            />
            <div className="card-body o-card-description">
              <p className="card-text o-card-description-text">
                Espacio para la creación de un nuevo proyecto.
              </p>
            </div>
            <div className="card-footer bg-transparent border-transparent">
              <a
                href="/Dashboard/Projects/CreateProject"
                className="btn btn-primary border-0 z-depth-0 p-2 btn-sm o-card-project-button"
              >
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
