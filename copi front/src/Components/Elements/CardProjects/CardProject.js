import React, { useState } from "react";
import PropTypes from "prop-types";
import Rodal from "rodal";
import Fade from "../../Fade/Fade";

import "rodal/lib/rodal.css";
const CardProject = ({ title, description, image }) => {
  const [show, setShow] = useState(true);
  const [modal, setModal] = useState(false);
  const [titleconfirmation, setTitleconfirmation] = useState("");
  const deleteConfirmation = () => {
    setModal(!modal);
  };
  const deleteProject = () => {
    setModal(false);
    setShow(false);
  };

  return (
    <Fade show={show}>
      <Rodal
        width={300}
        height={420}
        animation={"fade"}
        visible={modal}
        onClose={() => setModal(!modal)}
      >
        <p className="text-center mt-4" style={{ fontSize: "0.9rem" }}>
          Confirmación de abandono de proyecto
        </p>
        <p className="mt-2 mb-4 text-justify" style={{ fontSize: "0.9rem" }}>
          El abandonar un proyecto no se puede
          <strong className="text-danger"> deshacer</strong>. Esto eliminará
          permanentemente su participación en el proyecto
          <strong className="text-danger"> {title}</strong>, el abandonar el
          proyecto puede incurrir en problemas legales definidos por el método
          de contratación al ingresar el proyecto.
        </p>
        <p style={{ fontSize: "0.9rem" }} className="mt-2">
          Escriba "{title}" para confirmar.
        </p>
        <input
          value={titleconfirmation}
          style={{ fontSize: "0.9rem" }}
          className="text-danger w-100"
          onChange={(e) => {
            setTitleconfirmation(e.target.value);
          }}
        />
        <button
          style={{ fontSize: "0.6rem" }}
          className={
            (titleconfirmation != title ? "disabled" : "") +
            " btn btn-danger btn-block border-0 text-white mt-2"
          }
          onClick={deleteProject}
        >
          <small>
            Lo entiendo y me hago cargo responsable de las consecuencias.
            Abandonar el proyecto.
          </small>
        </button>
      </Rodal>
      <div className="card m-3 o-card-project">
        <div className="card-header bg-transparent o-card-project-title">
          {title}
        </div>
        <img
          className="card-img o-card-project-image"
          src={image}
          alt="Imagen del proyecto"
        />
        <div className="card-body o-card-description">
          <p className="card-text o-card-description-text pt-1 pb-1">
            {description}
          </p>
        </div>
        <div className="card-footer bg-transparent border-transparent">
          <button className="btn btn-primary border-0 z-depth-0 btn-sm o-card-project-button mr-4">
            Ver
          </button>
          <button
            onClick={deleteConfirmation}
            className="btn bg-white z-depth-0 border-primary p-0 text-primary btn-sm o-card-project-button ml-4"
          >
            Eliminar
          </button>
        </div>
      </div>
    </Fade>
  );
};
CardProject.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
export default CardProject;
