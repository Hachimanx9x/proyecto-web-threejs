import React from "react";
import Navbar from "../../Elements/Navbar/Navbar";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="o-landing">
      <Navbar />
      <header className="m-0 mb-3">
        <div className="o-landing-title">
          <h1 className="text-white m-0 font-weight-bold">
            El mejor sitio para diseño de tu sistema multimedia
          </h1>
          <p className="text-white text-justify mt-2">
            La página encargada del apoyo a sus desarrolladores, con guías
            ágiles para la creación de proyectos multimedia y sus procesos de
            retralimentación grupal.
          </p>
          <button
            className=" float-right blue accent-4 text-capitalize  z-depth-0 text-light ml-0 mr-0 mt-2 font-weight-bold o-button"
            type="submit"
          >
            Registrarse
          </button>
        </div>
      </header>
      <section className="mt-2 z2 bg-white">
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
        <h3>Some text</h3>
      </section>
    </div>
  );
}
