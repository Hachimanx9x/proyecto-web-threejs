import React from "react";
import CardActivities from "../../Elements/CardActivities/CardActivities";
import CardDeliverables from "../../Elements/CardDeliverables/CardDeliverables";

export default function Activities() {
  return (
    <div className="w-100 mb-5 mb-sm-1 pb-5 pb-sm-1">
      <p>Proyecto creación de entornos 3d</p>
      <div className="row">
        <div
          className="col-xs-12 col-sm-8 bg-white rounded z-depth-1 p-0 p-sm-4 mb-2 mr-sm-4 ml-sm-4"
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
          <CardDeliverables />
        </div>
      </div>
    </div>
  );
}
