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
import "./Calendar.css";
require("moment/locale/es.js");

export default class CalendarEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          start: moment().toDate(),
          end: moment().add(1, "days").toDate(),
          title: "Some title",
        },
        {
          title: "Reunión avances",
          start: new Date("2021-02-11 12:22"),
          end: new Date("2021-02-13 13:42"),
        },
        {
          title: "Computación",
          start: new Date("2021-02-21 12:22"),
          end: new Date("2021-02-23 13:42"),
        },
        {
          title: "Reunión avances",
          start: new Date("2021/02/18 12:22:00"),
          end: new Date("2021/02/18 13:42:00"),
        },
      ],
      selectedDate: null,
      colors: [],
      error: false,
      fetched: false,
    };
  }

  componentDidMount() {
    let temcolors = [];
    let temvents = [];
    for (let i = 0; i < this.state.events.length; i++) {
      const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      temcolors.push(color);
      temvents.push({
        title: this.state.events[i].title,
        start: this.state.events[i].start,
        end: this.state.events[i].end,
        color: color,
      });
    }
    this.setState({ colors: temcolors, fetched: true, events: temvents });
  }

  handleDayClick = (day, { selected }) => {
    this.setState({
      selectedDate: selected ? undefined : day,
    });
    localStorage.setItem("date", this.state.selectedDate);
    const date = this.state.selectedDate;
    console.log(date);
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
            <div className="o-date-picker-container pt-3">
              {this.state.events.map((event, i) => (
                <p key={i} className="ml-3 d-block">
                  <FontAwesomeIcon
                    icon={faSquare}
                    color={this.state.colors[i]}
                    className="mr-2 "
                  />
                  {event.title}
                </p>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Cargando....</div>;
    }
  }
}
