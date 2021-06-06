import React from "react";

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faCheck } from "@fortawesome/free-solid-svg-icons";
import alphay from "../../../../Logos/alpha.svg";
import alphag from "../../../../Logos/alpha_s.svg";
import icon from "../../../../Logos/icondes.svg";
import icong from "../../../../Logos/icondesg.svg";
import "./card.css";
export default function Tarjetas({ nmapra, tarjetas, func }) {
  console.log(tarjetas);
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
      <div className=" d-flex flex-column justify-content-end h-100  w-100 ">
        <div className="d-flex justify-content-around ">
          {tarjetas.map((practicas, ipra) => {
            let tarjetasid = [];
            if (practicas.nombre === nmapra) {
              practicas.alfas[0].tarjeta.map((tar, idta) => {
                tarjetasid.push(
                  <TarjetaCard
                    key={idta}
                    nmapra={nmapra}
                    nombre={tar.nombre}
                    descripcion={tar.descripcion}
                    nualpha={practicas.alfas[0].num}
                    nuposition={idta}
                  />
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

const TarjetaCard = ({ nmapra, nombre, descripcion, nualpha, nuposition }) => (
  <div>
    <div className="o-card-e">
      <div className="o-card-e__heading">
        <div className="o-card-e__icon"></div> <h3>{nmapra}</h3>
      </div>
      <div className="o-card-e__body">
        <h3 className="o-card-e__title"> {nombre}</h3>

        {descripcion.slice(0, 4).map((des, ids) => (
          <p key={ids} className="o-card-e__text">
            {des}
          </p>
        ))}
        <div className="o-card-e__counter">
          {`${nualpha[nuposition]}`}/
          {nmapra === "Sistema Multimedia mínimo viable" ? "4" : "5"}
        </div>
        <div className="w-100 d-flex juntify-content-start">
          <div className="o-card-e__iconA"></div>
        </div>
      </div>
    </div>
    <style jsx="false">{`
      h3 {
        font-size: 20px;
      }
      p {
        font-size: 14px;
      }
      .o-card-e__iconA {
        height: 30px;
        width: 50px;
        margin-left: 10px;
        background-image: url(${nmapra === "Sistema Multimedia mínimo viable"
          ? icong
          : icon});
        background-position: center;
        background-repeat: no-repeat;
        background-size: auto auto;
      }
      .o-card-e__icon {
        height: 100px;
        width: 100px;
        margin: 15px;
        background-color: ${nmapra === "Sistema Multimedia mínimo viable"
          ? "#009F41"
          : "#ffff00"};
        -webkit-mask-size: contain;

        mask-size: contain;

        -webkit-mask-position: center;

        mask-position: center;

        -webkit-mask-repeat: no-repeat;

        mask-image: url("${alphay}");
      }
      .o-card-e {
        font-family: sans-serif;
        text-align: center;
        width: 350px;
        height: auto;
        border: 2px solid
          ${nmapra === "Sistema Multimedia mínimo viable"
            ? "#009F41"
            : "#ffff00"};
        border-radius: 3px;
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2),
          inset 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
        background-color: #ffffff;
      }

      .o-card-e__heading {
        background-color: #ffff99;
        height: 20%;
        box-shadow: inset 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
        border-bottom: 2px solid
          ${nmapra === "Sistema Multimedia mínimo viable"
            ? "#009F41"
            : "#ffff00"};
        display: flex;
        justify-content: center;
        text-transform: uppercase;
        align-items: center;

        margin: 0;
        padding: 0;
      }

      .o-card-e__body,
      .o-card-e__body > * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .o-card-e__body {
        height: 80%;
        box-shadow: inset 0px 5px 5px 2px rgba(0, 0, 0, 0.2),
          inset 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
        background-image: url(${nmapra === "Sistema Multimedia mínimo viable"
          ? alphag
          : alphay});
        background-position: center;
        background-repeat: no-repeat;
        background-size: 150px 100px;
      }

      .o-card-e__title {
        margin: 20px auto;
        width: 85%;
        border: 2px solid
          ${nmapra === "Sistema Multimedia mínimo viable"
            ? "#009F41"
            : "#ffff00"};
        text-transform: uppercase;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2),
          inset 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
      }

      .o-card-e__text {
        position: relative;
        width: 100%;
        text-align: start;
        padding: 0 10px 0 50px;
      }
      .o-card-e__text::before {
        content: "";
        width: 18px;
        height: 12px;
        border: 2px solid
          ${nmapra === "Sistema Multimedia mínimo viable"
            ? "#009F41"
            : "#ffff00"};
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.1),
          inset 0px 0px 4px 2px rgba(0, 0, 0, 0.05);
        position: absolute;
        margin-left: -30px;
      }

      .o-card-e__counter {
        margin: 0px auto;
        width: 85%;
        border: 3px solid
          ${nmapra === "Sistema Multimedia mínimo viable"
            ? "#009F41"
            : "#ffff00"};
        background-color: #ffff99;
        margin-top: auto;
        font-weight: bold;
        text-transform: uppercase;
        padding: 10px;
        border-radius: 10px;
      }
    `}</style>
  </div>
);
/*
 <div className="card p-2 m-auto o-card-E">
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
      {nombre}
    </h4>
    {descripcion.slice(0, 4).map((des, ids) => (
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
*/
/**
 *  let tarjetasid = [];
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
 */
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
