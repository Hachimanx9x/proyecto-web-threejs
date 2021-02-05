import React, { Component } from "react";
import "./Desktop.css";
import CardDesktop from "../../Elements/CardDesktop/CardDesktop";
import Carousel from "react-elastic-carousel";
import ProjectPicture from "../../../ilustracion-equipo-de-trabajo.jpg";
import { MDBNotification } from "mdbreact";
import { Radar, defaults } from "react-chartjs-2";
import axios from 'axios';
defaults.global.legend.display = false;

class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      color: "#80BD01",
      bgcolor: "#CFEC92",
      datagraph: [65, 59, 0, 0, 0, 0, 0],
      updates: [
        {
          userName: "Juan Carlos Hurtado",
          projectName: "Desarrollo de videojuegos RV",
          activity: "A1",
          date: "13/01/2020",
          hour: "11:30",
          fileName: "foto.png",
          fileUrl:
            "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png",
        },
        {
          userName: "Juan Carlos Hurtado",
          projectName: "Desarrollo de videojuegos RV",
          activity: "A1",
          date: "13/01/2020",
          hour: "11:30",
          fileName: "foto.png",
          fileUrl:
            "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png",
        },
        {
          userName: "Juan Carlos Hurtado",
          projectName: "Desarrollo de videojuegos RV",
          activity: "A1",
          date: "13/01/2020",
          hour: "11:30",
          fileName: "foto.png",
          fileUrl:
            "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png",
        },
      ],
    };
  }
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
      .get("proyectos")
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
  render() {
    //#bc8a01 eaea91
    const data = {
      labels: ["Oportunidad", "Valor sm", "", "", "", "", ""],
      datasets: [
        {
          backgroundColor: this.state.bgcolor,
          borderColor: this.state.color,
          pointBackgroundColor: this.state.color,
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: this.state.datagraph,
        },
      ],
    };
    return (
      <div className="row mb-5 mb-sm-0 pb-5 pb-sm-0">
        <div className="col-12 col-xs-12 col-sm-8 o-blue-container o-updates-section">
          <h4 className="mb-3 pl-4">Actualizaciones</h4>
          <div className="o-updates-container">
            <MDBNotification />
            {this.state.updates.map((update, i) => (
              <CardDesktop update={update} key={i} />
            ))}
          </div>
        </div>
        <div className="col-12 col-sm-3 ml-1 o-blue-container o-slider-container">
          <div className="bg-white rounded p-0 pr-1 pl-1 mb-2 mt-2">
            <Carousel
              itemsToShow={1}
              onChange={(currentItem) => {
                const item = currentItem;
                alert(item.item.alt);
              }}
            >
              <a href="https://www.google.com">
                <img
                  src={ProjectPicture}
                  alt="project logo"
                  key="your mom"
                  className="o-slider-img"
                />
              </a>
              <img
                src={ProjectPicture}
                alt="project logo"
                className="o-slider-img"
              />
              <img
                src={ProjectPicture}
                alt="project logo"
                className="o-slider-img"
              />
              <img
                src={ProjectPicture}
                alt="project logo"
                className="o-slider-img"
              />
            </Carousel>
          </div>
          <div className="bg-white rounded p-1 mb-2 mt-2 text-center">
            <Radar data={data} />
            <button
              onClick={() => {
                this.setState({
                  bgcolor: "#CFEC92",
                  color: "#80BD01",
                  datagraph: [65, 59, 0, 0, 0, 0, 0],
                });
              }}
              className="o-btn-graph rounded text-success border-success font-weight-bold mt-4 z-depth-0"
            >
              Sistema multimedia mínimo viable
            </button>
            <button
              onClick={() => {
                this.setState({
                  bgcolor: "#eaea91",
                  color: "#bc8a01",
                  datagraph: [75, 99, 0, 0, 0, 0, 0],
                });
              }}
              className="o-btn-graph bg-warning rounded text-white border-0 font-weight-bold mt-2 z-depth-0"
            >
              Concebir la experiencia multimedia
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Desktop;
