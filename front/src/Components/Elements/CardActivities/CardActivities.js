import React from "react";
//import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faCalendarAlt,
  faSmileBeam,
} from "@fortawesome/free-solid-svg-icons";
import User from "../../../Logos/user-icon.png";
import "./CardActivities.css";

export default function CardActivities({ alfa }) {
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
            <small>
              Defina en un alto nivel de abstracción, las tecnologías
              hardware-software, así como los objetos físicos necesarios que
              aseguren una calidad de la experiencia, alineados a las bases de
              su diseño.
            </small>
            <span
              className={
                (alfa === "SMMV" ? "o-bg-smmv" : "o-bg-cem") + " o-activity"
              }
            >
              A13
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
            Entregada
          </div>
          <FontAwesomeIcon
            style={{
              border: "1px solid #4fa77b",
              fontSize: "1.5rem",
              background: "#4fa77b",
            }}
            className="text-white rounded-circle"
            icon={faSmileBeam}
          />
        </div>
        <div className="col-xs-6 col-sm-9 d-flex text-center o-activity-user-container">
          <img
            src={User}
            alt="User in charge"
            className="o-activity-user mr-2"
          />
          <div className="col-xs-9 col-sm-7 p-0">
            <div className="d-flex flex-column text-justify">
              <small className="m-0">Encargado: Juan Carlos</small>
              <small className="m-0">Rol: Arquitecto de información</small>
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
              <select>
                <option hidden>Rol del proyecto</option>
                <option value="Arquitecto de experiencia multimedia">
                  Arquitecto de experiencia multimedia
                </option>
                <option value="Arquitecto Software">Arquitecto Software</option>
                <option value="Arquitecto Hardware">Arquitecto Hardware</option>
              </select>
            </div>
          </div>
        </div>
        <div className=" col-xs-4 col-sm-4">
          <p>Fecha de entrega:</p>
          <form>
            <div className="sd-container">
              <input className="sd" type="date" name="selected_date" />
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
            defaultValue="0"
            style={{
              outline: "none",
              border: "1px solid white",
              width: "100%",
              height: "30px",
            }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end p-2">
        {" "}
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
