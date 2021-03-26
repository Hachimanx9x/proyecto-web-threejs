import React, { Component } from "react";
import { MDBInput } from "mdbreact";
import User from "../../../Logos/user-icon.png";
import ProjectIcon from "../../../Logos/project.png";
import ProjectPicture from "../../../ilustracion-equipo-de-trabajo.jpg";
import CardMember from "../../Elements/CardMember/CardMember";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rodal from "rodal";

import "rodal/lib/rodal.css";
import "./CreateProject.css";
import SuccessAnimation from "../../Elements/SuccessAnimation/SuccessAnimation";

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.removeMember = this.removeMember.bind(this);
    this.addMember = this.addMember.bind(this);
    this.changeRol = this.changeRol.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.createProject = this.createProject.bind(this);

    this.state = {
      projectIcon: null,
      projectPicture: null,
      projectName: "",
      projectDescription: "",
      projectPractices: {
        smmv: false,
        cem: false,
      },
      confirmationModal: false,
      windowWidth: window.innerWidth,
      members: [],
      errors: {
        name: false,
        practices: false,
        members: false,
        membersMessage: "",
      },
      success: false,
      rols: [],
      contacts: [
        {
          id: 1,
          name: "Saitama",
          urlimage: User,
          rols: [
            { rol: "desarrollador web" },
            { rol: "desarrollador fullstack" },
            { rol: "ui designer" },
          ],
        },
        {
          id: 2,
          name: "Tatsumi",
          urlimage: User,
          rols: [
            { rol: "desarrollador web" },
            { rol: "desarrollador fullstack" },
            { rol: "ui designer" },
          ],
        },
        {
          id: 3,
          name: "Saber",
          urlimage: User,

          rols: [
            { rol: "desarrollador web" },
            { rol: "desarrollador fullstack" },
            { rol: "ui designer" },
          ],
        },
        {
          id: 4,
          name: "Accel",
          urlimage: User,
          rols: [
            { rol: "desarrollador web" },
            { rol: "desarrollador fullstack" },
            { rol: "ui designer" },
          ],
        },
        {
          id: 5,
          name: "Hachiman",
          urlimage: User,
          rols: [
            { rol: "desarrollador web" },
            { rol: "desarrollador fullstack" },
            { rol: "ui designer" },
          ],
        },
      ],
    };
  }
  /*
   *Function used to validate each requiered Fields.
   */
  handleValidation = () => {
    const { projectName, projectPractices, members, errors } = this.state;
    if (projectName.trim() === "") {
      errors.name = true;
    } else {
      errors.name = false;
    }
    if (projectPractices.length === 0) {
      errors.practices = true;
    } else {
      errors.practices = false;
    }
    if (members.length < 3) {
      errors.members = true;
      errors.membersMessage = "Selecciona al menos tres integrantes.";
    } else {
      errors.practices = false;
    }
    this.setState({ errors: errors });
  };

  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
  };
  /*
   * Add an resizable method to get the current viewport dimensions for responsive issues.
   */
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }
  /*
   * Removes the method before the component is unmounted.
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  /*
   * Shows the modal with the list of contacts.
   */
  showContacts = () => {
    this.setState({ modal: true });
  };
  /*
   * Recieves an object of the member.
   * Stores the current array of members in a temporal variable.
   * Looks if the member exist in the array of selected members by searching for the id.
   * Removes the member and set the state.
   */
  removeMember(member) {
    const members = this.state.members;
    const item = members.find((iterador) => iterador.id === member.id);
    if (item) {
      members.splice(item, 1);
      this.setState({ members: [...members] });
    }
  }
  /*
   * Recieves an object of the member.
   * Stores the current array of members in a temporal variable.
   * Looks if the member exist in the array of selected members by searching for the id so the member is not duplicated.
   * Adds the member and set the state.
   */
  addMember(member) {
    const members = this.state.members;
    const item = members.find((iterador) => iterador.id === member.id);
    if (!item) {
      members.push({ ...member, selectedrol: "" });
      this.setState({ members: [...members] });
    }
  }

  /*
   * Recieves an object of the member and the selected rol.
   * Stores the current array of members in a temporal variable.
   * Looks if the member exist in the array of selected members by searching for the id.
   * Updates the rol in the array and set the state.
   */
  changeRol(member, rol) {
    const members = this.state.members;
    const item = members.find((iterador) => iterador.id === member.id);
    if (item) {
      item.selectedrol = rol;
      this.setState({ members: [...members] });
    }
  }
  handleInput = (name, e) => {
    if (name === "projectIcon" || name === "projectPicture") {
      const reader = new FileReader();
      try {
        reader.onload = () => {
          if (reader.readyState === 2) {
            this.setState({ [name]: reader.result });
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      } catch (error) {
        console.log(error);
      }
    } else if (name === "smmv" || name === "cem") {
      const { projectPractices } = this.state;
      if (name === "smmv") {
        projectPractices.smmv = e.target.checked;
      } else {
        projectPractices.cem = e.target.checked;
      }
      this.setState({ projectPractices: projectPractices });
      if (this.state.projectPractices.cem && this.state.projectPractices.smmv) {
        this.setState({
          rols: [
            { rol: "Arquitecto de Información" },
            { rol: "Arquitecto de Pruebas" },
            { rol: "Arquitecto de Producción de contenidos" },
            { rol: "Diseñador Audiovisual" },
            { rol: "Diseñador de concepto y Storyboard" },
            { rol: "Arquitecto Hw/Sw" },
          ],
        });
      } else if (this.state.projectPractices.cem) {
        this.setState({
          rols: [
            { rol: "Arquitecto de Información" },
            { rol: "Arquitecto de Pruebas" },
            { rol: "Arquitecto de Producción de contenidos" },
          ],
        });
      } else if (this.state.projectPractices.smmv) {
        this.setState({
          rols: [
            { rol: "Arquitecto de Información" },
            { rol: "Diseñador Audiovisual" },
            { rol: "Diseñador de concepto y Storyboard" },
            { rol: "Arquitecto Hw/Sw" },
          ],
        });
      } else {
        this.setState({
          rols: [],
        });
      }
    } else {
      this.setState({ [name]: e.target.value });
    }
  };

  createProject = async () => {
    await this.handleValidation();
    const { errors } = this.state;
    if (!errors.name && !errors.members && !errors.practices) {
      this.setState({ success: true });
      setTimeout(() => {
        this.setState({ confirmationModal: false });
        this.props.history.push("/Dashboard/Desktop");
      }, 1200);
    } else {
      this.setState({ confirmationModal: false });
    }
  };
  render() {
    return (
      <div className="row mb-3 mb-sm-0 pb-5 pb-sm-0 w-100">
        <Rodal
          width={this.state.windowWidth < 600 ? 400 : 1000}
          height={350}
          animation={"fade"}
          visible={this.state.modal}
          onClose={() => this.setState({ modal: false })}
        >
          <div className="o-member-selection-container">
            {this.state.contacts.map((contact, i) => (
              <CardMember key={i} add={this.addMember} member={contact} />
            ))}
          </div>
        </Rodal>
        <Rodal
          width={300}
          height={160}
          animation={"fade"}
          visible={this.state.confirmationModal}
          onClose={() => this.setState({ confirmationModal: false })}
        >
          {!this.state.success ? (
            <div>
              <h4 className="mt-3">Confirmación de creación de proyecto</h4>
              <div className="d-flex justify-content-between p-2">
                <button
                  className="z-depth-0 border-primary btn border-primary text-primary font-weight-bold"
                  type="submit"
                  onClick={() => this.setState({ confirmationModal: false })}
                >
                  Cancelar
                </button>
                <button
                  className="z-depth-0 border-0 btn btn-primary font-weight-bold"
                  type="button"
                  onClick={() => this.createProject()}
                >
                  Crear
                </button>
              </div>
            </div>
          ) : (
            <SuccessAnimation />
          )}
        </Rodal>
        <h5 className="mb-3 pl-4">Creación del proyecto</h5>
        <div className="o-project-creation-section">
          <section className="row bg-white o-project-basic-info">
            <div className="col-xs-12 col-sm-4">
              <p>Icono del proyecto</p>
              <div className="inputWrapper rounded-pill mb-3">
                <img
                  src={
                    this.state.projectIcon === null
                      ? ProjectIcon
                      : this.state.projectIcon
                  }
                  alt={"icon"}
                  className="rounded-circle"
                  style={{ width: "3rem", height: "3rem" }}
                />
                <p className="cyan-text o-icon-input-text">
                  Subir icono
                  <FontAwesomeIcon
                    className="text-secondary ml-2"
                    icon={faAngleDoubleUp}
                  />
                </p>
                <input
                  className="fileInput rounded-pill"
                  type="file"
                  name="projectIcon"
                  accept="image/*"
                  onChange={(event) => {
                    this.handleInput("projectIcon", event);
                  }}
                />
              </div>
              <p>Banner del proyecto</p>
              <div className="o-project-form d-flex justify-content-end">
                <img
                  src={
                    this.state.projectPicture === null
                      ? ProjectPicture
                      : this.state.projectPicture
                  }
                  className="o-picture-project"
                  alt="project"
                />
                <div className="inputWrapper o-inputWrapper-btn rounded-pill mb-3">
                  <p className="cyan-text">
                    Subir banner
                    <FontAwesomeIcon
                      className="text-secondary ml-2"
                      icon={faAngleDoubleUp}
                    />
                  </p>
                  <input
                    className="fileInput rounded-pill"
                    type="file"
                    accept="image/*"
                    name="projectPicture"
                    onChange={(event) => {
                      this.handleInput("projectPicture", event);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xs-12 p-0 pl-sm-4 col-sm-8 position-relative">
              <MDBInput
                type="text"
                className={
                  this.state.errors.name ? "is-invalid border-danger" : ""
                }
                label={
                  <span>
                    Nombre del proyecto{" "}
                    <strong className="text-danger">*</strong>
                  </span>
                }
                outline
                required
                onChange={(e) => this.handleInput("projectName", e)}
              />
              <div className="position-relative" style={{ maxWidth: "20rem" }}>
                <p
                  className={
                    (this.state.errors.name ? "" : "invisible ") +
                    "o-text-error"
                  }
                >
                  Campo requerido.
                </p>
              </div>
              <MDBInput
                onChange={(e) => this.handleInput("projectDescription", e)}
                type="textarea"
                label="Descripción del proyecto"
                className="rounded pt-3 pt-sm-2"
                outline
                required
              />
            </div>
          </section>

          <section
            id="Practices-section"
            className="row bg-white mt-4 flex-column"
            style={{ borderRadius: "1rem" }}
          >
            <p className="m-3 pl-1 pl-sm-4 w-100">
              Prácticas para concebir la pre-producción{" "}
              <strong className="text-danger">*</strong>
              <span
                className={
                  this.state.errors.practices ? "text-danger" : "invisible"
                }
              >
                {" "}
                Seleccione al menos una práctica.
              </span>
            </p>
            <div className="d-flex flex-wrap p-1 pb-3 pl-sm-3 pr-sm-3 mt-2">
              <div className="card bg-white rounded mb-2 p-2">
                <p className="text-warning">
                  Concebir la experiencia multimedia
                </p>
                <div className="d-flex p-0 mt-4 justify-content-between">
                  <input
                    type="checkbox"
                    className="bg-warning mt-2 rounded border-warning"
                    onChange={(e) => this.handleInput("cem", e)}
                  />
                  <a
                    href="DocumentationCEM"
                    className="o-btn-partices rounded btn-warning text-white z-depth-0"
                  >
                    Más información
                  </a>
                </div>
              </div>
              <div className="card bg-white rounded p-2">
                <p className="text-success">Sistema multimedia mínimo viable</p>
                <div className="d-flex p-0 mt-4 justify-content-between">
                  <input
                    type="checkbox"
                    className="bg-warning mt-2 rounded border-warning"
                    onChange={(e) => this.handleInput("smmv", e)}
                  />
                  <a
                    href="DocumentationSMMV"
                    className="o-btn-partices rounded bg-success text-white z-depth-0"
                  >
                    Más información
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section
            className="row bg-white mt-4 flex-column"
            style={{ borderRadius: "1rem" }}
          >
            <div className="d-flex justify-content-between">
              <p className="m-3 pl-1 pl-sm-4">
                Integrantes del proyecto{" "}
                <strong className="text-danger">*</strong>
                <span
                  className={
                    this.state.errors.members ? "text-danger" : "invisible"
                  }
                >
                  {" "}
                  {this.state.errors.membersMessage}
                </span>
              </p>
              <button
                onClick={this.showContacts}
                className="z-depth-0 border-0 text-capitalize btn btn-primary font-weight-bold m-3"
                type="button"
                style={{ width: "7rem", height: "2.3rem" }}
              >
                Agregar
              </button>
            </div>
            <div className="o-member-selection-container">
              {this.state.members.length === 0 ? (
                <p
                  className={
                    (this.state.errors.members
                      ? "text-danger"
                      : "text-secondary") + " m-auto"
                  }
                >
                  No hay miembros seleccionados
                </p>
              ) : (
                this.state.members.map((member, i) => (
                  <CardMember
                    remove={this.removeMember}
                    change={this.changeRol}
                    key={i}
                    member={member}
                    rols={this.state.rols}
                  />
                ))
              )}
            </div>
            <div className="d-flex justify-content-between mb-2">
              <button
                className="z-depth-0 border-0 btn btn-primary text-capitalize font-weight-bold ml-auto mb-3"
                style={{ width: "6rem", height: "2.3rem" }}
                type="button"
                onClick={() => this.setState({ confirmationModal: true })}
              >
                Crear
              </button>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default CreateProject;
