import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./CardDeliverables.css";

export default function CardDeliverables() {
  return (
    <div
      className="text-center m-1 mt-2 mb-2 p-2"
      style={{ background: "#4fa77b", width: "16rem" }}
    >
      <p className="text-white">Análisis de viabilidad del SM</p>
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2 position-relative">
        <small>Estado: </small>
        <div className="o-deliverable-select rounded-pill">
          <select>
            <option hidden>Seleccione...</option>
            <option value="Iniciado">Iniciado</option>
            <option value="Entregado">Entregado</option>
            <option value="Atrasado">Atrasado</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2">
        <small>Tipo de entrega:</small>
        <div className="o-document-type">Documento</div>
        <small className="text-success">.doc</small>
      </div>
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2">
        <small>Descargar:</small>
        <button className="ml-3 rounded-pill o-btn-deliverable text-success">
          Descargar documento
          <div className="o-icon-deliverable-container rounded-circle">
            <FontAwesomeIcon
              className="o-icon-deliverable"
              icon={faAngleDoubleDown}
            />
          </div>
        </button>
      </div>
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2">
        <small>Subir:</small>
        <button className="ml-3 rounded-pill o-btn-deliverable text-success">
          Subir documento
          <div className="o-icon-deliverable-container rounded-circle">
            <FontAwesomeIcon
              className="o-icon-deliverable"
              icon={faAngleDoubleUp}
            />
          </div>
        </button>
      </div>
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2">
        <small>Revisiones:</small>
        <small className="text-success">0</small>
        <button
          className="m-0 rounded-circle text-white"
          style={{
            background: "#4fa77b",
            border: "none",
            width: "1.5rem",
            height: "1.5rem",
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
}
