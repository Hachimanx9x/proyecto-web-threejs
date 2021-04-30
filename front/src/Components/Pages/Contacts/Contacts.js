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

    this.state = {
      keyWord: "",
      filter: "Contactos",
      favorites: false,
      fetched: false,
      show: [],
      talents: [],
      contacts: [],
    };
  }
  componentDidMount = () => {
    const token = localStorage.getItem("login");
    const obj = JSON.parse(token);
    let temp = obj.token;
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: `llave ${temp}`,
      },
    };
    try {
      axios
        .all([
          axios.get(`http://localhost:3030/contactos`, options),
          axios.get(`http://localhost:3030/talentos`, options),
        ])

        .then((response) => {
          const allcontacts = response[0].data.contactos;
          const alltaletns = response[1].data.data;
          const contacts = [];
          const talents = [];

          for (let i of allcontacts) {
            const tools = [];
            for (let j of i.herramientas) {
              tools.push(j.icono);
            }
            contacts.push({
              id: i.iduser,
              idcontact: i.idcontac,
              name: i.nombre,
              description:
                i.descripcion === "undefined" || i.descripcion === "null"
                  ? "Ninguna"
                  : i.descripcion,
              jobs: [...i.palabras],
              skills: [...tools],
              favorite: i.preferencia === 0 ? false : true,
              urlimage: i.foto === null ? User : i.foto,
            });
          }
          for (let i of alltaletns) {
            if (!contacts.some((contact) => contact.id === i.userid)) {
              const tools = [];
              for (let j of i.herramientas) {
                tools.push(j.icono);
              }
              talents.push({
                id: i.userid,
                name: i.nombre,
                description:
                  i.descripcion === "undefined" || i.descripcion === "null"
                    ? "Ninguna"
                    : i.descripcion,
                jobs: [...i.palabras],
                img: i.foto === null ? User : i.foto,
                skills: [...tools],
              });
            }
          }

          this.setState({
            show: [...contacts],
            contacts: [...contacts],
            talents: [...talents],
            fetched: true,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

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
          if (contain) {
            show.push(contact);
          }
        }
      } else {
        for (let i = 0; i < talents.length; i++) {
          const talent = talents[i];
          const contain = talent.jobs.some((job) =>
            job.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
          );
          if (contain) {
            show.push(talent);
          }
        }
      }
      this.setState({ show: [...show] });
    }
  };

  showFavorite = () => {
    if (this.state.filter !== "Contactos") {
      this.setState({ filter: "Contactos" });
    }
    const favorites = this.state.favorites;
    let show = [];

    if (!favorites) {
      const { contacts } = this.state;
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].favorite) {
          show.push(contacts[i]);
        }
      }
    } else {
      show = [...this.state.contacts];
    }
    this.setState({ show: [...show], favorites: !favorites });
  };

  changefavorite = async (contact) => {
    const { contacts, show } = this.state;
    const item = contacts.find((iterador) => iterador.id === contact.id);
    const item2 = show.find((iterador) => iterador.id === contact.id);
    if (item) {
      const favorite = contact.favorite;
      item.favorite = !favorite;
      item2.favorite = !favorite;

      this.setState({ contacts: [...contacts], show: [...show] });
    }
    try {
      const token = localStorage.getItem("login");
      const obj = JSON.parse(token);
      const tokensito = obj.token;
      const options = {
        headers: { authorization: `llave ${tokensito}` },
      };

      await axios
        .put(
          `http://localhost:3030/update/contacto`,
          {
            preferences: contact.favorite ? true : false,
            id: contact.idcontact,
          },
          options
        )
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };
  deleteContact = async (contact) => {
    const { talents, contacts } = this.state;
    const item = contacts.find((iterador) => iterador.id === contact.id);
    const item2 = contacts.findIndex((iterador) => iterador.id === contact.id);
    try {
      const token = localStorage.getItem("login");
      const obj = JSON.parse(token);
      const tokensito = obj.token;
      await axios
        .delete(`http://localhost:3030/delete/contacto`, {
          headers: { authorization: `llave ${tokensito}` },
          data: { id: contact.idcontact },
        })
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
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

    this.setState({
      contacts: [...contacts],
      talents: [...talents],
    });

    if (contacts.length === 0) {
      setTimeout(() => {
        this.setState({
          show: [...contacts],
        });
      }, 1000);
    }
  };

  addTalent = async (talent) => {
    const { talents, contacts } = this.state;
    const token = localStorage.getItem("login");
    const item = talents.find((iterador) => iterador.id === talent.id);
    const item2 = talents.findIndex((iterador) => iterador.id === talent.id);

    if (item) {
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

      axios
        .all([
          await axios.post(
            `http://localhost:3030/agregar/contacto`,
            {
              usuario: talent.id,
              preferencia: false,
            },
            options
          ),
          axios.get(`http://localhost:3030/contactos`, options),
        ])
        .then((response) => {
          const allcontacts = response[1].data.contactos;
          const contacts = [];

          for (let i of allcontacts) {
            const tools = [];
            for (let j of i.herramientas) {
              tools.push(j.icono);
            }
            contacts.push({
              id: i.iduser,
              idcontact: i.idcontac,
              name: i.nombre,
              description:
                i.descripcion === "undefined" || i.descripcion === "null"
                  ? "Ninguna"
                  : i.descripcion,
              jobs: [...i.palabras],
              skills: [...tools],
              favorite: i.preferencia === 0 ? false : true,
              urlimage: i.foto === null ? User : i.foto,
            });
          }
          this.setState({
            contacts: [...contacts],
          });
        });
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
    if (this.state.fetched) {
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
              "o-card-contacts-container o-scroll-y w-100 "
            }
          >
            {this.state.show.length !== 0 ? (
              this.state.filter === "Contactos" ? (
                this.state.show.map((contact, i) => (
                  <CardContacts
                    key={i}
                    changefavorite={this.changefavorite}
                    deleteContact={this.deleteContact}
                    contact={contact}
                  />
                ))
              ) : (
                this.state.show.map((talent, i) => (
                  <CardTalents
                    key={i}
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
    } else {
      return <div>Cargando....</div>;
    }
  }
}

export default Contacts;
