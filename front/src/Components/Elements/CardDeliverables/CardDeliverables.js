import React, { useState } from "react";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import Rodal from "rodal";
import "./CardDeliverables.css";
import SuccessAnimation from "../SuccessAnimation/SuccessAnimation";

export default function CardDeliverables({ alfa, deliverable }) {
  const [option, setOption] = useState(deliverable.estado);
  const [confirmation, setConfirmation] = useState(false);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);

  const getFile = () => {
    Axios.get(deliverable.contenido, { responseType: "blob" }).then(
      (response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", deliverable.namefile);
        link.click();
      }
    );
  };

  const updateDeliverable = async () => {
    if (file !== null) {
      try {
        const datform = new FormData();
        datform.append("actividad", deliverable.id);
        datform.append("archivo", file);

        const token = localStorage.getItem("login");
        const obj = JSON.parse(token);
        const tokensito = obj.token;
        setConfirmation(true);
        const options = {
          headers: { authorization: `llave ${tokensito}` },
        };

        await Axios.put(
          `http://localhost:3030/entrega/entregable`,
          datform,
          options
        ).then((response) => {
          setModal(false);
          console.log(response);
        });
      } catch (error) {
        console.log(error);
      }
    }
    setConfirmation(true);
    setTimeout(() => {
      setModal(false);
    }, 1200);
  };
  return (
    <div
      className="text-center m-1 mt-2 mb-2 p-2"
      style={
        alfa === "SMMV"
          ? { background: "#4fa77b", width: "16rem" }
          : { background: "#d0a114", width: "16rem" }
      }
    >
      {" "}
      <Rodal
        width={300}
        height={160}
        animation={"fade"}
        visible={modal}
        onClose={() => setModal(false)}
      >
        {!confirmation ? (
          <div>
            <h5 className="mt-5 mb-2">¿Guardar cambios?</h5>
            <div className="d-flex justify-content-between p-2">
              <button
                className="z-depth-0 border-primary btn border-primary text-primary font-weight-bold"
                type="button"
                style={{
                  width: "7.2rem",
                  fontSize: "0.8rem",
                  height: "2.5rem",
                }}
                onClick={() => setModal(false)}
              >
                Cancelar
              </button>
              <button
                className="z-depth-0 border-0 btn btn-primary font-weight-bold"
                type="button"
                style={{
                  width: "7.2rem",
                  fontSize: "0.8rem",
                  height: "2.5rem",
                }}
                onClick={() => {
                  updateDeliverable();
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <SuccessAnimation />
          </div>
        )}
      </Rodal>
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
            {file !== null
              ? file.name
              : deliverable.namefile !== null
              ? deliverable.namefile
              : "No se han subido archivos."}
          </small>
        </small>
      </div>
      {deliverable.namefile !== null ? (
        <div className=" d-none bg-white rounded d-flex justify-content-between m-1 p-2">
          <small>Descargar:</small>
          <button
            className={
              (alfa === "SMMV"
                ? "o-border-smmv o-text-smmv"
                : "o-text-cem cem") + " ml-3 rounded-pill o-btn-deliverable"
            }
            type="button"
            onClick={getFile}
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
      ) : (
        <></>
      )}
      <div className="bg-white rounded d-flex justify-content-between m-1 p-2">
        <small>Subir:</small>
        <button
          className={
            (alfa === "SMMV" ? "o-border-smmv o-text-smmv" : "cem o-text-cem") +
            " ml-3 rounded-pill o-btn-deliverable"
          }
        >
          <label
            htmlFor={"deliverable-upload" + deliverable.id}
            className="rounded-pill"
          ></label>
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

        <input
          type="file"
          id={"deliverable-upload" + deliverable.id}
          className="d-none"
          onChange={(e) => {
            if (e.target.files[0] !== undefined) {
              setFile(e.target.files[0]);
              setConfirmation(false);
              setModal(true);
              console.log(e.target.files[0]);
            }
          }}
        />
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
