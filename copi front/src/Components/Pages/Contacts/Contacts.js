import React, { Component } from "react";
import "./Contacts.css";
import SwitchSelector from "react-switch-selector";
import User from "../../../Logos/user-icon.png";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardContacts from "../../Elements/CardContacts/CardContacts";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.selectFilter = this.selectFilter.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      keyWord: "",
      modal: false,
      filter: "",
      contacts: [
        {
          id: "some crap",
          job: "Desarrollador FullStack",
          urlimage: User,
          name: "Juan Carlos",
          description:
            "Programador e ingeniero multimedia con experiencia en entorno web",
          favorite: false,
        },
        {
          id: "2",
          job: "Desarrollador FullStack",
          urlimage: User,
          name: "Juan Carlos",
          description:
            "Programador e ingeniero multimedia con experiencia en entorno web",
          favorite: true,
        },
      ],
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  selectFilter = (filter) => {
    this.setState({ filter: filter });
    console.log(this.state.filter);
  };

  favorite = () => {
    console.log("gg");
  };

  job = (job) => {
    let style = "";
    const rol = job.toLowerCase();
    if (rol === "desarrollador web") {
      style = "web-developer";
    } else if (rol === "desarrollador fullstack") {
      style = "fullstack-developer";
    } else if (rol === "ui designer") {
      style = "ui-designer";
    }
    return style;
  };
  render() {
    const options = [
      {
        label: "General",
        value: {
          foo: true,
        },
        selectedBackgroundColor: "#4285F4",
      },
      {
        label: "Preferidos",
        value: "Preferidos",
        selectedBackgroundColor: "#4285F4",
      },
    ];
    const initialSelectedIndex = options.findIndex(
      ({ value }) => value === "Preferidos"
    );

    return (
      <div className="p-2 mt-3">
        <div className="row">
          <div className="col-12 col-sm-4 h4">Contactos guardados</div>
          <div className="col-12 col-sm-8 ">
            <div className="o-bg-blue row">
              <div className="col-12 col-sm-6">
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
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary text-white m-0 z-depth-0 o-keyword-btn"
                      type="button"
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <p className="mb-2" style={{ fontSize: "0.8rem" }}>
                  Destacados
                </p>
                <div className="o-contacts-filter">
                  <SwitchSelector
                    className="mt-0"
                    options={options}
                    initialSelectedIndex={initialSelectedIndex}
                    backgroundColor={"#fff"}
                    fontColor={"#757575"}
                    onChange={this.selectFilter}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="o-card-talents-container w-100">
            {this.state.contacts.map((contact) => (
              <CardContacts key={contact.id} contact={contact} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Contacts;
