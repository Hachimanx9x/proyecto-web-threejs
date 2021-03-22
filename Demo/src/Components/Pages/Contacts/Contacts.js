import React, { Component } from "react";
import "./Contacts.css";
import SwitchSelector from "react-switch-selector";
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
          name: "Juan Carlos",
          description:
            "Programador e ingeniero multimedia con experiencia en entorno web",
          favorite: false,
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
              skill:
                "https://upload.vectorlogo.zone/logos/javascript/images/239ec8a4-163e-4792-83b6-3f6d96911757.svg",
            },
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
              skill:
                "https://upload.vectorlogo.zone/logos/javascript/images/239ec8a4-163e-4792-83b6-3f6d96911757.svg",
            },
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
              skill:
                "https://upload.vectorlogo.zone/logos/javascript/images/239ec8a4-163e-4792-83b6-3f6d96911757.svg",
            },
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
          id: "4",
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
      contacts: [
        {
          id: "1",
          jobs: [
            "Desarrollador FullStack",
            "Desarrollador Frontend",
            "Desarrollador Backend",
          ],
          urlimage: User,
          name: "Juan Carlos",
          description:
            "Programador e ingeniero multimedia con experiencia en entorno web",
          favorite: false,
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
              skill:
                "https://upload.vectorlogo.zone/logos/javascript/images/239ec8a4-163e-4792-83b6-3f6d96911757.svg",
            },
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
              skill:
                "https://upload.vectorlogo.zone/logos/javascript/images/239ec8a4-163e-4792-83b6-3f6d96911757.svg",
            },
          ],
        },
      ],
    };
  }
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
    const item = contacts.find((iterador) => iterador.id === contact.id);

    if (item) {
      talents.push({
        id: item.id,
        name: item.name,
        description: item.description,
        jobs: item.jobs,
        img: item.urlimage,
        skills: [...item.skills],
      });
      contacts.splice(item, 1);

      if (contacts.length === 0) {
        this.setState({
          show: [...contacts],
          contacts: [...contacts],
          talents: [...talents],
        });
      } else {
        this.setState({
          contacts: [...contacts],
          talents: [...talents],
        });
      }
    }
  };

  addTalent = async (talent) => {
    const { talents, contacts } = this.state;
    const item = talents.find((iterador) => iterador.id === talent.id);

    if (item) {
      contacts.push({
        id: item.id,
        jobs: item.jobs,
        urlimage: item.img,
        name: item.name,
        description: item.description,
        favorite: false,
        skills: [...item.skills],
      });

      talents.splice(item, 1);

      if (talents.length === 0) {
        this.setState({
          show: [...talents],
          talents: [...talents],
          contacts: [...contacts],
        });
      } else {
        this.setState({
          contacts: [...contacts],
          talents: [...talents],
        });
      }
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
