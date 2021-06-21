import React from "react";

export default function ContentCard({ tarjetas, func }) {
  let state = {
    jsxpra: null,
    practica: false,
    namepra: null,
    changepra: (pra) => {
      state.namepra = pra;
      console.log(state.namepra);
      state.practica = true;
    },
  };
  return (
    <div className="d-flex justify-content-around align-items-center h-100">
      {tarjetas.map((ele, i) => (
        <div
          key={i}
          className="card text-white text-center pt-5 pb-2"
          style={
            ele.nombre === "Concepción de la experiencia multimedia"
              ? { backgroundColor: "#D0A114", width: "350px", height: "400px" }
              : { backgroundColor: "#009F41", width: "350px", height: "400px" }
          }
        >
          <h4 className="font-weight-bold">{ele.nombre}</h4>
          <div style={{ height: "75%" }}>
            <p className="">{ele.descripcion}</p>
            {ele.alfas.map((el) => (
              <div key={el.id}>
                {el.nombre} = {el.estado}
              </div>
            ))}
          </div>

          <button
            className="w-75 bg-white rounded btn m-auto text-capitalize font-weight-bold"
            style={
              ele.nombre === "Concepción de la experiencia multimedia"
                ? { color: "#D0A114" }
                : { color: "#009F41" }
            }
            onClick={() => {
              func(ele.nombre);
            }}
          >
            Elegir
          </button>
        </div>
      ))}
    </div>
  );
}

/**
 *  <header
        className=" m-0 p-0 text-center bg-success pt-3"
        style={{
          height: "4rem",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }}
      >
        {props.obj.nombre}
      </header>
      <div className="text-center mt-2">
        <div className=" rounded-pill border-0 bg-success ml-5 mr-5">
          {props.obj.estaoevaluar}{" "}
        </div>
        <div className="d-flex flex-column ml-5 mr-5 mt-2">
          {props.obj.preguntas.map((pregunta) => (
            <div className="d-flex">
              <span className="mr-2 mb-2">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="rounded-circle border-success text-white bg-success  mb-2"
                />
              </span>
              <small className="text-justify">{pregunta.texto} </small>{" "}
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-between pl-4 pr-4">
        <button
          className="btn z-depth-0  btn-success "
          onClick={() => {
            props.voto(true);
          }}
        >
          si
        </button>
        <button
          className="btn z-depth-0  btn-danger"
          onClick={() => {
            props.voto(false);
          }}
        >
          no
        </button>
      </div>
 */
