import React, { Component } from "react";
import "./Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faSquare } from "@fortawesome/free-solid-svg-icons";
import { MDBInput } from "mdbreact";

import "react-day-picker/lib/style.css";

import DayPicker from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";

import "moment/locale/es.js";
import Rodal from "rodal";
import SuccessAnimation from "../../Elements/SuccessAnimation/SuccessAnimation";
import moment from "moment";

import "moment/locale/es.js";
require("moment/locale/es.js");

class CreateEvents extends Component {
  constructor(props) {
    super(props);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.createEvent = this.createEvent.bind(this);

    this.state = {
      selectedDate: null,
      confirmationModal: false,
      project: "",
      eventTitle: "",
      eventDescription: "",
      eventStart: null,
      eventEnd: null,
      colors: [],
      fetched: false,
      windowWidth: window.innerWidth,
      titleIsValid: true,
      hourIsValid: true,
      projectIsValid: true,
      errorHour: "",
      confirmation: false,
      colors: [],
      events: [
        "Reunión avances",
        "Presentación final",
        "Entrevistas",
        "Creación de entorno",
      ],
    };
  }
  /*
   *Function to create the event. Looks if every required field is correctly filled and send the http request to the server.
   */
  createEvent = async () => {
    await this.handleValidation();
    const hour = this.state.hourIsValid;
    const titleValid = this.state.titleIsValid;
    const project = this.state.projectIsValid;
    if (hour & project & titleValid) {
      this.setState({ confirmation: true });
      setTimeout(() => {
        this.setState({ confirmationModal: false });
        this.props.history.push("/Dashboard/Calendar");
      }, 1200);
    } else {
      this.setState({ confirmationModal: false });
    }
  };

