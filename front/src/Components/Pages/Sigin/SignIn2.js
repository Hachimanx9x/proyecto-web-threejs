import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import axios from 'axios';
import "./SignIn2.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

class SigIn extends Component {
    constructor() {
        super();
        this.state = { name: "", email: "", password: "", confirmpassword: "" };
        this.RegisterFunction = this.RegisterFunction.bind(this);

        this.httpInstance = axios.create({
            baseURL: "http://localhost:3030/",
            timeout: 1000,
            headers: { 'Content-Type': 'application/json' }
        });
        this.httpInstance.interceptors.response.use(null, error => {
            const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
            if (!expectedError) {
                // Loggear mensaje de error a un servicio como Sentry
                // Mostrar error genérico al usuario
                return Promise.reject(error);
            }
        }
        );
    }


    RegisterFunction = () => {

        const { correo, password } = this.state;
        console.log(`El correo es ${correo} y la contraseña es ${password}`);


        //------
        this.httpInstance.post('login', { correo, password }).then(respuesta => {
            if (respuesta.statusText === "OK") {
                console.log(respuesta.data);
                localStorage.setItem(
                    "login",
                    JSON.stringify({
                        token: respuesta.data.token,
                    })
                );

                this.props.history.push("/Dashboard/Desktop");
            } else {
                console.log("error fatal")
            }

        }).catch(error => {
            console.error(error);
        })


    };

    render() {
        return (
            <div className="container-fluid o-sigin-container h-100">
                <div className="o-sigin-form">
                    <form>
                        <h3 className="text-white m-0">El mejor lugar</h3>
                        <h3 className="text-white m-0">Para tu trabajar con tu equipo</h3>
                        <p className="mt-2 mb-8 text-white font-weight-bold ">
                            Bienvenido, por favor registrate
                            </p>
                        <div className="row">
                            <div className="form-group col-md-12 input-group-lg">
                                <label className="font-weight-bold text-info">
                                    Nombre
                                    </label>
                                <MDBInput onChange={(event) => {
                                    this.setState({ name: event.target.value });
                                }} label="Nombre" className="o-sigin-input text-white" type="text" icon="user" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-12 input-group-lg">
                                <label className="font-weight-bold text-info">
                                    Correo
                                    </label>
                                <MDBInput onChange={(event) => {
                                    this.setState({ correo: event.target.value });
                                }} label="Correo" className="o-sigin-input text-white" type="email" icon="envelope" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-12 input-group-lg">
                                <label  className="font-weight-bold text-info">
                                    Contraseña
                                    </label>
                                <MDBInput onChange={(event) => {
                                    this.setState({ password: event.target.value });
                                }} label="Correo" className="o-sigin-input text-white" type="email" icon="lock" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-md-12 input-group-lg">
                                <label  className="font-weight-bold text-info">
                                    Confirmar contraseña
                                    </label>
                                <MDBInput onChange={(event) => {
                                    this.setState({ confirmpassword: event.target.value });
                                }} label="Confirmar contraseña" className="o-sigin-input text-white" type="password" icon="lock" />
                            </div>
                        </div>
                        <div className="form-row">
                            
                            <div className="col-12 d-flex justify-content-end">
                                <a className="text-info text-right o-sigin-text font-weight-bold " href="/Login">
                                    ¿Ya tienes cuenta? Ingresa con ella.
                                    </a>
                            </div>
                        </div>
                        <div className="row ml-1">
                            <div className="col-6">
                                <button
                                    className=" blue accent-4 z-depth-0 text-light ml-0 mr-0 mt-4 font-weight-bold o-button"
                                    type="button"
                                    onClick={this.RegisterFunction}
                                >
                                    REGISTRARSE
                                </button>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                <a
                                    className=" btn-white z-depth-0 mt-4 text-primary font-weight-bold mr-0 o-button"
                                    href="/Login"
                                    role="button"
                                >
                                    CANCELAR
                                 </a>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SigIn;