import React, { Component } from "react";
import "./SearchTalents.css";
import CardTalents from "../../Elements/CardTalents/CardTalents";
import User from "../../../Logos/user-icon.png";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchTalents extends Component {
  constructor(props) {
    super(props);
    this.selectFilter = this.selectFilter.bind(this);
    this.state = {
      keyWord: "",
      modal: false,
      filter: "",
      talents: [
        {
          id: "1",
          name: "Juan Carlos Hurtado",
          description:
            "Ingeniero multimedia. Desarrollador FullStack con experiencia en desarrollo de aplicaciones web y móviles",
          jobs: [
            "Desarrollador Frontend",
            "Desarrollador Backend",
            "Desarrollador FullStack",
          ],
          img: User,
          skills: [
            {
              skill:
                "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/angular/angular-icon.svg",
            },
            { skill: "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg" },
            { skill: "https://cdn.worldvectorlogo.com/logos/javascript.svg" },
            {
              skill: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg",
            },
            {
              skill:
                "https://raw.githubusercontent.com/devicons/devicon/ac557d6ff33ff370a5db99f97aeab35ea5c67fbd/icons/css3/css3-original.svg",
            },
            { skill: "https://www.vectorlogo.zone/logos/php/php-icon.svg" },
            {
              skill:
                "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/mysql/mysql-official.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/golang/golang-official.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
            },
            { skill: "https://cdn.worldvectorlogo.com/logos/laravel-2.svg" },
            {
              skill: "https://www.vectorlogo.zone/logos/jquery/jquery-icon.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/getbootstrap/getbootstrap-icon.svg",
            },
            {
              skill: "https://cdn.worldvectorlogo.com/logos/material-ui-1.svg",
            },
            { skill: "https://cdn.worldvectorlogo.com/logos/rails.svg" },
            { skill: "https://cdn.worldvectorlogo.com/logos/figma-1.svg" },
          ],
        },
        {
          id: "2",
          name: "Andrés David Londoño",
          description:
            "Ingeniero multimedia. Desarrollador web. Senior en tecnologías para desarrollo fronend y backend con experiencia en desarrollo de aplicaciones web y móviles",
          jobs: ["Desarrollador Web", "Ui designer", "Desarrollador FullStack"],
          img: User,
          skills: [
            {
              skill:
                "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/angular/angular-icon.svg",
            },
            { skill: "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg" },
            {
              skill: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg",
            },
            {
              skill:
                "https://raw.githubusercontent.com/devicons/devicon/ac557d6ff33ff370a5db99f97aeab35ea5c67fbd/icons/css3/css3-original.svg",
            },
            { skill: "https://www.vectorlogo.zone/logos/php/php-icon.svg" },
            {
              skill:
                "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/mysql/mysql-official.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/golang/golang-official.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
            },
            {
              skill: "https://www.vectorlogo.zone/logos/jquery/jquery-icon.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/getbootstrap/getbootstrap-icon.svg",
            },
            {
              skill: "https://www.vectorlogo.zone/logos/python/python-icon.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/djangoproject/djangoproject-icon.svg",
            },
            {
              skill:
                "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg",
            },
            { skill: "https://cdn.worldvectorlogo.com/logos/dotnet.svg" },
            {
              skill: "https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg",
            },
            { skill: "https://cdn.worldvectorlogo.com/logos/redux.svg" },
            { skill: "https://cdn.worldvectorlogo.com/logos/android.svg" },
            {
              skill:
                "https://www.vectorlogo.zone/logos/ionicframework/ionicframework-icon.svg",
            },
            { skill: "https://cdn.worldvectorlogo.com/logos/c--4.svg" },
            { skill: "https://cdn.worldvectorlogo.com/logos/c.svg" },
            { skill: "https://cdn.worldvectorlogo.com/logos/c-2975.svg" },
            { skill: "https://cdn.worldvectorlogo.com/logos/java-14.svg" },
            {
              skill: "https://cdn.worldvectorlogo.com/logos/wordpress-blue.svg",
            },
          ],
        },
      ],
    };
  }

  selectFilter = (filter) => {
    this.setState({ filter: filter });
    //console.log(this.state.filter);
  };

  render() {
    return (
      <div className="p-2 mt-3">
        <div className="row">
          <div className="col-12 h4">Buscar talentos</div>
          <div className="col-12  mt-3">
            <div className="input-group mb-3 d-flex justify-content-center">
              <div className="input-group-prepend ">
                <label className="btn btn-primary text-white font-weight-bold m-0 z-depth-0 o-label-select p-0 o-filter-btn border-0 ">
                  <select className="text-white o-filter-btn o-select-filter  font-weight-bold">
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
  }
}

export default SearchTalents;
