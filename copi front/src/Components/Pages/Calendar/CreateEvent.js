import React, { Component } from "react";
import "./Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { MDBInput } from "mdbreact";

import 'react-day-picker/lib/style.css';

import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';

import 'moment/locale/es.js';
require('moment/locale/es.js');

class CreateEvents extends Component{
    constructor(props){
    super(props);
        this.state = {
            selectedDate: null,
            colors: []
        };
    }
    getRandomColor() {
        const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        return color;
    }
    render() {
        



        return (
            <div className="row" >
                <div className="col-12 col-xs-12 col-sm-8 o-create-event-container-form  text-center o-blue-container"  >
                    <div className="row ml-2 mr-2 bg-white p-2 rounded">
                        <div className="col-sm-10 mr-1">
                            <MDBInput className="m-0 mr-0" label="Título de la reunión" id="o-hi" outline />
                        </div>
                        <div className="col m-0 p-1">
                            <button type="button" className="btn btn-sm z-depth-0 btn-primary ml-0 mr-0 mt-4 text-light">Guardar</button>
                        </div>
                    </div>

                    <div className="form-row mr-2 ml-2  bg-white p-0 ">
                        <div className="ml-4 row">
                            <div className="form-check mr-4 ">
                                <input type="checkbox" className="form-check-input o-check" />
                                <label className="form-check-label">
                                    Repetir cada día
                              </label>
                            </div>
                            <div className="form-check mr-4">
                                <input type="checkbox" className="form-check-input o-check" />
                                <label className="form-check-label">
                                    Repetir cada semana
                              </label>
                            </div>
                            <div className="form-check mr-4">
                                <input type="checkbox" className="form-check-input o-check" />
                                <label className="form-check-label">
                                    Repetir cada mes
                              </label>
                            </div>
                            <div className="form-check mr-4">
                                <input type="checkbox" className="form-check-input o-check" />
                                <label className="form-check-label">
                                    Repetir cada año
                              </label>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div className="row ml-2 mr-2 bg-white p-2 rounded">
                        <div className="col-sm-3 mr-0">
                            <p className="o-hour-text">Hora de inicio del reunión</p>
                        </div>
                        <div className="col-sm-3 mr-0">
                            <select className="custom-select m-0 o-project-select" id="inputGroupSelect04">
                                <option className="o-project-select" selected>Seleccionar</option>
                                <option className="o-project-select" value="1">One</option>
                                <option className="o-project-select" value="2">Two</option>
                                <option className="o-project-select" value="3">Three</option>
                            </select>
                        </div>
                        <div className="col-sm-3 mr-0">
                            <p className="o-hour-text m-0">Hora de finalización del reunión</p>
                        </div>
                        <div className="col-sm-3 mr-0">
                            <select className="custom-select m-0 o-project-select" id="inputGroupSelect04">
                                <option className="o-project-select" selected>Seleccionar</option>
                                <option className="o-project-select" value="1">One</option>
                                <option className="o-project-select" value="2">Two</option>
                                <option className="o-project-select" value="3">Three</option>
                            </select>
                        </div>
                    </div>

                    <div className="row ml-2 mr-2 bg-white p-2 rounded">
                        <div className="col-sm-8 mr-1">
                            <MDBInput type="textarea" className="m-0 mr-0 rounded" label="Descripción de la reunión" id="o-hi2" outline />
                        </div>
                        <div className="col p-4">
                            <p className="m-0">Proyecto asociado</p>
                            <select className="custom-select m-0 o-project-select" id="inputGroupSelect04">
                                <option className="o-project-select" selected>Seleccionar</option>
                                <option className="o-project-select" value="1">One</option>
                                <option className="o-project-select" value="2">Two</option>
                                <option className="o-project-select" value="3">Three</option>
                            </select>
                        </div>
                    </div>

                    <div className=" row ml-2 mr-2 mt-2 bg-white p-2 rounded">
                        <div className="row col-12">
                            <p className="ml-3 ">Integrantes del evento</p>
                        </div>
                        <div className="row col-12">
                            <div className=" col-12 col-sm-6">
                                <input
                                    type="text"
                                    className="form-control bg-transparen mt-2 ml-4 o-project-text-select "
                                    id="userPassword"
                                    aria-label="Large"
                                    placeholder="Agregar integrante"
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control bg-transparen mt-2 ml-4 o-project-text-select "
                                    id="userPassword"
                                    aria-label="Large"
                                    placeholder="Agregar rol"
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-3 o-picker-cont ml-1 o-blue-container" >
                    <div className="o-date-picker-container text-center">
                        <DayPicker localeUtils={MomentLocaleUtils} className="o-date-picker-container" onDayClick={this.handleDayClick} selectedDays={this.state.selectedDate}
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

export default CreateEvents;