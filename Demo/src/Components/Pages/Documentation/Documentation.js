import React from "react";
import Accordion from "../../Elements/Accordion/Accordion"
import CardProject from "../../Elements/CardProjects/CardProject";
import illustration from "../../../ilustracion-equipo-de-trabajo.jpg";

const Documentation = () => (
  <div>
    <Accordion title="A">
      <span className="accordion-text"> <CardProject
        title="Creación de entorno 3d para la web"
        description="Este proyecto es una guía firme de como unir un grupo de trabajo para la creación de un sistema multimedia."
        image={illustration}
      /><CardProject
          title="Creación de entorno 3d para la web"
          description="Este proyecto es una guía firme de como unir un grupo de trabajo para la creación de un sistema multimedia."
          image={illustration}
        /><CardProject
          title="Creación de entorno 3d para la web"
          description="Este proyecto es una guía firme de como unir un grupo de trabajo para la creación de un sistema multimedia."
          image={illustration}
        /><CardProject
          title="Creación de entorno 3d para la web"
          description="Este proyecto es una guía firme de como unir un grupo de trabajo para la creación de un sistema multimedia."
          image={illustration}
        /></span>
    </Accordion>
    <Accordion title="B">
      <span className="accordion-text"><CardProject
        title="Creación de entorno 3d para la web"
        description="Este proyecto es una guía firme de como unir un grupo de trabajo para la creación de un sistema multimedia."
        image={illustration}
      /></span>
    </Accordion>
    <Accordion title="C">
      <span className="accordion-text">cccccc</span>
    </Accordion>
  </div>
)

export default Documentation;