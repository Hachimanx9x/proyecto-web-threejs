import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import User from "../../../Logos/user-icon.png";
import ProjectIcon from "../../../Logos/project.png";
import ProjectPicture from "../../../ilustracion-equipo-de-trabajo.jpg";
import CardMember from "../../Elements/CardMember/CardMember";
import { defaults, Doughnut } from "react-chartjs-2";

import "rodal/lib/rodal.css";
import "./CreateProject.css";
import Rodal from "rodal";

defaults.global.legend.display = false;

class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectIcon: null,
      projectPicture: null,
      projectName: "Creacion de un entorno 3d para el trabajo colaborativo",
      projectDescription:
        "Este es un proyecto que reune a un grupo de desarrolladores para la creación de un entrono virtual colaborativo que permitirá implementa una metodología ágil.",
      projectPractices: {
        smmv: false,
        cem: false,
      },
      modal: false,
      titleConfirmarion: "",
      windowWidth: window.innerWidth,
      members: [
        {
          id: 1,
          name: "Saitama",
          urlimage: User,
          rols: [
            { rol: "desarrollador web" },
            { rol: "desarrollador fullstack" },
            { rol: "ui designer" },
            { rol: "desarrollador web" },
            { rol: "desarrollador fullstack" },
            { rol: "ui designer" },
          ],
          selectedRol: "Arquitecto de Pruebas",
        },
        {
          id: 2,
          name: "Tatsumi",
          urlimage: User,
          rols: [{ rol: "desarrollador web" }],
          selectedRol: "Arquitecto Sw/Hw",
        },
        {
          id: 3,
          name: "Saber",
          urlimage: User,

          rols: [
            { rol: "desarrollador web" },
            { rol: "desarrollador fullstack" },
            { rol: "ui designer" },
          ],
          selectedRol: "Diseñador de producto",
        },
        {
          id: 4,
          name: "Accel",
          urlimage: User,
          rols: [
            { rol: "desarrollador web" },
            { rol: "desarrollador fullstack" },
            { rol: "ui designer" },
          ],
          selectedRol: "Arquitecto de Información",
        },
        {
          id: 5,
          name: "Hachiman",
          urlimage: User,
          rols: [
            { rol: "desarrollador web" },
            { rol: "desarrollador fullstack" },
            { rol: "ui designer" },
          ],
          selectedRol: "Arquitecto de Experiencia Multimedia",
        },
      ],

      contacts: [
        {
          id: 1,
          name: "Saitama",
          urlimage: User,
          rols: [
            { rol: "desarrollador web" },
            { rol: "desarrollador fullstack" },
            { rol: "ui designer" },
          ],
        },
        {
          id: 2,
          name: "Tatsumi",
          urlimage: User,
          rols: [
            { rol: "desarrollador web" },
            { rol: "desarrollador fullstack" },
            { rol: "ui designer" },
          ],
        },
        {
          id: 3,
          name: "Saber",
          urlimage: User,

          rols: [
            { rol: "desarrollador web" },
            { rol: "desarrollador fullstack" },
            { rol: "ui designer" },
          ],
        },
        {
          id: 4,
          name: "Accel",
          urlimage: User,
          rols: [
            { rol: "desarrollador web" },
            { rol: "desarrollador fullstack" },
            { rol: "ui designer" },
          ],
        },
        {
          id: 5,
          name: "Hachiman",
          urlimage: User,
          rols: [
            { rol: "desarrollador web" },
            { rol: "desarrollador fullstack" },
            { rol: "ui designer" },
          ],
        },
      ],
    };
  }
  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
  };
  /*
   * Add an resizable method to get the current viewport dimensions for responsive issues.
   */
  componentDidMount = () => {
    window.addEventListener("resize", this.handleResize);
  };
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.handleResize);
  };
  render() {
    const data = {
      labels: ["Completado", "Faltante"],
      datasets: [
        {
          data: [60, 40],
          backgroundColor: ["#4fa77b", "#ddd8d8"],
          hoverBackgroundColor: ["#3c8862", "rgb(238, 229, 229)"],
        },
      ],
    };
    const data2 = {
      labels: ["Completado", "Faltante"],
      datasets: [
        {
          data: [60, 40],
          backgroundColor: ["#D0A114", "#ddd8d8"],
          hoverBackgroundColor: ["#957411", "rgb(238, 229, 229)"],
        },
      ],
    };
    return (
      <div className="row mb-3 mb-sm-0 pb-5 pb-sm-0 w-100">
        <Rodal
          width={300}
          height={420}
          animation={"fade"}
          visible={this.state.modal}
          onClose={() => this.setState({ modal: false })}
        >
          <p className="text-center mt-4" style={{ fontSize: "0.9rem" }}>
            Confirmación de abandono de proyecto
          </p>
          <p className="mt-2 mb-4 text-justify" style={{ fontSize: "0.9rem" }}>
            El abandonar un proyecto no se puede
            <strong className="text-danger"> deshacer</strong>. Esto eliminará
            permanentemente su participación en el proyecto
            <strong className="text-danger"> {this.state.projectName}</strong>,
            el abandonar el proyecto puede incurrir en problemas legales
            definidos por el método de contratación al ingresar el proyecto.
          </p>
          <p style={{ fontSize: "0.9rem" }} className="mt-2">
            Escriba "{this.state.projectName}" para confirmar.
          </p>
          <input
            value={this.state.titleConfirmarion}
            style={{ fontSize: "0.9rem" }}
            className="text-danger w-100"
            onChange={(e) => {
              this.setState({ titleConfirmarion: e.target.value });
            }}
          />
          <button
            style={{ fontSize: "0.6rem" }}
            className={
              (this.state.titleConfirmarion !== this.state.projectName
                ? "disabled"
                : "") + " btn btn-danger btn-block border-0 text-white mt-2"
            }
            onClick={() => {
              this.setState({ modal: false });
              this.props.history.push("/Dashboard/Projects");
            }}
          >
            <small>
              Lo entiendo y me hago cargo responsable de las consecuencias.
              Abandonar el proyecto.
            </small>
          </button>
        </Rodal>

        <div className="o-project-creation-section">
          <div className="d-flex justify-content-end">
            <button
              className="btn text-capitalize z-depth-0 text-white"
              style={{ backgroundColor: "#D61E1E" }}
              onClick={() => this.setState({ modal: true })}
            >
              Eliminar
            </button>
          </div>
          <section className="row bg-white o-project-basic-info">
            <div className="col-xs-12 col-sm-4">
              <p className="d-block">Icono del proyecto</p>
              <img
                src={
                  this.state.projectIcon === null
                    ? ProjectIcon
                    : this.state.projectIcon
                }
                alt={"icon"}
                className="rounded-circle"
                style={{ width: "3rem", height: "3rem" }}
              />
              <p className="d-block">Banner del proyecto</p>
              <div className="o-project-form d-flex justify-content-end">
                <img
                  src={
                    this.state.projectPicture === null
                      ? ProjectPicture
                      : this.state.projectPicture
                  }
                  className="o-picture-project"
                  alt="project"
                />
              </div>
            </div>
            <div className="col-xs-12 p-0 pl-sm-4 col-sm-8 position-relative">
              <MDBInput
                type="text"
                label={<span>Nombre del proyecto </span>}
                value={this.state.projectName}
                outline
                required
                disabled
              />

              <MDBInput
                type="textarea"
                value={this.state.projectDescription}
                label="Descripción del proyecto"
                className="rounded pt-3 pt-sm-2"
                disabled
                outline
              />
            </div>
          </section>
          <section
            className="row bg-white mt-4 flex-column"
            style={{ borderRadius: "1rem" }}
          >
            <div className="d-flex justify-content-between">
              <p className="m-3 pl-1 pl-sm-4">Integrantes del proyecto</p>
            </div>
            <div className="o-member-selection-container">
              {this.state.members.map((member, i) => (
                <CardMember readOnly={true} key={i} member={member} />
              ))}
            </div>
          </section>
          <section
            id="Practices-section"
            className="row bg-white mt-4 flex-column"
            style={{ borderRadius: "1rem" }}
          >
            <p className="m-3 pl-1 pl-sm-4 w-100">
              Prácticas para concebir la pre-producción
            </p>
            <div className="o-smmv-practice d-flex flex-wrap justify-content-center w-100 mb-3">
              <div className="col-12 col-sm-6">
                <div className="bg-white w-100 p-1 m-2 text-center">
                  <p className="m-0">Sistema multimedia mínimo viable</p>
                </div>
                <div className="d-flex flex-wrap justify-content-between">
                  <div className="card " style={{ margin: "10px auto" }}>
                    <p className="text-white text-center ">Oportunidad</p>
                    <div
                      style={{
                        height: "15px",
                        width: "50px",
                        background: "rgba(255,255,255,0.2)",
                        border: "1px solid white",
                      }}
                      className="rounded text-center d-flex flex-column justify-content-center text-white"
                    >
                      <small style={{ fontSize: "10px" }}>Alfa</small>
                    </div>
                    <div className="rounded bg-white d-flex  w-100 m-2 p-2 mt-1">
                      <small className="mr-2">Estado:</small>
                      <div
                        style={{
                          height: "20px",
                          width: "80px",
                          background: "#4fa77b33",
                          border: "1px solid #4fa77b",
                          color: "#4fa77b",
                        }}
                        className="rounded text-center d-flex flex-column justify-content-center"
                      >
                        <small>Identificada</small>
                      </div>
                    </div>
                  </div>
                  <div className="card" style={{ margin: "10px auto" }}>
                    <p className="text-white text-center ">Valor del SM</p>
                    <div
                      style={{
                        height: "15px",
                        width: "50px",
                        background: "rgba(255,255,255,0.2)",
                        border: "1px solid white",
                      }}
                      className="rounded text-center d-flex flex-column justify-content-center text-white"
                    >
                      <small style={{ fontSize: "10px" }}>Sub-Alfa</small>
                    </div>
                    <div className="rounded bg-white d-flex w-100 m-2 p-2 mt-1">
                      <small className="mr-2">Estado:</small>
                      <div
                        style={{
                          height: "20px",
                          width: "80px",
                          background: "#4fa77b33",
                          border: "1px solid #4fa77b",
                          color: "#4fa77b",
                        }}
                        className="rounded text-center d-flex flex-column justify-content-center"
                      >
                        <small>Identificada</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-3" style={{ minWidth: "15rem" }}>
                <div className="bg-white w-100 p-1 m-2 text-center">
                  <p className="m-0">Tasa de cumplimiento</p>
                </div>
                <div className="o-grahpcart-project text-center">
                  <Doughnut data={data} />
                  <p className="o-text-practice-chart">60%</p>
                </div>
              </div>
              <div
                className={
                  "col-12 d-flex flex-column justify-content-between " +
                  (this.state.windowWidth < 1300 ? "col-sm-12 " : "col-sm-3 ")
                }
                style={{ lineHeight: "16px", minWidth: "auto" }}
              >
                <div className="bg-white w-100 p-1 m-2 text-center">
                  <p className="m-0">Información general de la práctica</p>
                </div>
                <small className="text-justify" style={{ fontSize: "10px" }}>
                  El propósito de esta práctica es poder generar y plasmar los
                  elementos visuales e interactivos mínimos para poder
                  transmitir una correcta experiencia a los usuarios.
                </small>
                <div className="d-flex justify-content-end">
                  <a
                    className="btn text-white mr-2 z-depth-0 text-capitalize"
                    style={{ background: "#4FA77B", fontSize: "12px" }}
                    href={`/Dashboard/Projects/ActivitiesSMMV/${1}`}
                  >
                    Actividades
                  </a>
                  <a
                    className="btn text-white mr-2 z-depth-0 text-capitalize"
                    style={{ background: "#4FA77B", fontSize: "12px" }}
                    href="/Dashboard/Projects/DocumentationSMMV"
                  >
                    Información
                  </a>
                </div>
              </div>
            </div>
            <div className="o-cem-practice d-flex justify-content-center flex-wrap w-100 mb-3">
              <div className="col-12 col-sm-6">
                <div className="bg-white w-100 p-1 m-2 text-center">
                  <p className="m-0">Sistema multimedia mínimo viable</p>
                </div>
                <div className="d-flex flex-wrap justify-content-between">
                  <div className="card " style={{ margin: "10px auto" }}>
                    <p className="text-white text-center ">Oportunidad</p>
                    <div
                      style={{
                        height: "15px",
                        width: "50px",
                        background: "rgba(255,255,255,0.2)",
                        border: "1px solid white",
                      }}
                      className="rounded text-center d-flex flex-column justify-content-center text-white"
                    >
                      <small style={{ fontSize: "10px" }}>Alfa</small>
                    </div>
                    <div className="rounded bg-white d-flex  w-100 m-2 p-2 mt-1">
                      <small className="mr-2">Estado:</small>
                      <div
                        style={{
                          height: "20px",
                          width: "80px",
                          background: "#d0a11433",
                          border: "1px solid #d0a114",
                          color: "#d0a114",
                        }}
                        className="rounded text-center d-flex flex-column justify-content-center"
                      >
                        <small>Identificada</small>
                      </div>
                    </div>
                  </div>
                  <div className="card" style={{ margin: "10px auto" }}>
                    <p className="text-white text-center ">Valor del SM</p>
                    <div
                      style={{
                        height: "15px",
                        width: "50px",
                        background: "rgba(255,255,255,0.2)",
                        border: "1px solid white",
                      }}
                      className="rounded text-center d-flex flex-column justify-content-center text-white"
                    >
                      <small style={{ fontSize: "10px" }}>Sub-Alfa</small>
                    </div>
                    <div className="rounded bg-white d-flex w-100 m-2 p-2 mt-1">
                      <small className="mr-2">Estado:</small>
                      <div
                        style={{
                          height: "20px",
                          width: "80px",
                          background: "#d0a11433",
                          border: "1px solid #d0a114",
                          color: "#d0a114",
                        }}
                        className="rounded text-center d-flex flex-column justify-content-center"
                      >
                        <small>Identificada</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-3" style={{ minWidth: "15rem" }}>
                <div className="bg-white w-100 p-1 m-2 text-center">
                  <p className="m-0">Tasa de cumplimiento</p>
                </div>
                <div className="o-grahpcart-project text-center">
                  <Doughnut data={data2} />
                  <p className="o-text-practice-chart">60%</p>
                </div>
              </div>
              <div
                className={
                  "col-12 d-flex flex-column justify-content-between " +
                  (this.state.windowWidth < 1300 ? "col-sm-12 " : "col-sm-3 ")
                }
                style={{ lineHeight: "16px", minWidth: "auto" }}
              >
                <div className="bg-white w-100 p-1 m-2 text-center">
                  <p className="m-0">Información general de la práctica</p>
                </div>
                <small className="text-justify" style={{ fontSize: "10px" }}>
                  El propósito de esta práctica es poder generar y plasmar los
                  elementos visuales e interactivos mínimos para poder
                  transmitir una correcta experiencia a los usuarios.
                </small>
                <div className="d-flex justify-content-end">
                  <a
                    className="btn text-white mr-2 z-depth-0 text-capitalize"
                    style={{ background: "#D0A114", fontSize: "12px" }}
                    href={`/Dashboard/Projects/ActivitiesCEM/${1}`}
                  >
                    Actividades
                  </a>
                  <a
                    className="btn text-white mr-2 z-depth-0 text-capitalize"
                    style={{ background: "#D0A114", fontSize: "12px" }}
                    href="/Dashboard/Projects/DocumentationCEM"
                  >
                    Información
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section
            className="row bg-white mt-4 flex-column"
            style={{ borderRadius: "1rem" }}
          >
            {" "}
            <p className="m-3 pl-1 pl-sm-4 w-100">Calendario de reuniones</p>
            <div className="d-flex flex-wrap p-1 pb-3 pl-sm-3 pr-sm-3 mt-2">
              <div className="o-meetings-calendar">
                <p>Reunión de avances de oportunidad</p>
                <div className="d-flex justify-content-between">
                  <small>09:00 AM - 10:00 AM</small>
                  <small>27 / 04 / 2020</small>
                </div>
              </div>{" "}
              <div className="o-meetings-calendar">
                <p>Reunión de avances de oportunidad</p>
                <div className="d-flex justify-content-between">
                  <small>09:00 AM - 10:00 AM</small>
                  <small>27 / 04 / 2020</small>
                </div>
              </div>{" "}
              <div className="o-meetings-calendar">
                <p>Reunión de avances de oportunidad</p>
                <div className="d-flex justify-content-between">
                  <small>09:00 AM - 10:00 AM</small>
                  <small>27 / 04 / 2020</small>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end pr-4">
              <a
                href="/Dashboard/Calendar"
                className="btn z-depth-0 text-capitalize btn-primary bg-primary"
              >
                Más información
              </a>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ProjectView;
