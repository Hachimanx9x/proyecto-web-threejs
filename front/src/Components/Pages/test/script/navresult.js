import React from "react";
import Card from "./cardvoteresu";
const Nav = ({
  alfa,
  estado,
  descripcion,
  compas,
  mi,
  nmapra,
  funcdiscu,
  funcvote,
  funcactualizar,
}) => {
  //console.log(compas);
  let amarillo = "#D0A114";
  let style = { background: "#D0A114", color: "#ffff" };
  let temp = { border: "1px solid #D0A114", color: "#D0A114" };

  if (alfa == "Sistema Multimedia mínimo viable") {
    style = { background: "#009F41", color: "#ffff" };
    temp = { border: "1px solid #009F41", color: "#009F41" };
  }
  return (
    <div className="d-flex  m-0 p-0  h-100">
      <div
        className="text-center pt-4"
        style={{
          ...style,
          width: "300px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <h1 className="mt-5 ">{alfa}</h1>
        <h3>Estado : {estado}</h3>
        <p>{descripcion}</p>
      </div>
      <div className="d-flex flex-column justify-content-between">
        <div className="d-flex flex-wrap justify-content-between p-2">
          <Card key={`0i`} nombre={mi.nombre} img={mi.img} voto={mi.vote} />
          {compas.map((ele, i) => (
            <Card key={i} nombre={ele.nombre} img={ele.img} voto={ele.vote} />
          ))}
        </div>
        <div className="d-flex justify-content-between">
          <button
            className={"btn  z-depth-0  "}
            style={temp}
            onClick={() => {
              funcvote(nmapra);
            }}
          >
            Votar{" "}
          </button>
          <button
            className={"btn  z-depth-0  "}
            style={temp}
            onClick={() => {
              funcdiscu();
            }}
          >
            Discutir
          </button>
          <button
            className={"btn  z-depth-0 "}
            style={style}
            onClick={() => {
              funcactualizar();
            }}
          >
            Actualizar alfa
          </button>
        </div>
      </div>
    </div>
  );
};
export default Nav;
