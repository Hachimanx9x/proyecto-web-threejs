import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck , faCircle} from "@fortawesome/free-solid-svg-icons";
const contentCard = (props)=>{

  return(
    <div>
    <header className=" m-0 p-0 text-center bg-success pt-3" style={{height : "4rem" , borderTopLeftRadius : "0.5rem",borderTopRightRadius : "0.5rem"}}>{props.obj.nombre}</header>
    <div className="text-center mt-2">
    <div className =" rounded-pill border-0 bg-success ml-5 mr-5">{props.obj.estaoevaluar} </div>
    <div className="d-flex flex-column ml-5 mr-5 mt-2">
    {props.obj.preguntas.map((pregunta)=>(  <div className="d-flex"><span className="mr-2 mb-2"><FontAwesomeIcon icon={faCheck} className="rounded-circle border-success text-white bg-success  mb-2"  /></span>
      <small className="text-justify">{pregunta.texto} </small> </div> )) }

    </div>
    </div>
    <div className="d-flex justify-content-between pl-4 pr-4">
    <button className="btn z-depth-0  btn-success " onClick={()=>{ props.voto() }}>si</button>
      <button className="btn z-depth-0  btn-danger"onClick={()=>{ props.voto() }} >no</button>
    </div>

    </div>
  );

}
export default contentCard;
