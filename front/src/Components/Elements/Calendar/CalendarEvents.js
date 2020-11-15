import React, { Component } from "react";
import moment from "moment";
import "./Calendar.css";
import { faSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-day-picker/lib/style.css';

import FullCalendar from '@fullcalendar/react';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import timeGridPlugin from "@fullcalendar/timegrid";

import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';

import 'moment/locale/es.js';
require('moment/locale/es.js');


export default class CalendarEvents extends Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.bruh = this.bruh.bind(this);
        this.state = {
            events: [
                {
                    start: moment().toDate(),
                    end: moment()
                        .add(1, "days")
                        .toDate(),
                    title: "Some title"
                },
                {
                    title: "Reunión avances",
                    start: new Date('2020-11-11 11:15:00'),
                    end: new Date('2020-11-11 11:30:00')
                },
                {
                    title: "Computación",
                    start: new Date('2020-11-15 12:22:00'),
                    end: new Date('2020-11-15 13:42:00')
                },
                {
                    title: "Reunión avances",
                    start: new Date('2020/11/18 12:22:00'),
                    end: new Date('2020/11/18 13:42:00')
                }
            ],
            selectedDate: null,
            colors: []
        };
    }
    /*
    componentWillUnmount() {
        //Inicia consulta

        //Cierra consulta
        var colors;
        for (var i = 0; i < this.state.events; i++) {
            var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
            colors.push(color);
            this.setState({ colors: colors });
        }
       
        console.log(this.state.colors);
    }*/
    handleDayClick(day, { selected }) {


        this.setState({
            selectedDate: selected ? undefined : day,
        });
        var date = this.state.selectedDate;
        console.log(date);


    }
    bruh() {
        if (this.state.selectedDate != null) {
            console.log(this.state.selectedDate.toLocaleDateString())
        } else {
            console.log("Nay and gg");
        }
    }
    getRandomColor() {
        var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return color;
    }
    render() {
        return (
            <div className="row" >
                <div className="col-12 col-sm-9  text-center"  >
                    <FullCalendar

                        headerToolbar={{
                            left: "prev,next,today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                        }}
                        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, bootstrapPlugin]}
                        themeSystem={"bootstrap"}
                        events={this.state.events}
                        locale={esLocale}

                    />
                </div>
                <div className="col o-blue-container" >
                    <div className="row bg-white o-create-event-container  mr-1 ml-1 ">
                        <div className="col-12 col-sm-8 ">
                            <p className="text-primary ">Crear evento</p>
                        </div>
                        <div className="col text-right m-0 p-0 ">
                            <button className="btn m-0 btn-primary rounded-circle text-right" type="button" onClick={this.bruh} ><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                    </div>

                    <div className="o-date-picker-container text-center">
                        <DayPicker localeUtils={MomentLocaleUtils} onDayClick={this.handleDayClick} selectedDays={this.state.selectedDate}
                            locale="es" todayButton="Hoy"
                            modifiers={{
                                foo: new Date(),
                            }} onTodayButtonClick={(day, modifiers) => console.log(day, modifiers)} />
                    </div>
                    <p className="o-text-events">Eventos programados</p>
                    <div className="o-date-picker-container">
                        <p><FontAwesomeIcon icon={faSquare} color={this.getRandomColor()} className="mr-2" />Reunión avances</p>
                        <p><FontAwesomeIcon icon={faSquare} color={this.getRandomColor()} className="mr-2" />Computación</p>
                    </div>

                </div>
            </div>
        );
    }
}

