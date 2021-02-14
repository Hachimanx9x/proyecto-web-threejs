import React, { Component } from "react";
import "./Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faSquare } from "@fortawesome/free-solid-svg-icons";
import { MDBInput } from "mdbreact";

import "react-day-picker/lib/style.css";

import DayPicker from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";

import "moment/locale/es.js";
require("moment/locale/es.js");

class CreateEvents extends Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.state = {
      selectedDate: null,
      eventTitle: "",
      eventDescription: "",
      eventStart: null,
      eventEnd: null,
      colors: [],
      fetched: false,
      windowWidth: window.innerWidth,
    };
  }
  getRandomColor() {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return color;
  }
  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
  };
  /*
   * Add an resizable method to get the current viewport dimensions for responsive issues.
   * F
   */
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);

    const date = new Date(localStorage.getItem("date"));
    const dateparts = date.toLocaleDateString().split("/");
    console.log(dateparts[2] + "/" + dateparts[1] + "/" + dateparts[0]);
    this.setState({ selectedDate: date, fetched: true });
  }
  /*
   * Removes the method before the component is unmounted.
   */
  componentWillUnmount() {
    window.removeEventListener("rezise", this.handleResize);
  }
  render() {
    if (this.state.fetched) {
      return (
        <div className="o-blue-container p-2 mb-4 mb-sm-0 pb-5 pb-sm-3">
          <div className="row p-0 p-sm-2 pl-sm-4 mb-sm-0 m-0">
            <div
              className="col-12 col-xs-12 bg-white rounded col-sm-8 mb-2 mt-2 o-create-event-container-form"
              style={this.state.windowWidth < 1259 ? { minWidth: "100%" } : {}}
            >
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-sm z-depth-0 btn-primary ml-0 mr-0 mt-4 text-light"
                >
                  Guardar
                </button>
              </div>

              <div className="p-0 pl-sm-4 pr-sm-4 m-0 mr-sm-2 ml-sm-2">
                <MDBInput
                  className="m-0 mr-0"
                  label="Título de la reunión"
                  outline
                />
              </div>

              <div className="row mt-0 ml-2 mr-2 p-2 rounded justify-content-between">
                <div className="col-sm-4 mt-1 mt-sm-0 mr-1">
                  <small className="o-hour-text m-0 mb-2">
                    Proyecto asociado
                  </small>
                  <div className="position-relative mt-1 mb-0 mb-sm-4">
                    <div className="o-create-select">
                      <select>
                        <option hidden>Creación de entorno web</option>
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
                </div>
                <div
                  className="col-sm-4 mt-4 mt-sm-0"
                  style={{ minWidth: "14rem", maxWidth: "14rem" }}
                >
                  <small className="o-hour-text m-0">
                    Hora de inicio de la reunión
                  </small>
                  <div className="position-relative bg-warning">
                    <div className="o-clock-container">
                      <input
                        className="o-clock"
                        type="time"
                        name="selected_date"
                        onChange={(e) => {
                          this.setState({ eventStart: e.target.value });
                          console.log(this.state.eventStart);
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
                          />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4 mt-1 mt-sm-0">
                  <small className="o-hour-text m-0">
                    Hora de finalización de la reunión
                  </small>
                  <div className="postition-relative">
                    <div className="o-clock-container">
                      <input
                        className="o-clock"
                        type="time"
                        name="selected_date"
                        onChange={(e) => {
                          this.setState({ eventEnd: e.target.value });
                          console.log(this.state.eventEnd);
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
                          />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ml-2 mr-2 p-2">
                <div className="col-12 mr-1">
                  <MDBInput
                    type="textarea"
                    className="m-0 mr-0 rounded"
                    label="Descripción de la reunión"
                    outline
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
                  selectedDays={[new Date(localStorage.getItem("date"))]}
                  locale="es"
                />
              </div>

              <div className="o-date-picker-container rounded mt-2 p-4 d-flex flex-column">
                <p>Eventos programados para el mismo día</p>
                <small className="mt-2 mb-2">
                  <FontAwesomeIcon
                    icon={faSquare}
                    color={this.getRandomColor()}
                    className="mr-2"
                  />
                  Reunión avances
                </small>
                <small className="mt-2 mb-2">
                  <FontAwesomeIcon
                    icon={faSquare}
                    color={this.getRandomColor()}
                    className="mr-2"
                  />
                  Computación
                </small>
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
