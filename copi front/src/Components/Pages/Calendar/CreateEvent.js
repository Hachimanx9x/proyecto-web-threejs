import React, { Component } from "react";
import "./Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { MDBInput } from "mdbreact";

import "react-day-picker/lib/style.css";

import DayPicker from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";

import "moment/locale/es.js";
require("moment/locale/es.js");

class CreateEvents extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);

    this.state = {
      selectedDate: null,
      colors: [],
    };
  }
  getRandomColor() {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return color;
  }
  handleDayClick(day, { selected }) {
    this.setState({
      selectedDate: selected ? undefined : day,
    });
    localStorage.setItem("date", this.state.selectedDate);
    const date = this.state.selectedDate;
    console.log(date);
  }
  render() {
    return (
      <div className="o-blue-container mb-3 mb-sm-0 pb-5 pb-sm-0">
        <div className="row ">
          <div className="col-12 col-xs-12 col-sm-8 o-create-event-container-form">
            <div className="row ml-2 mr-2 bg-white p-2 rounded">
              <div className="col-sm-10 mr-1">
                <MDBInput
                  className="m-0 mr-0"
                  label="Título de la reunión"
                  id="o-hi"
                  outline
                />
              </div>
              <div className="col m-0 p-1">
                <button
                  type="button"
                  className="btn btn-sm z-depth-0 btn-primary ml-0 mr-0 mt-4 text-light"
                >
                  Guardar
                </button>
              </div>
            </div>

            <div className="row ml-2 mr-2 bg-white p-2 rounded">
              <div className="col-sm-6 mr-0 d-flex">
                <small className="o-hour-text m-0 mr-2">
                  Hora de inicio de la reunión
                </small>
                <div className="position-relative">
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

              <div className="col-sm-6 mr-0 d-flex">
                <small className="o-hour-text m-0 mr-2">
                  Hora de finalización de la reunión
                </small>
                <div className="position-relative">
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
            </div>

            <div className="row ml-2 mr-2 bg-white p-2 rounded">
              <div className="col-sm-8 mr-1">
                <MDBInput
                  type="textarea"
                  className="m-0 mr-0 rounded"
                  label="Descripción de la reunión"
                  id="o-hi2"
                  outline
                />
              </div>
              <div className="col p-4">
                <p className="m-0">Proyecto asociado</p>
                <div className="position-relative">
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
            </div>
          </div>
          <div className="col-12 col-sm-4 o-picker-cont">
            <div className="o-date-picker-container text-center">
              <DayPicker
                localeUtils={MomentLocaleUtils}
                className="o-date-picker-container"
                onDayClick={this.handleDayClick}
                selectedDays={this.state.selectedDate}
                locale="es"
                todayButton="Hoy"
                modifiers={{
                  foo: new Date(),
                }}
                onTodayButtonClick={(day, modifiers) =>
                  console.log(day, modifiers)
                }
              />
            </div>

            <div className="o-date-picker-container mt-2 p-4 d-flex flex-column">
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
  }
}

export default CreateEvents;
