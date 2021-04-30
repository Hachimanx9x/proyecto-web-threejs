import React, { Component } from "react";
import moment from "moment";
import { faSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "react-day-picker/lib/style.css";

import FullCalendar from "@fullcalendar/react";
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
    this.state = {
      events: [],
      selectedDate: null,
      colors: [,],
      error: false,
      fetched: false,
    };
  }
  componentDidMount = () => {
    const token = localStorage.getItem("login");
    const obj = JSON.parse(token);
    const events = [];
    const colors = [];

    const tokensito = obj.token;
    const options = {
      headers: { authorization: `llave ${tokensito}` },
    };
    try {
      axios
        .get(`http://localhost:3030/calendario`, options)
        .then((respuesta) => {
          for (let i = 0; i < respuesta.data.length; i++) {
            const element = respuesta.data[i];
            if (element.start !== "NaN:NaN" && element.end !== "NaN:NaN") {
              const color =
                "#" + Math.floor(Math.random() * 16777215).toString(16);
              let temp = element.fecha.split("/");
              const date = temp[2] + "/" + temp[1] + "/" + temp[0];
              const start = new Date(date + " " + element.start);
              const end = new Date(date + " " + element.end);
              events.push({
                title: element.titulo,
                start: start,
                end: end,
                color: color,
                allDay: true,
              });
              colors.push(color);
            }
          }
          this.setState({ colors: colors, events: events, fetched: true });
        });
    } catch (error) {
      console.error(error);
    }
  };
  handleDayClick = (day, { selected }) => {
    if (!selected) {
      this.setState({
        selectedDate: day,
      });
    }
  };

  createEvent = () => {
    if (this.state.selectedDate != null) {
      localStorage.setItem("date", this.state.selectedDate);
      this.props.history.push("/Dashboard/Calendar/CreateEvent");
    } else {
      this.setState({ error: true });
    }
  };
  render() {
    if (this.state.fetched) {
      return (
        <div className="row mb-3 mb-sm-0 pb-5 pb-sm-0">
          <div className="col-12 col-sm-8 o-calendar-container  text-center">
            {" "}
            <FullCalendar
              headerToolbar={{
                left: "prev,next,today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              }}
              eventClick={() => {
                this.props.history.push("/Dashboard/Meetings");
              }}
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
              initialView="dayGridMonth"
              events={this.state.events}
              locale={esLocale}
            />
          </div>
          <div className="col-12 col-sm-3 o-picker-cont ml-1 o-blue-container">
            <button
              className={
                (this.state.selectedDate === null ? "disabled " : "") +
                "btn z-depth-1 rounded-pill  border-0 btn-primary text-capitalize text-default text-white"
              }
              type="button"
              onClick={this.createEvent}
            >
              <FontAwesomeIcon className="mr-2" icon={faPlus} />
              Crear evento
            </button>

            <div
              className="o-date-picker-container text-center "
              style={this.state.error ? { border: "1px solid red" } : {}}
            >
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
              <small
                className={
                  (this.state.error ? "" : "invisible ") +
                  "text-danger font-weight-bold"
                }
              >
                Selecciona una fecha
              </small>
            </div>
            <p className="o-text-events">Eventos programados</p>
            <div className="o-date-picker-container pl-3 pt-3">
              {this.state.events.length !== 0 ? (
                this.state.events.map((event, i) => (
                  <p key={i}>
                    <FontAwesomeIcon
                      icon={faSquare}
                      color={this.state.colors[i]}
                      className="mr-2"
                    />
                    {event.title}
                  </p>
                ))
              ) : (
                <div className="d-flex h-100">
                  <p className="m-auto text-secondary">
                    No hay reuniones agendadas
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Cargando....</div>;
    }
  }
}
