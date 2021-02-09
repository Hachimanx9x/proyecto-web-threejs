import React, { Component } from "react";
import moment from "moment";
import { faSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "react-day-picker/lib/style.css";

import FullCalendar from "@fullcalendar/react";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import timeGridPlugin from "@fullcalendar/timegrid";

import DayPicker from "react-day-picker";
import MomentLocaleUtils from "react-day-picker/moment";

import "moment/locale/es.js";
import axios from "axios";
import "./Calendar.css";
require("moment/locale/es.js");

export default class CalendarEvents extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.state = {
      events: [
        {
          start: moment().toDate(),
          end: moment().add(1, "days").toDate(),
          title: "Some title",
        },
        {
          title: "Reunión avances",
          start: new Date("2020-11-11 11:15:00"),
          end: new Date("2020-11-11 11:30:00"),
        },
        {
          title: "Computación",
          start: new Date("2020-11-15 12:22:00"),
          end: new Date("2020-11-15 13:42:00"),
        },
        {
          title: "Reunión avances",
          start: new Date("2020/11/18 12:22:00"),
          end: new Date("2020/11/18 13:42:00"),
        },
      ],
      selectedDate: null,
      colors: [],
    };
  }
  /*
    componentWillUnmount() {
        //Inicia consulta

        //Cierra consulta
        let colors;
        for (let i = 0; i < this.state.events; i++) {
            const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
            colors.push(color);
            this.setState({ colors: colors });
        }
       
        console.log(this.state.colors);
    }*/

  componentDidMount() {
    const token = localStorage.getItem("login");
    const obj = JSON.parse(token);
    const tokensito = obj.token;
    const httpInstance = axios.create({
      baseURL: "http://localhost:3030/",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
        authorization: `llave ${tokensito}`,
      },
    }); //

    httpInstance.interceptors.response.use(null, (error) => {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
      if (!expectedError) {
        // Loggear mensaje de error a un servicio como Sentry
        // Mostrar error genérico al usuario
        return Promise.reject(error);
      }
    });
    //------
    httpInstance
      .get("calendario")
      .then((respuesta) => {
        if (respuesta.statusText === "OK") {
          console.log(respuesta.data);
        } else {
          console.log("error fatal");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  handleDayClick(day, { selected }) {
    this.setState({
      selectedDate: selected ? undefined : day,
    });
    const date = this.state.selectedDate;
    console.log(date);
  }
  createEvent() {
    if (this.state.selectedDate != null) {
      console.log(this.state.selectedDate.toLocaleDateString());
      this.props.history.push("/Dashboard/Calendar/CreateEvent");
    } else {
      console.log("Nay and gg");
    }
  }
  getRandomColor() {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return color;
  }
  render() {
    return (
      <div className="row mb-3 mb-sm-0 pb-5 pb-sm-0">
        <div className="col-12 col-sm-8 o-calendar-container  text-center">
          <FullCalendar
            headerToolbar={{
              left: "prev,next,today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            eventClick={() => {
              this.props.history.push("/Dashboard/Meetings");
            }}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              bootstrapPlugin,
            ]}
            themeSystem={"bootstrap"}
            events={this.state.events}
            locale={esLocale}
          />
        </div>
        <div className="col-12 col-sm-3 o-picker-cont ml-1 o-blue-container">
          <div className="row bg-white o-create-event-container  mr-1 ml-1 ">
            <div className="col-12 col-sm-8 ">
              <p className="text-primary ">Crear evento</p>
            </div>
            <div className="col text-right m-0 p-0 ">
              <button
                className="m-0 bg-primary rounded-circle text-white"
                style={{
                  border: "none",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
                type="button"
                onClick={this.createEvent}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

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
          <p className="o-text-events">Eventos programados</p>
          <div className="o-date-picker-container">
            <p>
              <FontAwesomeIcon
                icon={faSquare}
                color={this.getRandomColor()}
                className="mr-2"
              />
              Reunión avances
            </p>
            <p>
              <FontAwesomeIcon
                icon={faSquare}
                color={this.getRandomColor()}
                className="mr-2"
              />
              Computación
            </p>
          </div>
        </div>
      </div>
    );
  }
}
