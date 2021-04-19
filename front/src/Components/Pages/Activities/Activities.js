import React, { useEffect, useState } from "react";
import CardActivities from "../../Elements/CardActivities/CardActivities";
import CardDeliverables from "../../Elements/CardDeliverables/CardDeliverables";
import { Doughnut } from "react-chartjs-2";
import arrow from "../../../Logos/arrow.svg";
import { SMMV } from "../Documentation/SMMV";
import "./Activities.css";

export default function ActivitiesSMMV(props) {
  const [tecniques, setTecniques] = useState([]);
  const [fetched, setFetched] = useState(false);
  const deliverables = [
    {
      id: 460,
      nombre: "Análisis de viabilidad del Sistema Multimedia",
      descripcion:
        "Es un documento en donde se consigna un análisis\n                    sobre la necesidad de los diferentes tipos de recursos\n                    y de riesgos, a la luz de la aplicación de diferentes\n                    técnicas, que permiten hacer un análisis de viabilidad\n                    en torno al desarrollo del Sistema Multimedia. \n                    ",
      estado: "asignado",
      tipoactivo: "documento",
      fechaentrega: "2021-01-23",
      revisiones: 0,
      namefile: "Coursera 2T27CP6QW48Q.pdf",

      contenido: "http://localhost:3030/proyecto/contenido/proyecto168/null",
    },
    {
      id: 461,
      nombre: "Proposición de valor del Sistema Multimedia",
      descripcion:
        "Consiste en el documento que especifica el análisis\n                    para la proposición de valor del Sistema Multimedia.",
      estado: "entregado",
      tipoactivo: "documento",
      fechaentrega: "2021-01-23",
      revisiones: 0,
      namefile: null,

      contenido: "http://localhost:3030/proyecto/contenido/proyecto168/null",
    },
  ];
  const activities = [
    {
      actividadid: 1171,
      titulo: "A8",
      descripcion:
        "Diseñe la estructura y el flujo (narrativo, temporal, de\n                        eventos) de la historia a desarrollarse a partir del problema\n                        que desea resolverse, describiendo los acontecimientos que\n                        narra, los personajes que participan, el tiempo en el que se\n                        desarrolla y el espacio en el que suceden dichos\n                        acontecimientos.",
      revisiones: 2,
      nombre: "nombre test14",
      rol: "Arquitecto Experiencia Multimedia",
      estado: "asignada",
      fechaentrega: "2021-01-23",
      tecnica:
        "Análisis de desglose de riesgos asociada al desarrollo del Sistema Multimedia",
      contenido: "http://localhost:3030/proyecto/contenido/proyecto168/null",
      namefile: "Coursera 2T27CP6QW48Q.pdf",
      entregar: false,
    },
    {
      actividadid: 1180,
      titulo: "A9",
      descripcion:
        "Defina las bases del diseño de una experiencia multimedia\n                    interactiva, a partir de la historia y el (los) problema(s)\n                    identificado(s), especificando los hitos de la historia en donde\n                    el Sistema Multimedia debe producir en el usuario una\n                    influencia cognitiva, emocional y sensorial.",
      revisiones: 0,
      nombre: "nombre test14",
      rol: "Arquitecto Experiencia Multimedia",
      estado: "entregada",
      fechaentrega: "2021-01-23",
      tecnica: "Producción de metáforas y analogías",
      contenido: "http://localhost:3030/proyecto/contenido/proyecto168/null",
      namefile: null,
      entregar: false,
    },
  ];
  useEffect(() => {
    function searchTecnique() {
      const activities = SMMV.actividades;

      const array = [];
      for (let i = 0; i < activities.length; i++) {
        for (let j = 0; j < activities[i].herramientas.length; j++) {
          const tecnique = activities[i].herramientas[j];
          const item = array.find((iterador) => iterador === tecnique.nombre);
          if (!item) {
            array.push(tecnique.nombre);
          }
        }
      }
      setFetched(true);
      setTecniques([...array]);
    }
    searchTecnique();
  }, []);
  const data = {
    labels: ["Completado", "Faltante"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#4fa77b", "#ddd8d8"],
        hoverBackgroundColor: ["#3c8862", "rgb(238, 229, 229)"],
      },
    ],
  };
  if (fetched) {
    return (
      <div className="w-100 mb-5 mb-sm-1 pb-5 pb-sm-1">
        <button className="o-btn-return" onClick={() => props.history.goBack()}>
          <span>
            <img src={arrow} alt="Arrow button" />
          </span>
          Regresar
        </button>
        <div className="d-flex justify-content-between p-1">
          <p>Proyecto creación de entornos 3d</p>
          <button className="btn mt-2 bg-primary z-depth-0 text-white">
            Guardar
          </button>
        </div>
        <div className="row">
          <div
            className="col-xs-12 bg-white rounded z-depth-1 p-0 p-sm-4 mb-2 mr-0 ml-0 mr-sm-4 ml-sm-4 o-activities-col"
            style={{ minWidth: "24rem" }}
          >
            <p className="m-2">Actividades</p>
            {activities.map((activity, i) => (
              <CardActivities
                key={i}
                alfa="SMMV"
                activity={activity}
                tecniques={tecniques}
              />
            ))}
          </div>
          <div className="col o-deliverables-col bg-white d-flex flex-wrap rounded z-depth-1 p-0 p-sm-1">
            <div>
              <p className="m-2">Entregables</p>
              <div className="o-activities-col">
                {deliverables.map((deliverable, i) => (
                  <CardDeliverables
                    key={i}
                    alfa="SMMV"
                    deliverable={deliverable}
                  />
                ))}
              </div>
            </div>
            <div>
              {" "}
              <p className="m-2">Estado de alfa</p>
              <div className="position-relative">
                <Doughnut data={data} />
                <p className="o-text-alfa-state o-text-smmv">60%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Cargando....</div>;
  }
}
