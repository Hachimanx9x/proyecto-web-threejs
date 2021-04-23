import React, { useState } from "react";
//import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faCalendarAlt,
  faSmileBeam,
  faMeh,
} from "@fortawesome/free-solid-svg-icons";
import User from "../../../Logos/user-icon.png";
import "./CardActivities.css";
import moment from "moment";

import "moment/locale/es.js";
import Axios from "axios";
import Rodal from "rodal";
import SuccessAnimation from "../SuccessAnimation/SuccessAnimation";
require("moment/locale/es.js");

export default function CardActivities({ alfa, activity, tecniques }) {
  const option = activity.tecnica;
  const [date, setDate] = useState(null);
  const [tecnique, setTecnique] = useState(null);
  const [modal, setModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [file, setFile] = useState(null);
  const defaultDate =
    activity.fechaentrega.split("/")[2] +
    "-" +
    activity.fechaentrega.split("/")[1] +
    "-" +
    activity.fechaentrega.split("/")[0];

  const updateActivity = async () => {
    if (file !== null || date !== null || tecnique !== null) {
      try {
        const datform = new FormData();
        datform.append("actividad", activity.actividadid);
        datform.append("fecha", date);
        datform.append("tecnica", tecnique);
        datform.append("archivo", file);

        const token = localStorage.getItem("login");
        const obj = JSON.parse(token);
        const tokensito = obj.token;
        const options = {
          headers: { authorization: `llave ${tokensito}` },
        };

        await Axios.put(
          `http://localhost:3030/comiquieras/actividad`,
          datform,
          options
        ).thern((response) => {
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
      className="o-card z-depth-1 m-0 mt-4 p-0 bg-white"
      style={{ maxWidth: "50rem", minWidth: "24rem" }}
    >
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
                onClick={updateActivity}
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
      <div className="d-flex p-4">
        <div
          className={"o-activity-description " + (alfa === "SMMV" ? "" : "cem")}
        >
          <small>{activity.descripcion}</small>
          <span
            className={
              (alfa === "SMMV" ? "o-bg-smmv" : "o-bg-cem") + " o-activity"
            }
          >
            <p>{activity.titulo}</p>
          </span>
        </div>
        <button
          className="btn text-white z-depth-0 text-capitalize m-0 ml-0 ml-sm-1 mt-1"
          style={
            alfa === "SMMV"
              ? { background: "#4FA77B", fontSize: "14px", height: "50px" }
              : { background: "#D0A114", fontSize: "14px", height: "50px" }
          }
          onClick={() => {
            setConfirmation(false);
            setModal(true);
          }}
        >
          Guardar
        </button>
      </div>
      <div className="row m-0 mb-4 o-info-activity">
        <div
          className="col-xs-5 col-sm-3 d-flex mt-2 mb-1"
          style={{ minWidth: "10rem", maxWidth: "10rem" }}
        >
          <small>Estado: </small>
          <div
            className={
              (alfa === "SMMV" ? "" : "cem ") + "o-state-activity ml-2 mr-2"
            }
          >
            {activity.estado === "entregada" ? "Entregada" : "Asignado"}
          </div>
          <FontAwesomeIcon
            style={{
              border: "1px solid #4fa77b",
              fontSize: "1.5rem",
              background: "#4fa77b",
            }}
            className="text-white rounded-circle "
            icon={activity.estado === "entregada" ? faSmileBeam : faMeh}
          />
        </div>
        <div className="col-xs-6 col-sm-9 d-flex text-center o-activity-user-container">
          <img
            src={
              activity.foto === null || activity.foto === undefined
                ? User
                : activity.foto
            }
            alt="User in charge"
            className="o-activity-user mr-2"
          />
          <div className="col-xs-9 col-sm-12 p-0">
            <div className="d-flex flex-column text-justify">
              <small className="m-0">Encargado: {activity.nombre}</small>
              <small className="m-0">Rol: {activity.rol}</small>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          "d-flex justify-content-around p-2 text-white o-info-deliver " +
          (alfa === "SMMV" ? "o-bg-smmv" : "o-bg-cem ")
        }
      >
        <div className=" col-xs-4 col-sm-4">
          <p>Técnica a usar:</p>
          <div style={{ position: "relative" }}>
            <div
              className={
                (alfa === "SMMV" ? "" : "cem ") +
                "o-tecnique-select rounded-pill"
              }
            >
              <select
                defaultValue={option}
                onChange={(e) => {
                  setTecnique(e.target.value);
                  console.log(e.target.value);
                }}
              >
                {tecniques.map((tecnique, i) => (
                  <option key={i} value={tecnique}>
                    {tecnique}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className=" col-xs-4 col-sm-4">
          <p>Fecha de entrega:</p>
          <form>
            <div className="sd-container">
              <input
                className="sd"
                type="date"
                name="selected_date"
                defaultValue={defaultDate}
                onChange={(e) => {
                  setDate(e.target.value);
                  console.log(e.target.value);
                }}
                min={moment().toDate()}
              />
              <span className="open-button">
                <button>
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </button>
              </span>
            </div>
          </form>
        </div>
        <div className=" col-xs-4 col-sm-4">
          <p>Revisiones hechas:</p>
          <input
            type="text"
            className="bg-transparent rounded-pill text-white pl-2"
            readOnly
            defaultValue={activity.revisiones}
            style={{
              outline: "none",
              border: "1px solid white",
              width: "60%",
              minWidth: "5rem",
              height: "30px",
            }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end p-2">
        <small className="mr-auto pt-2">
          {file !== null
            ? file.name
            : activity.namefile !== null
            ? activity.namefile
            : "No se han subido archivos."}
        </small>{" "}
        <button
          className={
            (alfa === "SMMV" ? "o-border-smmv o-text-smmv" : "cem o-text-cem") +
            " rounded-pill o-btn-activity"
          }
        >
          <label
            htmlFor={"activity-upload" + activity.actividadid}
            className="rounded-pill"
          ></label>
          Subir documento
          <div
            className={
              (alfa === "SMMV" ? "o-bg-smmv" : "cem") +
              " o-icon-activity-container rounded-circle"
            }
          >
            <FontAwesomeIcon
              className="o-icon-activity"
              icon={faAngleDoubleUp}
            />
          </div>
        </button>
        <a
          href={`data:image/*;base64,${activity.contenido}`}
          target={"_blank"}
          download={activity.namefile}
        >
          <button
            className={
              (alfa === "SMMV"
                ? "o-border-smmv o-text-smmv"
                : "cem o-text-cem") + " ml-3 rounded-pill o-btn-activity"
            }
          >
            Descargar documento{" "}
            <div
              className={
                (alfa === "SMMV" ? "o-bg-smmv" : "cem") +
                " o-icon-activity-container rounded-circle"
              }
            >
              <FontAwesomeIcon
                className="o-icon-activity"
                icon={faAngleDoubleDown}
              />
            </div>
          </button>
        </a>
        <input
          type="file"
          id={"activity-upload" + activity.actividadid}
          className="d-none"
          onChange={(e) => {
            if (e.target.files[0] !== undefined) {
              setFile(e.target.files[0]);
              console.log(e.target.files[0]);
            }
          }}
        />
      </div>
    </div>
  );
}
