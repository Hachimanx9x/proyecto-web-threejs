import React, { useState } from "react";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CardDeliverables.css";

export default function CardDeliverables({ alfa, deliverable }) {
  const [option, setOption] = useState(deliverable.estado);
  /*
  const updateActivity = async () => {
    try {
      const datform = new FormData();
      datform.append("actividad", nullData);
      datform.append("fecha", nullData);
      datform.append("tecnica", years);
      datform.append("archivo", fullname);
      const obj = JSON.parse(token);
      const tokensito = obj.token;
      const options = {
        headers: { authorization: `llave ${tokensito}` },
      };

      await Axios.put(
        `http://localhost:3030//comiquieras/actividad`,
        datform,
        options
      ).thern((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };*/
  return (
    <div
      className="text-center m-1 mt-2 mb-2 p-2"
      style={
        alfa === "SMMV"
          ? { background: "#4fa77b", width: "16rem" }
          : { background: "#d0a114", width: "16rem" }
      }
    >
      <p className="text-white">{deliverable.nombre}</p>
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2 position-relative">
        <small>Estado: </small>
        <div
          className={
            (alfa === "SMMV" ? "" : "cem ") +
            "o-deliverable-select rounded-pill"
          }
        >
          <select value={option} onChange={(e) => setOption(e.target.value)}>
            <option value="asignado">Asignado</option>
            <option value="entregado">Entregado</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2">
        <small>Tipo de entrega:</small>
        <div className={(alfa === "SMMV" ? "" : "cem") + " o-document-type"}>
          Documento
        </div>
        <small className={alfa === "SMMV" ? "o-text-smmv" : "o-text-cem"}>
          .doc
        </small>
      </div>
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2">
        <small>Archivo:</small>
        <small className={alfa === "SMMV" ? "o-text-smmv" : "o-text-cem"}>
          <small>
            {deliverable.namefile !== null
              ? deliverable.namefile
              : "No se han subido archivos."}
          </small>
        </small>
      </div>

      <div className="bg-white rounded d-flex justify-content-between m-1 p-2">
        <small>Descargar:</small>
        <button
          className={
            (alfa === "SMMV" ? "o-border-smmv o-text-smmv" : "o-text-cem cem") +
            " ml-3 rounded-pill o-btn-deliverable"
          }
        >
          Descargar documento
          <div
            className={
              (alfa === "SMMV" ? "o-bg-smmv" : "cem") +
              " o-icon-deliverable-container rounded-circle"
            }
          >
            <FontAwesomeIcon
              className="o-icon-deliverable"
              icon={faAngleDoubleDown}
            />
          </div>
        </button>
      </div>
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2">
        <small>Subir:</small>
        <button
          className={
            (alfa === "SMMV" ? "o-border-smmv o-text-smmv" : "cem o-text-cem") +
            " ml-3 rounded-pill o-btn-deliverable"
          }
        >
          <label htmlFor="deliverable-upload" className="rounded-pill"></label>
          Subir documento
          <div
            className={
              (alfa === "SMMV" ? "o-bg-smmv" : "cem") +
              " o-icon-deliverable-container rounded-circle"
            }
          >
            <FontAwesomeIcon
              className="o-icon-deliverable"
              icon={faAngleDoubleUp}
            />
          </div>
        </button>

        <input type="file" id="deliverable-upload" className="d-none" />
      </div>
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2">
        <small>Revisiones:</small>
        <small className={alfa === "SMMV" ? "o-text-smmv" : "o-text-cem"}>
          {deliverable.revisiones}
        </small>
        <button
          className={
            (alfa === "SMMV" ? "o-bg-smmv" : "o-bg-cem") +
            " m-0 rounded-circle text-white"
          }
          style={{
            pointerEvents: "none",
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
