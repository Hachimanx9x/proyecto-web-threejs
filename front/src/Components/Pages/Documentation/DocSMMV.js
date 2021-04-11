import React from "react";
import Alpha from "../../../Logos/alpha_icon.svg";
import Deliverable from "../../../Logos/deliverable_icon.svg";
import Activity from "../../../Logos/activity_icon.svg";
import CardItem from "../../Elements/CardItem/CardItem";
import arrow from "../../../Logos/arrow.svg";
import "./Documentation.css";
import CardRole from "../../Elements/CardRole/CardRole";
import { SMMV } from "./SMMV";
export default function DocSMMV(props) {
  const items = SMMV;

  return (
    <div className="h-100 w-100">
      <button className="o-btn-return" onClick={() => props.history.goBack()}>
        <span>
          <img src={arrow} alt="Arrow button" />
        </span>
        Regresar
      </button>
      <div className="row">
        <section id="CardDocSection">
          <p>
            Justificación de uso de la práctica de sistema multimedia mínimo
            viable
          </p>
          <div className="w-100 d-flex flex-wrap">
            {items.alfas.map((alpha, i) => (
              <CardItem item={alpha} icon={Alpha} category="Alpha" key={i} />
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
              />
            ))}
          </div>
        </section>
        <section id="CardRolesSection">
          <h6>Roles</h6>
          {items.roles.map((rol, i) => (
            <CardRole key={i} rol={rol} />
          ))}
        </section>
      </div>
    </div>
  );
}
