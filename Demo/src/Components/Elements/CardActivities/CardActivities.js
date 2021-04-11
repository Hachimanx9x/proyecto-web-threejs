import React, { useState } from "react";
//import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faCalendarAlt,
  faSmileBeam,
  faMeh,
  faFrown,
} from "@fortawesome/free-solid-svg-icons";
import User from "../../../Logos/user-icon.png";
import "./CardActivities.css";
import moment from "moment";

import "moment/locale/es.js";
require("moment/locale/es.js");

export default function CardActivities({ alfa, activity, tecniques }) {
  const [option, setOption] = useState(activity.tecnica);
  return (
    <div
      className="o-card z-depth-1 m-0 mt-4 p-0 bg-white"
      style={{ maxWidth: "50rem", minWidth: "24rem" }}
    >
      <div className="d-flex p-4">
        <div className="d-flex flex-column">
          <div
            className={
              "o-activity-description " + (alfa === "SMMV" ? "" : "cem")
            }
          >
            <small>{activity.descripcion}</small>
            <span
              className={
                (alfa === "SMMV" ? "o-bg-smmv" : "o-bg-cem") + " o-activity"
              }
            >
              {activity.titulo}
            </span>
          </div>
        </div>
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
            src={User}
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
                value={option}
                onChange={(e) => setOption(e.target.value)}
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
                defaultValue={activity.fechaentrega}
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
          {activity.namefile !== null
            ? activity.namefile
            : "No se han subido archivos."}
        </small>{" "}
        <button
          className={
            (alfa === "SMMV" ? "o-border-smmv o-text-smmv" : "cem o-text-cem") +
            " rounded-pill o-btn-activity"
          }
        >
          <label htmlFor="activity-upload" className="rounded-pill"></label>
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
        <button
          className={
            (alfa === "SMMV" ? "o-border-smmv o-text-smmv" : "cem o-text-cem") +
            " ml-3 rounded-pill o-btn-activity"
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
        <input type="file" id="activity-upload" className="d-none" />
      </div>
    </div>
  );
}

//CardActivities.propTypes = {};
