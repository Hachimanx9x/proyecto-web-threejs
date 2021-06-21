import React from "react";
import Alpha from "../../../Logos/alpha_icon.svg";
import Deliverable from "../../../Logos/deliverable_icon.svg";
import Activity from "../../../Logos/activity_icon.svg";
import CardItem from "../../Elements/CardItem/CardItem";
import "./Documentation.css";
import CardRole from "../../Elements/CardRole/CardRole";
import { CEM } from "./CEM";
export default function DocCEM(props) {
  const items = CEM;

  return (
    <div className="h-100 w-100">
      <div className="row">
        <section id="CardDocSection">
          <p>
            Justificación de uso de la práctica de concepcion de experiencia
            multimedia
          </p>
          <div className="w-100 d-flex flex-wrap">
            {items.alfas.map((alpha, i) => (
              <CardItem
                item={alpha}
                icon={Alpha}
                category="Alpha"
                alpha="CEM"
                key={i}
              />
            ))}
          </div>
          <hr className="o-divider" />
          <p>Entregables</p>
          <div className="w-100 d-flex flex-wrap">
            {items.entregables.map((deliverable, i) => (
              <CardItem
                item={deliverable}
                icon={Deliverable}
                category="Deliverable"
                key={i}
                alpha="CEM"
              />
            ))}
          </div>
          <hr className="o-divider" />
          <p>Actividades</p>
          <div className="w-100 d-flex justify-content-center flex-wrap">
            {items.actividades.map((activity, i) => (
              <CardItem
                item={activity}
                category="Activity"
                icon={Activity}
                key={i}
                alpha="CEM"
              />
            ))}
          </div>
        </section>
        <section id="CardRolesSection">
          <h6>Roles</h6>
          {items.roles.map((rol, i) => (
            <CardRole key={i} alpha="CEM" rol={rol} />
          ))}
        </section>
      </div>
    </div>
  );
}
