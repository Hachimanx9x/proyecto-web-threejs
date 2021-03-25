import React from "react";
import "./CardRole.css";

export default function CardRole({ rol, alpha }) {
  const setprofile = (somerol) => {
    let style = "";
    const rol = somerol.toLowerCase();
    if (
      rol === "programador" ||
      rol === "ing multimedia" ||
      rol === "analista de datos"
    ) {
      style = "o-profile1";
    } else if (
      rol === "diseñador gráfico" ||
      rol === "diseñador ui" ||
      rol === "animadores 2d"
    ) {
      style = "fullstack-developer";
    } else if (
      rol === "animador 3d" ||
      rol === "modelador 3d" ||
      rol === "gestor de hardware"
    ) {
      style = "o-profile2";
    } else if (
      rol === "gestor de software" ||
      rol === "diseñador de producto" ||
      rol === "diseñador de fotografía"
    ) {
      style = "o-profile3";
    } else if (
      rol === "productor audiovisual" ||
      rol === "ilustrador" ||
      rol === "gestor de proyectos"
    ) {
      style = "o-profile5 ";
    } else {
      style = "o-profile4";
    }
    return style;
  };
  return (
    <div className="card o-card-role">
      <p>{rol.nombre}</p>
      <section id="rolDescription">
        <small>{rol.descripcion}</small>
      </section>
      <section id="profiles" className={alpha === "CEM" ? "o-bg-cem" : ""}>
        Pefiles recomendados
      </section>
      <div className="o-recomended">
        {rol.perfiles.map((profile, i) => (
          <div
            className={"o-rol-job rounded-pill " + setprofile(profile)}
            key={i}
          >
            {profile}
          </div>
        ))}
      </div>
    </div>
  );
}
