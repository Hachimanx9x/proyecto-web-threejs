import React, { Component } from "react";
import "./Contacts.css";
import SwitchSelector from "react-switch-selector";
import axios from "axios";
import User from "../../../Logos/user-icon.png";
import { faHeart, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardContacts from "../../Elements/CardContacts/CardContacts";
import CardTalents from "../../Elements/CardTalents/CardTalents";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.selectFilter = this.selectFilter.bind(this);
    this.search = this.search.bind(this);
    this.showFavorite = this.showFavorite.bind(this);
    this.changefavorite = this.changefavorite.bind(this);
    this.addTalent = this.addTalent.bind(this);
    this.deleteContact = this.deleteContact.bind(this);

    this.state = {
      keyWord: "",
      filter: "Contactos",
      favorites: false,
      show: [
        {
          id: "1",
          jobs: [
            "Desarrollador FullStack",
            "Desarrollador Frontend",
            "Desarrollador Backend",
          ],
          urlimage: User,
          name: "Accel",
          description:
            "Programador e ingeniero multimedia con experiencia en entorno web",
          favorite: false,
          skills: [
            "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",

            "https://www.vectorlogo.zone/logos/angular/angular-icon.svg",

            "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg",
            "https://upload.vectorlogo.zone/logos/javascript/images/239ec8a4-163e-4792-83b6-3f6d96911757.svg",
          ],
        },
        {
          id: "2",
          jobs: ["Ui designer", "Diseñador gráfico", "Diseñador Web"],
          urlimage: User,
          name: "Juan Carlos",
          description:
            "Programador e ingeniero multimedia con experiencia en entorno web",
          favorite: true,
          skills: [
            "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
            ,
            "https://www.vectorlogo.zone/logos/angular/angular-icon.svg",
            ,
            "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg",

            "https://upload.vectorlogo.zone/logos/javascript/images/239ec8a4-163e-4792-83b6-3f6d96911757.svg",
            ,
          ],
        },
      ],
      talents: [
        {
          id: "3",
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
            "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",

            "https://www.vectorlogo.zone/logos/angular/angular-icon.svg",

            "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg",

            "https://upload.vectorlogo.zone/logos/javascript/images/239ec8a4-163e-4792-83b6-3f6d96911757.svg",

            "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",

            "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg",

            "https://raw.githubusercontent.com/devicons/devicon/ac557d6ff33ff370a5db99f97aeab35ea5c67fbd/icons/css3/css3-original.svg",

            "https://www.vectorlogo.zone/logos/php/php-icon.svg",

            "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg",

            "https://www.vectorlogo.zone/logos/mysql/mysql-official.svg",

            "https://www.vectorlogo.zone/logos/golang/golang-official.svg",

            "https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg",

            "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",

            "https://cdn.worldvectorlogo.com/logos/laravel-2.svg",

            "https://www.vectorlogo.zone/logos/jquery/jquery-icon.svg",

            "https://www.vectorlogo.zone/logos/getbootstrap/getbootstrap-icon.svg",

            "https://cdn.worldvectorlogo.com/logos/material-ui-1.svg",

            "https://cdn.worldvectorlogo.com/logos/rails.svg",
            "https://cdn.worldvectorlogo.com/logos/figma-1.svg",
          ],
        },
        {
          id: "4",
          name: "Andrés David Londoño",
          description:
            "Ingeniero multimedia. Desarrollador web. Senior en tecnologías para desarrollo fronend y backend con experiencia en desarrollo de aplicaciones web y móviles",
          jobs: ["Desarrollador Web", "Ui designer", "Desarrollador FullStack"],
          img: User,
          skills: [
            "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",

            "https://www.vectorlogo.zone/logos/angular/angular-icon.svg",

            "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg",

            "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",

            "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg",

            "https://raw.githubusercontent.com/devicons/devicon/ac557d6ff33ff370a5db99f97aeab35ea5c67fbd/icons/css3/css3-original.svg",

            "https://www.vectorlogo.zone/logos/php/php-icon.svg",

            "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg",

            "https://www.vectorlogo.zone/logos/mysql/mysql-official.svg",

            "https://www.vectorlogo.zone/logos/golang/golang-official.svg",

            "https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg",

            "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",

            "https://www.vectorlogo.zone/logos/jquery/jquery-icon.svg",

            "https://www.vectorlogo.zone/logos/getbootstrap/getbootstrap-icon.svg",

            "https://www.vectorlogo.zone/logos/python/python-icon.svg",

            "https://www.vectorlogo.zone/logos/djangoproject/djangoproject-icon.svg",

            "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg",

            "https://cdn.worldvectorlogo.com/logos/dotnet.svg",

            "https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg",

            "https://cdn.worldvectorlogo.com/logos/redux.svg",
            "https://cdn.worldvectorlogo.com/logos/android.svg",

            "https://www.vectorlogo.zone/logos/ionicframework/ionicframework-icon.svg",

            "https://cdn.worldvectorlogo.com/logos/c--4.svg",
            "https://cdn.worldvectorlogo.com/logos/c.svg",
            "https://cdn.worldvectorlogo.com/logos/c-2975.svg",
            "https://cdn.worldvectorlogo.com/logos/java-14.svg",

            "https://cdn.worldvectorlogo.com/logos/wordpress-blue.svg",
          ],
        },
      ],
      contacts: [
        {
          id: "1",
          jobs: [
            "Desarrollador FullStack",
            "Desarrollador Frontend",
            "Desarrollador Backend",
          ],
          urlimage: User,
          name: "Accel",
          description:
            "Programador e ingeniero multimedia con experiencia en entorno web",
          favorite: false,
          skills: [
            "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",

            "https://www.vectorlogo.zone/logos/angular/angular-icon.svg",

            "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg",

            "https://upload.vectorlogo.zone/logos/javascript/images/239ec8a4-163e-4792-83b6-3f6d96911757.svg",
            ,
          ],
        },
        {
          id: "2",
          jobs: ["Ui designer", "Diseñador gráfico", "Diseñador Web"],
          urlimage: User,
          name: "Juan Carlos",
          description:
            "Programador e ingeniero multimedia con experiencia en entorno web",
          favorite: true,
          skills: [
            "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",

            "https://www.vectorlogo.zone/logos/angular/angular-icon.svg",
            "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg",

            "https://upload.vectorlogo.zone/logos/javascript/images/239ec8a4-163e-4792-83b6-3f6d96911757.svg",
          ],
        },
      ],
    };
  }
  /* 
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
      .get("contactos")
      .then((respuesta) => {
        if (respuesta.statusText === "OK") {
          console.log(respuesta.data.contactos);
          /*
          for (let i = 0; i < respuesta.data.contactos.length; i++) {
            const picture = respuesta.data.contactos[i].foto.split("/");
            const contactpicture =
              picture[6] !== "null" ? respuesta.data.contactos[i].foto : User;
            const contactdescription =
              respuesta.data.contactos[i].description !== null &&
              respuesta.data.contactos[i].description !== "null"
                ? respuesta.data.contactos[i].descripcion
                : "Sin descripción";
            talentslist.push({
              id: respuesta.data.contactos[i].userid,
              jobs: respuesta.data.contactos[i].palabras,
              urlimage: contactpicture,
              name: respuesta.data.contactos[i].nombre,
              description: contactdescription,
              favorite: respuesta.data.contactos[i].preferencia === 0 ? false : true,
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
*/
  selectFilter = (filter) => {
    const { talents, contacts } = this.state;
    if (filter === "Talentos") {
      this.setState({ favorites: false, show: [...talents] });
    } else {
      this.setState({ show: [...contacts] });
    }
    this.setState({ filter: filter });
  };

  search = () => {
    const { contacts, talents, filter, keyWord } = this.state;
    const show = [];
    if (keyWord.trim() !== "") {
      if (filter === "Contactos") {
        for (let i = 0; i < contacts.length; i++) {
          const contact = contacts[i];
          const contain = contact.jobs.some((job) =>
            job.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
          );
          contain ? show.push(contact) : console.log("D :");
        }
      } else {
        for (let i = 0; i < talents.length; i++) {
          const talent = talents[i];
          const contain = talent.jobs.some((job) =>
            job.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
          );
          contain ? show.push(talent) : console.log("D :");
        }
      }
      this.setState({ show: [...show] });
    }
  };

  showFavorite = () => {
    this.state.filter === "Contactos"
      ? console.log()
      : this.setState({ filter: "Contactos" });
    const favorites = this.state.favorites;
    let show = [];

    if (!favorites) {
      const { contacts } = this.state;
      for (let i = 0; i < contacts.length; i++) {
        contacts[i].favorite
          ? show.push(contacts[i])
          : console.log(this.state.filter);
      }
    } else {
      show = [...this.state.contacts];
    }
    this.setState({ show: [...show], favorites: !favorites });
  };

  changefavorite(contact) {
    const { contacts, show } = this.state;
    const item = contacts.find((iterador) => iterador.id === contact.id);
    const item2 = show.find((iterador) => iterador.id === contact.id);
    if (item) {
      const favorite = contact.favorite;
      item.favorite = !favorite;
      item2.favorite = !favorite;

      this.setState({ contacts: [...contacts], show: [...show] });
    }
  }
  deleteContact = async (contact) => {
    const { talents, contacts } = this.state;
    const token = localStorage.getItem("login");
    const item = contacts.find((iterador) => iterador.id === contact.id);
    const item2 = contacts.findIndex((iterador) => iterador.id === contact.id);

    if (item) {
      talents.push({
        id: item.id,
        name: item.name,
        description: item.description,
        jobs: item.jobs,
        img: item.urlimage,
        skills: item.skills,
      });
      contacts.splice(item2, 1);
    }

    if (contacts.length === 0) {
      setTimeout(() => {
        this.setState({
          show: [...contacts],
        });
      }, 1000);
    }
    this.setState({
      contacts: [...contacts],
      talents: [...talents],
    });

    try {
      const obj = JSON.parse(token);
      const tokensito = obj.token;
      const options = {
        headers: { authorization: `llave ${tokensito}` },
      };

      const { data } = await axios.post(
        `http://localhost:3030/agregar/contacto`,
        {
          usuario: contact.id,
          preferencia: false,
        },
        options
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  addTalent = async (talent) => {
    const { talents, contacts } = this.state;
    const token = localStorage.getItem("login");
    const item = talents.find((iterador) => iterador.id === talent.id);
    const item2 = talents.findIndex((iterador) => iterador.id === talent.id);

    if (item) {
      contacts.push({
        id: item.id,
        jobs: item.jobs,
        urlimage: item.img,
        name: item.name,
        description: item.description,
        favorite: false,
        skills: item.skills,
      });
      talents.splice(item2, 1);
    }

    if (talents.length === 0) {
      setTimeout(() => {
        this.setState({
          show: [...contacts],
        });
      }, 1000);
    }
    this.setState({
      talents: [...talents],
      contacts: [...contacts],
    });
    try {
      const obj = JSON.parse(token);
      const tokensito = obj.token;
      const options = {
        headers: { authorization: `llave ${tokensito}` },
      };

      const { data } = await axios.post(
        `http://localhost:3030/agregar/contacto`,
        {
          usuario: talent.id,
          preferencia: false,
        },
        options
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const options = [
      {
        label: "Contactos",
        value: "Contactos",
        selectedBackgroundColor: "#4285F4",
      },
      {
        label: "Talentos",
        value: "Talentos",
        selectedBackgroundColor: "#4285F4",
      },
    ];
    const initialSelectedIndex = options.findIndex(
      ({ value }) => value === this.state.filter
    );

    return (
      <div className="o-contact-talents">
        <h4>Contactos guardados</h4>
        <section className="w-100 d-flex justify-content-end ">
          <div className="o-bg-blue w-100 d-flex flex-wrap-reverse">
            <div id="SearchBar">
              <p
                className="align-text-c enter mb-2"
                style={{ fontSize: "0.8rem" }}
              >
                Profesión
              </p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control m-0 o-rounded-input"
                  placeholder="Palabra clave"
                  aria-label="Palabra clave"
                  onChange={(e) => this.setState({ keyWord: e.target.value })}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-primary text-white m-0 z-depth-0 o-keyword-btn"
                    type="button"
                    onClick={() => this.search()}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </div>
            <div id="Switch">
              <p className="mb-2" style={{ fontSize: "0.8rem" }}>
                Seleccionar
              </p>
              <div className="o-contacts-filter">
                <SwitchSelector
                  className="mt-0"
                  options={options}
                  forcedSelectedIndex={this.state.favorites ? 0 : null}
                  initialSelectedIndex={initialSelectedIndex}
                  backgroundColor={"#fff"}
                  fontColor={"#757575"}
                  onChange={this.selectFilter}
                />
              </div>
            </div>
            <div id="FavoriteButton">
              <p className="mb-2" style={{ fontSize: "0.8rem" }}>
                Contactos
              </p>{" "}
              <button
                className={
                  (this.state.favorites
                    ? "btn-primary "
                    : "bg-white text-primary ") +
                  "btn z-depth-0 border-0 mt-0 text-capitalize rounded-pill w-100 "
                }
                onClick={() => this.showFavorite()}
              >
                Favoritos{" "}
                <FontAwesomeIcon
                  className={
                    this.state.favorites ? "o-icon-filter" : "o-icon-filter-2"
                  }
                  icon={faHeart}
                />
              </button>
            </div>
          </div>
        </section>
        <div
          className={
            (this.state.show.length === 0 ? "d-flex " : "") +
            "o-card-contacts-container w-100 "
          }
        >
          {this.state.show.length !== 0 ? (
            this.state.filter === "Contactos" ? (
              this.state.show.map((contact) => (
                <CardContacts
                  key={contact.id}
                  changefavorite={this.changefavorite}
                  deleteContact={this.deleteContact}
                  contact={contact}
                />
              ))
            ) : (
              this.state.show.map((talent) => (
                <CardTalents
                  key={talent.id}
                  addTalent={this.addTalent}
                  talent={talent}
                />
              ))
            )
          ) : this.state.filter === "Contactos" ? (
            <p className="text-center text-secondary m-auto">
              No tienes ningún contacto
            </p>
          ) : (
            <p className="text-center text-secondary m-auto">
              No hay talentos para mostrar
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Contacts;
