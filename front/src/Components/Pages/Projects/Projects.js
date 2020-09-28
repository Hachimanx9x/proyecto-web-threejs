import React, { Component } from "react";
import CardProject from "../../Elements/Card/CardProject";
import projectPNG from "../../../project.PNG";
import illustration from "../../../ilustracion-equipo-de-trabajo.jpg";

class Projects extends Component {
  constructor() {
    super();
  }
  /**
   * 
   */
  componentWillMount() {
    const token = localStorage.getItem("login");

    if (token == null || token === undefined) {
      //El metodo de redireccionamiento.
      this.props.history.push("/");
    } else {
      const obj = JSON.parse(token);
      const tokensito = obj.token;

      fetch("http://localhost:3030/proyectos", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `llave ${tokensito}`,
        },
      }).then((response) => {
        response.json().then((result) => {
          console.log(result);//falta mapear el resultado 
        });
      });
    }
  }

  render() {
    return (
      <div>
        {" "}
        <h4>Proyectos</h4>
        <div className="row">
          <div class="card m-3 o-card-project">
            <div class="card-header bg-transparent o-card-project-title">
              Proyectos
            </div>
            <img class="card-img o-card-project-image" src={projectPNG} />
            <div class="card-body">
              <p class="card-text o-card-project-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
            <div class="card-footer bg-transparent border-transparent">
              <a href="#" class="btn btn-primary btn-sm o-card-project-button">
                Crear
              </a>
            </div>
          </div>
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
