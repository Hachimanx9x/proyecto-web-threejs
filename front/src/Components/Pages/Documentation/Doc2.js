import React,{useState} from "react";
import Accordion from "../../Elements/Accordion/Accordion2";
import CardProject from "../../Elements/Card/CardProject";
import illustration from "../../../ilustracion-equipo-de-trabajo.jpg";


const Doc2 = () =>{
    const[active, setActive] = useState("");
   
    return(
        <div className="o-doc2-container">
            <Accordion title="Title1" active={active}  setActive={setActive}><CardProject
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
          /></Accordion>
            <Accordion title="Title2" active={active}  setActive={setActive}><CardProject
            title="Creación de entorno 3d para la web"
            description="Este proyecto es una guía firme de como unir un grupo de trabajo para la creación de un sistema multimedia."
            image={illustration}
          /></Accordion>
            <Accordion title="Title3" active={active}  setActive={setActive}>Waweaae :3</Accordion>
            <Accordion title="Title4" active={active}  setActive={setActive}>gg :DDDD</Accordion>
        </div>
        
        );
}

export default Doc2;