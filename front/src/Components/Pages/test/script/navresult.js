import React from "react";
import Card from "./cardvoteresu";
const Nav = (props) => {
  let amarillo = "#D0A114";
  let style;
  let temp;
  console.log(props);
  if (props.alfa == "EXPERIENCIA MULTIMEDIA") {
    style = { background: "#009F41", color: "#ffff" };
    temp = { border: "1px solid #009F41", color: "#009F41" };
  }
  return (
    <div className="d-flex  m-0 p-0">
      <div
        className="text-center pt-4"
        style={{ ...style, width: "300px", height: "600px" }}
      >
        <h1 className="mt-5 ">{props.alfa}</h1>
        <h3>Estado : {props.estado}</h3>
        <p>{props.descripcion}</p>
      </div>
      <div className="d-flex flex-column justify-content-between">
        <div className="d-flex flex-wrap justify-content-between p-2">
          {props.obj.map((ele, i) => (
            <Card key={i} name={ele.name} img={ele.img} voto={ele.voto} />
          ))}
        </div>
        <div className="d-flex justify-content-between">
          <button
            className={"btn  z-depth-0  "}
            style={temp}
            onClick={() => {
              props.funvolver();
            }}
          >
            Votar{" "}
          </button>
          <button
            className={"btn  z-depth-0  "}
            style={temp}
            onClick={() => {
              props.funccer();
            }}
          >
            Discutir
          </button>
          <button
            className={"btn  z-depth-0 "}
            style={style}
            onClick={() => {
              props.alert(props.alfa);
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
