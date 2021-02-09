import React, { Component } from "react";
import "./SearchTalents.css";
import CardTalents from "../../Elements/CardTalents/CardTalents";
import User from "../../../Logos/user-icon.png";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

class SearchTalents extends Component {
  constructor(props) {
    super(props);
    this.selectFilter = this.selectFilter.bind(this);
    this.state = {
      keyWord: "",
      modal: false,
      filter: "",
      fetched: false,
      talents: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("login");
    const talentslist = [];
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
      .get("talentos")
      .then((respuesta) => {
        if (respuesta.statusText === "OK") {
          for (let i = 0; i < respuesta.data.data.length; i++) {
            const picture = respuesta.data.data[i].foto.split("/");
            const talentpicture =
              picture[6] !== "null" ? respuesta.data.data[i].foto : User;
            const talentdescription =
              respuesta.data.data[i].descripcion !== null &&
              respuesta.data.data[i].descripcion !== "null"
                ? respuesta.data.data[i].descripcion
                : "Sin descripción";
            talentslist.push({
              id: respuesta.data.data[i].userid,
              name: respuesta.data.data[i].nombre,
              description: talentdescription,
              jobs: respuesta.data.data[i].palabras,
              img: talentpicture,
              skills: respuesta.data.data[i].herramientas,
            });
            this.setState({ talents: [...talentslist] });
          }
          this.setState({ fetched: true });
        } else {
          console.log("error fatal");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  selectFilter = (filter) => {
    this.setState({ filter: filter });
  };

  render() {
    if (this.state.fetched) {
      return (
        <div className="p-2 mt-3">
          <div className="row">
            <div className="col-12 h4">Buscar talentos</div>
            <div className="col-12  mt-3">
              <div className="input-group mb-3 d-flex justify-content-center">
                <div className="input-group-prepend ">
                  <label className="btn btn-primary text-white font-weight-bold m-0 z-depth-0 o-label-select p-0 o-filter-btn border-0 ">
                    <select
                      className="text-white o-filter-btn o-select-filter  font-weight-bold"
                      onChange={(e) => this.selectFilter(e.target.value)}
                    >
                      <option value="Nombre" defaultValue="selected">
                        Nombre
                      </option>
                      <option value="Herramienta">Herramienta</option>
                      <option value="Ocupación">Ocupación</option>
                    </select>
                  </label>
                </div>
                <input
                  type="text"
                  className="form-control m-0 o-talents-search-input"
                  placeholder="Buscar.."
                  aria-label="Palabra clave"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary text-white m-0 z-depth-0 o-talent-search-btn border-0"
                    type="button"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </div>
            <div className="o-card-talents-container w-100">
              {this.state.talents.map((talent) => (
                <CardTalents key={talent.id} talent={talent} />
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

export default SearchTalents;
