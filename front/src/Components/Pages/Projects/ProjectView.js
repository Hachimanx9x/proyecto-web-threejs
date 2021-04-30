import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import User from "../../../Logos/user-icon.png";
import ProjectIcon from "../../../Logos/project.png";
import ProjectPicture from "../../../ilustracion-equipo-de-trabajo.jpg";
import CardMember from "../../Elements/CardMember/CardMember";
import Axios from "axios";

import { defaults, Doughnut } from "react-chartjs-2";
import "rodal/lib/rodal.css";
import "./CreateProject.css";
import Rodal from "rodal";

defaults.global.legend.display = false;

class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: null,
      projectIcon: null,
      projectPicture: null,
      projectName: "",
      projectDescription: "",
      projectPractices: [],
      modal: false,
      titleConfirmarion: "",
      windowWidth: window.innerWidth,
      members: [],
      meetings: [],
      isLeader: false,
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

    const proyectId = this.props.match.params.id;
    const token = localStorage.getItem("login");
    const obj = JSON.parse(token);
    let temp = obj.token;
    const userId = obj.data.id;
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: `llave ${temp}`,
      },
    };
    try {
      Axios.all([
        Axios.get(`http://localhost:3030/proyectos/${proyectId}`, options),
        Axios.get(`http://localhost:3030/calendario/${proyectId}`, options),
      ]).then((response) => {
        const meetings = [];
        const project = response[0].data.proyectos;
        const allmembers = response[0].data.proyectos.integrantes;
        const members = [];
        const practices = [];
        let isLeader = false;
        for (let i of allmembers) {
          members.push({
            id: i.id,
            name: i.nombre,
            rols: [...i.palabras],
            urlimage: i.foto === null ? User : i.foto,
            selectedRol: i.rol,
          });
        }
        for (const i of response[1].data) {
          if (i.start !== "NaN:NaN" && i.end !== "NaN:NaN") {
            meetings.push({
              title: i.titulo,
              date: i.fecha,
              start: this.convertTime(i.start),
              end: this.convertTime(i.end),
            });
          }
        }
        const item = members.find((iterador) => iterador.id === userId);
        if (item.selectedRol === "Arquitecto Experiencia Multimedia") {
          isLeader = true;
        }
        for (const j of project.practicas) {
          if (j.practica === "Sistema Multimedia mínimo viable") {
            practices.push({
              name: j.nombre,
              description: j.descripcion,
              data: {
                labels: ["Completado", "Faltante"],
                datasets: [
                  {
                    data: [j.tasa, 100 - j.tasa],
                    backgroundColor: ["#4fa77b", "#ddd8d8"],
                    hoverBackgroundColor: ["#3c8862", "rgb(238, 229, 229)"],
                  },
                ],
              },
              alphas: [...j.alfas],
            });
          } else {
            practices.push({
              name: j.nombre,
              description: j.descripcion,
              data: {
                labels: ["Completado", "Faltante"],
                datasets: [
                  {
                    data: [j.tasa, 100 - j.tasa],
                    backgroundColor: ["#D0A114", "#ddd8d8"],
                    hoverBackgroundColor: ["#957411", "rgb(238, 229, 229)"],
                  },
                ],
              },
              alphas: [...j.alfas],
            });
          }
        }
        this.setState({
          projectId: project.idproyecto,
          projectName: project.nombre,
          projectDescription:
            project.descripcion === null ||
            project.descripcion === "" ||
            project.descripcion === undefined
              ? "Sin descripción."
              : project.descripcion,
          projectPicture: project.banner,
          projectIcon: project.icono,
          projectPractices: [...practices],
          members: [...members],
          meetings: [...meetings],
          isLeader: isLeader,
          fetched: true,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  convertTime = (time) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
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
    if (this.state.fetched) {
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
            <p
              className="mt-2 mb-4 text-justify"
              style={{ fontSize: "0.9rem" }}
            >
              El abandonar un proyecto no se puede
              <strong className="text-danger"> deshacer</strong>. Esto eliminará
              permanentemente su participación en el proyecto
              <strong className="text-danger"> {this.state.projectName}</strong>
              , el abandonar el proyecto puede incurrir en problemas legales
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
              {this.state.isLeader ? (
                <button
                  className="btn text-capitalize z-depth-0 text-white"
                  style={{ backgroundColor: "#D61E1E" }}
                  onClick={() => this.setState({ modal: true })}
                >
                  Eliminar
                </button>
              ) : (
                <></>
              )}
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
                />

                <MDBInput
                  type="textarea"
                  value={this.state.projectDescription}
                  label="Descripción del proyecto"
                  className="rounded pt-3 pt-sm-2"
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
              {this.state.projectPractices.map((practice, i) => {
                if (practice.name === "Sistema Multimedia mínimo viable") {
                  return (
                    <div
                      key={i}
                      className="o-smmv-practice d-flex flex-wrap justify-content-center w-100 mb-3"
                    >
                      <div className="col-12 col-sm-6">
                        <div className="bg-white w-100 p-1 m-2 text-center">
                          <p className="m-0">{practice.name}</p>
                        </div>
                        <div className="d-flex flex-wrap justify-content-between">
                          <div
                            className="card "
                            style={{ margin: "10px auto" }}
                          >
                            <p className="text-white text-center ">
                              {practice.alphas[1].nombre}
                            </p>
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
                                <small>{practice.alphas[1].estado}</small>
                              </div>
                            </div>
                          </div>
                          <div className="card" style={{ margin: "10px auto" }}>
                            <p className="text-white text-center ">
                              {practice.alphas[0].nombre}
                            </p>
                            <div
                              style={{
                                height: "15px",
                                width: "50px",
                                background: "rgba(255,255,255,0.2)",
                                border: "1px solid white",
                              }}
                              className="rounded text-center d-flex flex-column justify-content-center text-white"
                            >
                              <small style={{ fontSize: "10px" }}>
                                Sub-Alfa
                              </small>
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
                                <small>{practice.alphas[0].estado}</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-3"
                        style={{ minWidth: "15rem" }}
                      >
                        <div className="bg-white w-100 p-1 m-2 text-center">
                          <p className="m-0">Tasa de cumplimiento</p>
                        </div>
                        <div className="o-grahpcart-project text-center">
                          <Doughnut data={practice.data} />
                          <p className="o-text-practice-chart">
                            {practice.data.datasets[0].data[0]}%
                          </p>
                        </div>
                      </div>
                      <div
                        className={
                          "col-12 d-flex flex-column justify-content-between " +
                          (this.state.windowWidth < 1300
                            ? "col-sm-12 "
                            : "col-sm-3 ")
                        }
                        style={{ lineHeight: "16px", minWidth: "auto" }}
                      >
                        <div className="bg-white w-100 p-1 m-2 text-center">
                          <p className="m-0">
                            Información general de la práctica
                          </p>
                        </div>
                        <small
                          className="text-justify"
                          style={{ fontSize: "10px" }}
                        >
                          {practice.description}
                        </small>
                        <div className="d-flex justify-content-end">
                          <a
                            className="btn text-white mr-2 z-depth-0 text-capitalize"
                            style={{ background: "#4FA77B", fontSize: "12px" }}
                            href={`/Dashboard/Projects/ActivitiesSMMV/${this.state.projectId}`}
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
                  );
                } else {
                  return (
                    <div
                      key={i}
                      className="o-cem-practice d-flex justify-content-center flex-wrap w-100 mb-3"
                    >
                      <div className="col-12 col-sm-6">
                        <div className="bg-white w-100 p-1 m-2 text-center">
                          <p className="m-0"> {practice.name}</p>
                        </div>
                        <div className="d-flex flex-wrap justify-content-between">
                          <div
                            className="card "
                            style={{ margin: "10px auto" }}
                          >
                            <p className="text-white text-center ">
                              {practice.alphas[0].nombre}
                            </p>
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
                                <small> {practice.alphas[0].estado}</small>
                              </div>
                            </div>
                          </div>
                          <div className="card" style={{ margin: "10px auto" }}>
                            <p className="text-white text-center ">
                              {" "}
                              {practice.alphas[1].nombre}
                            </p>
                            <div
                              style={{
                                height: "15px",
                                width: "50px",
                                background: "rgba(255,255,255,0.2)",
                                border: "1px solid white",
                              }}
                              className="rounded text-center d-flex flex-column justify-content-center text-white"
                            >
                              <small style={{ fontSize: "10px" }}>
                                Sub-Alfa
                              </small>
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
                                <small> {practice.alphas[1].estado}</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-12 col-sm-3"
                        style={{ minWidth: "15rem" }}
                      >
                        <div className="bg-white w-100 p-1 m-2 text-center">
                          <p className="m-0">Tasa de cumplimiento</p>
                        </div>
                        <div className="o-grahpcart-project text-center">
                          <Doughnut data={practice.data} />
                          <p className="o-text-practice-chart">
                            {practice.data.datasets[0].data[0]}%
                          </p>
                        </div>
                      </div>
                      <div
                        className={
                          "col-12 d-flex flex-column justify-content-between " +
                          (this.state.windowWidth < 1300
                            ? "col-sm-12 "
                            : "col-sm-3 ")
                        }
                        style={{ lineHeight: "16px", minWidth: "auto" }}
                      >
                        <div className="bg-white w-100 p-1 m-2 text-center">
                          <p className="m-0">
                            Información general de la práctica
                          </p>
                        </div>
                        <small
                          className="text-justify"
                          style={{ fontSize: "10px" }}
                        >
                          {practice.description}
                        </small>
                        <div className="d-flex justify-content-end">
                          <a
                            className="btn text-white mr-2 z-depth-0 text-capitalize"
                            style={{ background: "#D0A114", fontSize: "12px" }}
                            href={`/Dashboard/Projects/ActivitiesCEM/${this.state.projectId}`}
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
                  );
                }
              })}
            </section>
            <section
              className="row bg-white mt-4 flex-column"
              style={{ borderRadius: "1rem" }}
            >
              {" "}
              <p className="m-3 pl-1 pl-sm-4 w-100">Calendario de reuniones</p>
              <div className="d-flex flex-wrap p-1 pb-3 pl-2 pr-4 pr-sm-5 pl-sm-5 mt-2">
                {this.state.meetings.length === 0 ? (
                  <p className="m-auto text-secondary">
                    No hay reuniones programadas
                  </p>
                ) : (
                  this.state.meetings.map((meeting, i) => (
                    <div key={i} className="o-meetings-calendar">
                      <p>{meeting.title}</p>
                      <div className="d-flex justify-content-between">
                        <small>
                          {meeting.start} - {meeting.end}
                        </small>
                        <small>{meeting.date}</small>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="d-flex justify-content-end pr-4 mr-4">
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
    } else {
      return <div>Cargando...</div>;
    }
  }
}

export default ProjectView;