  /*
   *Function used to validate each requiered Fields.
   */
  handleValidation = () => {
    const title = this.state.eventTitle;
    const startEvent =
      this.state.eventStart !== null ? this.state.eventStart.split(":") : null;
    const endEvent =
      this.state.eventEnd !== null ? this.state.eventEnd.split(":") : null;
    console.log(title + " " + startEvent + " " + endEvent);
    if (title.trim() === "") {
      this.setState({ titleIsValid: false });
    } else {
      this.setState({ titleIsValid: true });
    }
    if (this.state.project === "") {
      this.setState({ projectIsValid: false });
    } else {
      this.setState({ projectIsValid: true });
    }
    if (startEvent === null || endEvent === null) {
      this.setState({ errorHour: "Campos requeridos", hourIsValid: false });
    } else if (parseInt(startEvent[0]) > parseInt(endEvent[0])) {
      this.setState({
        errorHour: "Rangos de hora inválidos",
        hourIsValid: false,
      });
    } else if (parseInt(startEvent[0]) === parseInt(endEvent[0])) {
      if (parseInt(startEvent[1]) >= parseInt(endEvent[1])) {
        this.setState({
          errorHour: "Rangos de hora inválidos",
          hourIsValid: false,
        });
      } else {
        this.setState({
          hourIsValid: true,
        });
      }
    } else {
      this.setState({
        hourIsValid: true,
      });
    }
  };
  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
  };
  /*
   * Add an resizable method to get the current viewport dimensions for responsive issues.
   */

  componentDidMount = () => {
    let temcolors = [];
    for (let i = 0; i < this.state.events.length; i++) {
      const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      temcolors.push(color);
    }
    window.addEventListener("resize", this.handleResize);

    const date = new Date(localStorage.getItem("date"));
    const dateparts = date.toLocaleDateString().split("/");
    console.log(dateparts[2] + "/" + dateparts[1] + "/" + dateparts[0]);
    this.setState({
      colors: [...temcolors],
      selectedDate: date,
      fetched: true,
    });
  };
  /*
   * Removes the method before the component is unmounted.
   */
  componentWillUnmount = () => {
    window.removeEventListener("rezise", this.handleResize);
  };
  handleInput = (name, e) => {
    if (name === "confirmationModal") {
      this.setState({ [name]: e });
    } else {
      this.setState({ [name]: e.target.value });
    }
  };

  handleDayClick = (day, { selected }) => {
    this.setState({
      selectedDate: selected ? undefined : day,
    });
  };
  render() {
    if (this.state.fetched) {
      return (
        <div className="o-blue-container p-2 mb-4 mb-sm-0 pb-5 pb-sm-3">
          <Rodal
            width={300}
            height={160}
            animation={"fade"}
            visible={this.state.confirmationModal}
            onClose={() => this.handleInput("confirmationModal", false)}
          >
            {!this.state.confirmation ? (
              <div>
                <h5 className="mt-5 mb-2">¿Crear evento?</h5>
                <div className="d-flex justify-content-between p-2">
                  <button
                    className="z-depth-0 border-primary btn border-primary text-primary font-weight-bold"
                    type="button"
                    style={{
                      width: "7.2rem",
                      fontSize: "0.8rem",
                      height: "2.5rem",
                    }}
                    onClick={() => this.handleInput("confirmationModal", false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="z-depth-0 border-0 btn btn-primary font-weight-bold"
                    type="button"
                    style={{
                      width: "7.2rem",
                      fontSize: "0.8rem",
                      height: "2.5rem",
                    }}
                    onClick={() => this.createEvent()}
                  >
                    Crear
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <SuccessAnimation />
              </div>
            )}
          </Rodal>
          <div className="row p-0 p-sm-2 pl-sm-4 mb-sm-0 m-0">
            <div
              className="col-12 col-xs-12 bg-white rounded col-sm-8 mb-2 mt-2 o-create-event-container-form"
              style={this.state.windowWidth < 1259 ? { minWidth: "100%" } : {}}
            >
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-sm z-depth-0 btn-primary ml-0 mr-0 mt-4 text-light"
                  onClick={() => this.handleInput("confirmationModal", true)}
                >
                  Guardar
                </button>
              </div>

              <div className="p-0  pl-sm-4 pr-sm-4 m-0 d-flex flex-column position-relative  mr-sm-2 ml-sm-2">
                <small className="text-danger">* Campos obligatorios</small>
                <MDBInput
                  className={
                    (!this.state.titleIsValid
                      ? "is-invalid border-danger "
                      : "") + "m-0  mr-0"
                  }
                  label={
                    <p>
                      Título de la reunión{" "}
                      <strong className="text-danger">*</strong>
                    </p>
                  }
                  outline
                  maxLength="500"
                  onChange={(e) => this.handleInput("eventTitle", e)}
                />
                <span
                  className={
                    (!this.state.titleIsValid ? "visible " : "invisible ") +
                    "position-absolute o-hour-text pt-0 mt-0 text-danger m-0 mr-sm-4"
                  }
                  style={{ right: "0", bottom: "0" }}
                >
                  Campo requerido
                </span>
              </div>

              <div className="row mt-0 ml-2 mr-2 p-2 rounded justify-content-between">
                <div className="col-sm-4 mt-1 mb-2 mb-sm-0 mt-sm-0 mr-1 position-relative">
                  <small className="o-hour-text m-0 mb-2">
                    Proyecto asociado <strong className="text-danger">*</strong>
                  </small>
                  <div className="position-relative mt-1 mb-2 mb-sm-4">
                    <div className="o-create-select">
                      <select onChange={(e) => this.handleInput("project", e)}>
                        <option hidden>Seleccione</option>
                        <option value="Creación de entorno web">
                          Creación de entorno web
                        </option>
                        <option value="Arquitecto de experiencia multimedia">
                          Arquitecto de experiencia multimedia
                        </option>
                        <option value="Arquitecto Software">
                          Creación de videojuegos
                        </option>
                        <option value="Arquitecto Hardware">
                          Desarrollo de software
                        </option>
                      </select>
                    </div>
                  </div>
                  <span
                    className={
                      (!this.state.projectIsValid ? "visible" : "invisible") +
                      " position-absolute o-hour-text pt-0 mt-0 text-danger m-0 mr-sm-4"
                    }
                    style={
                      this.state.windowWidth < 590
                        ? { right: "55px", bottom: "-35px" }
                        : { right: "40px", bottom: "-20px" }
                    }
                  >
                    Campo requerido
                  </span>
                </div>
                <div
                  className="col-sm-4 mt-4 mb-2 mb-sm-0 mt-sm-0 position-relative"
                  style={{ minWidth: "14rem", maxWidth: "14rem" }}
                >
                  <small className="o-hour-text m-0">
                    Hora de inicio de la reunión{" "}
                    <strong className="text-danger">*</strong>
                  </small>
                  <div className="position-relative bg-warning ">
                    <div className="o-clock-container">
                      <input
                        className={
                          (!this.state.hourIsValid ? "border-danger " : "") +
                          "o-clock"
                        }
                        type="time"
                        name="selected_date"
                        onChange={(e) => {
                          this.handleInput("eventStart", e);
                        }}
                      />
                      <span className="o-open-clock-button">
                        <button>
                          <FontAwesomeIcon
                            icon={faClock}
                            style={{
                              border: "1px solid #007bff",
                              borderRadius: "50%",
                              background: "#007bff",
                            }}
                            className={
                              !this.state.hourIsValid
                                ? "bg-danger border-danger"
                                : ""
                            }
                          />
                        </button>
                      </span>
                    </div>
                  </div>
                  <span
                    className={
                      (!this.state.hourIsValid ? "visible " : "invisible ") +
                      "position-absolute o-hour-text pt-0 mt-0 text-danger m-0 mr-sm-4"
                    }
                    style={{ right: "25px", bottom: "-20px" }}
                  >
                    {this.state.errorHour}
                  </span>
                </div>

                <div className="col-sm-4 mt-1 mt-sm-0 position-relative">
                  <small className="o-hour-text m-0">
                    Hora de finalización de la reunión{" "}
                    <strong className="text-danger">*</strong>
                  </small>
                  <div className="postition-relative">
                    <div className="o-clock-container">
                      <input
                        className={
                          (!this.state.hourIsValid ? "border-danger " : "") +
                          "o-clock"
                        }
                        type="time"
                        name="selected_date"
                        onChange={(e) => {
                          this.handleInput("eventEnd", e);
                        }}
                      />
                      <span className="o-open-clock-button">
                        <button>
                          <FontAwesomeIcon
                            icon={faClock}
                            style={{
                              border: "1px solid #007bff",
                              borderRadius: "50%",
                              background: "#007bff",
                            }}
                            className={
                              !this.state.hourIsValid
                                ? "bg-danger border-danger"
                                : ""
                            }
                          />
                        </button>
                      </span>
                    </div>
                  </div>
                  <span
                    className={
                      (!this.state.hourIsValid ? "visible " : "invisible ") +
                      "position-absolute o-hour-text pt-0 mt-0 text-danger m-0 mr-sm-4"
                    }
                    style={
                      this.state.windowWidth < 590
                        ? { right: "60px", bottom: "-20px" }
                        : { right: "40px", bottom: "-20px" }
                    }
                  >
                    {this.state.errorHour}
                  </span>
                </div>
              </div>

              <div className="row ml-2 mr-2 p-2">
                <div className="col-12 mr-1">
                  <MDBInput
                    type="textarea"
                    className="m-0 mr-0 rounded"
                    label="Descripción de la reunión"
                    onChange={(e) => this.handleInput("eventDescription", e)}
                    outline
                    maxLength="1000"
                  />
                </div>
              </div>
            </div>
            <div
              className="col-12 col-sm-4 mb-2 mt-2 o-picker-cont"
              style={this.state.windowWidth < 1259 ? { minWidth: "100%" } : {}}
            >
              <div className="o-date-picker-container text-center rounded">
                <DayPicker
                  localeUtils={MomentLocaleUtils}
                  className="o-date-picker-container"
                  onDayClick={this.handleDayClick}
                  selectedDays={this.state.selectedDate}
                  locale="es"
                  disabledDays={{ before: moment().toDate() }}
                  todayButton="Hoy"
                  modifiers={{
                    foo: new Date(),
                  }}
                  onTodayButtonClick={(day, modifiers) =>
                    this.setState({
                      selectedDate: day,
                    })
                  }
                />
              </div>

              <div className="o-date-picker-container rounded mt-2 p-4 d-flex flex-column">
                <p>Eventos programados para el mismo día</p>
                {this.state.events.map((event, i) => (
                  <p key={i}>
                    <FontAwesomeIcon
                      icon={faSquare}
                      color={this.state.colors[i]}
                      className="mr-2"
                    />
                    {event}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Cargando.....</div>;
    }
  }
}

export default CreateEvents;
