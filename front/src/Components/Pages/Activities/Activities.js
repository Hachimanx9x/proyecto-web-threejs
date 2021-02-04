import React from "react";
import CardActivities from "../../Elements/CardActivities/CardActivities";
import CardDeliverables from "../../Elements/CardDeliverables/CardDeliverables";
import { Doughnut } from "react-chartjs-2";

import "./Activities.css";

export default function Activities() {
  const data = {
    labels: ["Completado", "Faltante"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#4fa77b", "#fff"],
        hoverBackgroundColor: ["#3c8862", "rgb(238, 229, 229)"],
      },
    ],
  };
  return (
    <div className="w-100 mb-5 mb-sm-1 pb-5 pb-sm-1">
      <div className="d-flex justify-content-between p-1">
        <p>Proyecto creación de entornos 3d</p>
        <button className="btn mt-2 bg-primary z-depth-0 text-white">
          Guardar
        </button>
      </div>
      <div className="row">
        <div
          className="col-xs-12 col-sm-8 bg-white rounded z-depth-1 p-0 p-sm-4 mb-2 mr-sm-4 ml-sm-4 o-activities-col"
          style={{ minWidth: "24rem" }}
        >
          <p className="m-2">Actividades</p>
          <CardActivities />
          <CardActivities />
          <CardActivities />
        </div>
        <div
          className="col-xs-12 col-sm-2 bg-white rounded z-depth-1 p-0 p-sm-1"
          style={{ minWidth: "17rem", maxWidth: "17rem" }}
        >
          <p className="m-2">Entregables</p>
          <div className="o-activities-col">
            <CardDeliverables />
          </div>
          <p className="m-2">Estado de alfa</p>
          <div className="position-relative">
            <Doughnut data={data} />
            <p className="o-text-alfa-state">60%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
