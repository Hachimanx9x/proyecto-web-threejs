import React from "react";
import "./ContactProfile.css";
import { MDBInput } from "mdbreact";
import User from "../../../Logos/user-icon.png";
import arrow from "../../../Logos/arrow.svg";
import { useHistory } from "react-router";

export default function ContactProfile() {
  const history = useHistory();
  return (
    <div>
      <button className="o-btn-return" onClick={() => history.goBack()}>
        <span>
          <img src={arrow} alt="Arrow button" />
        </span>
        Regresar
      </button>
      <div className="o-blue-container o-blue-container-2">
        <div className="o-talent-intro">
          <div className="col-12 col-sm-4 justify-content-center align-items-center d-flex">
            <div className="col-xs-6">
              <img
                src={User}
                className="o-profile-talent-picture rounded-circle"
                alt="Foto de perfil del usuario"
              />
            </div>
            <div className="col-xs-6 ml-2 d-flex justify-content-center align-items-center">
              JUAN CARLOS HURTADO
            </div>
          </div>
          <div className="col-12 col-sm-8 d-flex justify-content-end">
            <button className="btn border-0 z-depth-0 btn-primary o-hire-btn text-white font-weight-bold">
              CONTRATAR
            </button>
          </div>
        </div>
        <p>Descripción</p>
        <div className="bg-white rounded o-description-profile-contact mt-2 mb-2 p-1">
          <p className="m-1">
            rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrraaaaaaaaaaaarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
          </p>
        </div>
        <p>Herramientas utilizadas</p>
        <div className="o-talent-tool-list">
          <div className="mt-2 mb-2 p-1 bg-white rounded row">
            <div className="col-12 col-sm-1 text-center">
              <img
                className="o-talent-tool"
                src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg"
                alt="User tool"
              />
            </div>
            <div className="col-12 col-sm-9 o-tool-description text-justify">
              <p>
                TypeScript is the typed version of javascript. This variant of
                the javascript frontend language aims to solve many of the
                problems such as non typed issues of data. It's commonly used in
                Angular.js but it can be used in other frameworks such as
                React.js and Svelte.js. This is one of the top 10 more used and
                demmanded languages around the world currently.
              </p>
            </div>
          </div>
          <div className="mt-2 mb-2 p-2 bg-white rounded row">
            <div className="col-12 col-sm-1 text-center">
              <img
                className="o-talent-tool"
                src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg"
                alt="User tool"
              />
            </div>
            <div className="col-12 col-sm-9 o-tool-description text-justify">
              <p>
                TypeScript is the typed version of javascript. This variant of
                the javascript frontend language aims to solve many of the
                problems such as non typed issues of data. It's commonly used in
                Angular.js but it can be used in other frameworks such as
                React.js and Svelte.js. This is one of the top 10 more used and
                demmanded languages around the world currently.
              </p>
            </div>
          </div>
          <div className="mt-2 mb-2 p-2 bg-white rounded row">
            <div className="col-12 col-sm-1 text-center">
              <img
                className="o-talent-tool"
                src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg"
                alt="User tool"
              />
            </div>
            <div className="col-12 col-sm-9 o-tool-description text-justify">
              <p>
                TypeScript is the typed version of javascript. This variant of
                the javascript frontend language aims to solve many of the
                problems such as non typed issues of data. It's commonly used in
                Angular.js but it can be used in other frameworks such as
                React.js and Svelte.js. This is one of the top 10 more used and
                demmanded languages around the world currently.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white mt-2 mb-2 rounded p-2">
          <p style={{ fontSize: "1.2rem" }}>Ubicación geográfica</p>
          <div className="row">
            <div className="col-12 col-sm-5">
              <img
                src="https://smart.servier.com/wp-content/uploads/2016/10/world-map-update.png"
                alt="map"
                className="o-geo-map"
              />
            </div>
            <div className="col-12 col-sm-7 p-1">
              <div className="row o-geo-info">
                <MDBInput label="Asunto" outline value={"re"} />
                <MDBInput label="Asunto" outline value={"re2"} />
                <MDBInput label="Asunto" outline value={"re3"} />
                <MDBInput label="Asunto" outline value={"re4"} />
              </div>
            </div>
          </div>
        </div>
        <p>Mandar mensaje</p>
        <div className="bg-white p-2 rounded">
          <MDBInput
            className="ml-0 mr-0"
            style={{ maxWidth: "40rem" }}
            label="Asunto"
            outline
          />
          <MDBInput
            type="textarea"
            className="m-0 mr-0 rounded"
            label="Cuerpo"
            outline
          />
        </div>
      </div>
    </div>
  );
}
