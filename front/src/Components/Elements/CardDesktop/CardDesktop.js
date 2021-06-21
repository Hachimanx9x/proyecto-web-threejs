import React, { useEffect, useState } from "react";
import "./CardDesktop.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faCalendarAlt,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

const CardDesktop = ({ update }) => {
  const project = (
    <strong className=" ml-1 mr-1 cyan-text">{update.projectName}</strong>
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getFile = () => {
    Axios({
      url: update.fileUrl, //your url
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", update.fileName); //or any other extension
      link.click();
    });
  };
  useEffect(() => {
    function resize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", resize);
    resize();
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <div className="bg-white o-desktop-card">
      <div className="d-flex">
        <h4>{update.userName}</h4>
      </div>
      <div className="mt-2 mb-2">
        <FontAwesomeIcon className="mr-2 cyan-text" icon={faFileAlt} />
        Actividad{" "}
        <strong className=" ml-1 mr-1 cyan-text">{update.activity}</strong> del
        proyecto {project} fue realizada.
      </div>
      <div className="row justify-content-between">
        <div
          className={
            "col-12 text-center" +
            (windowWidth < 1070 ? "col-sm-6" : "col-sm-3")
          }
        >
          <p className="grey-text">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-danger" />{" "}
            {update.date}
          </p>
        </div>
        {/*
        <div
          className={"col-6" + (windowWidth < 1070 ? "col-sm-6" : "col-sm-3")}
        >
          <p className="grey-text">
            <FontAwesomeIcon
              className="text-danger"
              style={{ borderColor: "red" }}
              icon={faClock}
            />{" "}
            {update.hour}
          </p>
        </div>
        */}
      </div>
      <div className="row rounded-pill grey p-0 lighten-3  o-download-section m-0 p-0">
        <div className="col-8 col-sm-8 justify-content-center d-flex flex-column">
          <small className="grey-text pt-2 pl-3 mb-0">{update.fileName}</small>
        </div>
        <div className="col-4 col-sm-4 d-flex">
          <button
            type="button"
            onClick={getFile}
            className="border-0 rounded-pill grey lighten-2 cyan-text o-download-btn ml-auto"
          >
            Descargar <FontAwesomeIcon className="mr-2" icon={faArrowDown} />
          </button>
        </div>
      </div>
    </div>
  );
};

CardDesktop.propTypes = {
  update: PropTypes.object.isRequired,
};
export default CardDesktop;

/*

<div className="row rounded-pill grey p-0 lighten-3  o-download-section">
        <div className="col-xs-6 col-sm-6">
          <small className="grey-text pt-2 pl-3 mb-0">{update.fileName}</small>
        </div>
        <div className="col-xs-6 col-sm-6 p-0 m-0 position-relative ">
          <button
            type="button"
            onClick={getFile}
            className="border-0 rounded-pill grey lighten-2 cyan-text o-download-btn ml-auto"
          >
            Descargar <FontAwesomeIcon className="mr-2" icon={faArrowDown} />
          </button>
        </div>
      </div>
*/
