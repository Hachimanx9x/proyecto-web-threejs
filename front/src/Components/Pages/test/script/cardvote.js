import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function ContentCard({ tarjetas, practi, func }) {
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
    <div>
      hola sin
      <div>
        {tarjetas.map((ele, i) => (
          <div key={i}>
            <div>{ele.nombre}</div>
            <div>{ele.descripcion}</div>
            {ele.alfas.map((el) => (
              <div key={el.id}>
                {el.nombre} = {el.estado}
              </div>
            ))}
            <button
              onClick={() => {
                func(ele.nombre);
                practi(ele.nombre);
              }}
            >
              {ele.nombre}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default class CardsVote extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      func: props.func,
      tarjetas: props.tarjetas,
      ifpratica: false,
      practica: "",
    };
    this.changepra = this.changepra.bind(this);
  }
  changepra = (pra) => {
    console.log("otro");
    this.setState({ ifpratica: true, practica: pra });
  };
  render() {
    return (
      <div>
        <ContentCard
          tarjetas={this.state.tarjetas}
          practi={this.changepra}
          func={this.state.func}
        />
      </div>
    );
  }
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
