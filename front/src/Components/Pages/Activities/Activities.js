import React from "react";
import CardActivities from "../../Elements/CardActivities/CardActivities";

export default function Activities() {
  return (
    <div className="h-100 w-100 mb-3">
      <p>Proyecto creación de entornos 3d</p>
      <div className="row">
        <div className="col-xs-12 col-sm-8 bg-white rounded z-depth-1">
          <CardActivities />
        </div>
      </div>
    </div>
  );
}
