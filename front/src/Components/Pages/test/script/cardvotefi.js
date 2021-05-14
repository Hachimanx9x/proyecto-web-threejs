import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export default function Tarjetas({ nmapra, tarjetas, func }) {
  let style = { background: "#D0A114", color: "#ffff" };

  console.log(nmapra);
  if (nmapra == "Sistema Multimedia mínimo viable") {
    style = { background: "#009F41", color: "#ffff" };
  }
  return (
    <div className="d-flex  m-0 p-0 h-100" style={{ boxSizing: "border-box" }}>
      <div
        className="text-center pt-4 d-flex flex-column justify-content-around align-content-center"
        style={{
          ...style,

          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <h3>{nmapra}</h3>
        {tarjetas.map((practicas, ipra) => {
          let alfas = [];
          if (practicas.nombre === nmapra) {
            practicas.alfas.map((alfa, ialfa) => {
              alfas.push(
                <div key={ialfa}>
                  <h3>{alfa.nombre}</h3>
                  Estado : {alfa.estado}
                </div>
              );
            });
          }
          return alfas;
        })}
      </div>
      <div className=" d-flex flex-column justify-content-end h-100 ">
        <div className="d-flex justify-content-around ">
          {tarjetas.map((practicas, ipra) => {
            let tarjetasid = [];
            if (practicas.nombre === nmapra) {
              practicas.alfas[0].tarjeta.map((tar, idta) => {
                tarjetasid.push(
                  <div
                    className="card p-2 m-auto"
                    style={{
                      width: "40%",
                    }}
                    key={"d" + idta}
                  >
                    <h4
                      className="rounded-pill"
                      style={
                        nmapra === "Sistema Multimedia mínimo viable"
                          ? {
                              background: "#009F41",
                              color: "#ffff",
                              textAlign: "center",
                            }
                          : {
                              background: "#D0A114",
                              color: "#ffff",
                              textAlign: "center",
                            }
                      }
                    >
                      {tar.nombre}
                    </h4>
                    {tar.descripcion.slice(0, 4).map((des, ids) => (
                      <p key={ids}>
                        {" "}
                        <FontAwesomeIcon
                          style={
                            nmapra === "Sistema Multimedia mínimo viable"
                              ? {
                                  border: "3px solid #009F41",
                                  color: "#009F41",
                                  width: "16px",
                                  height: "16px",
                                }
                              : {
                                  border: "3px solid #D0A114",
                                  color: "#D0A114",
                                  width: "16px",
                                  height: "16px",
                                }
                          }
                          icon={faCheck}
                          className=" rounded-circle"
                        />
                        {des}
                      </p>
                    ))}
                  </div>
                );
              });
            }

            return tarjetasid;
          })}
        </div>
        <div className="d-flex justify-content-end mt-3 pb-2">
          <button
            style={{
              backgroundColor: "#009F41",
              width: "48px",
              height: "50px",
              border: "none",
            }}
            className="mr-2 btn font-weight-bold text-white rounded"
            onClick={() => {
              func(true);
            }}
          >
            si
          </button>
          <button
            style={{
              backgroundColor: "#AB000F",
              width: "48px",
              height: "50px",
              border: "none",
            }}
            className="mr-2 btn font-weight-bold text-white rounded"
            onClick={() => {
              func(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
/**
 * let condiciones = [],
    alfas = [];

  tarjetas.forEach((elemento) => {
    if (elemento.nombre === nmapra) {
      elemento.alfas.forEach((elealfa) => {
        alfas.push({
          id: elealfa.id,
          nombre: elealfa.nombre,
          estado: elealfa.estado,
        });
        condiciones.push(elealfa.tarjeta);
      });
    }
  });

  condiciones = Array.from(new Set(condiciones.map(JSON.stringify))).map(
    JSON.parse
  )[0];
  console.log(alfas);
  console.log(condiciones);
  return (
    <div>
      <div>{nmapra}</div>
      <div>
        {alfas.map((ele, id) => (
          <div key={id}>{ele.nombre}</div>
        ))}
      </div>
      hola
      <div>
        {condiciones.map((elex, i) => {
          return (
            <div key={i + "d"}>
              {elex.nombre}
              {elex.descripcion.map((pe, ip) => (
                <p key={ip}>{pe}</p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
 */
