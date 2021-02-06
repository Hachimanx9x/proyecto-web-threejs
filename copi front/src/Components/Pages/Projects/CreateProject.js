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

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.removeMember = this.removeMember.bind(this);
    this.addMember = this.addMember.bind(this);
    this.changeRol = this.changeRol.bind(this);

    this.state = {
      projectIcon: null,
      projectPicture: null,
      projectName: "",
      projectDescription: "",
      projectMembers: [],
      projectPractices: "",
      modal: false,
      windowWidth: window.innerWidth,
      members: [],
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
    console.log(this.state.members);
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
    console.log(this.state.members);
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
    console.log(this.state.members);
  }
  render() {
    return (
      <div className="row">
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
        <div className="col-xs-12 col-sm-8 o-project-creation-section">
          <div className="d-flex justify-content-between mb-2">
            <h4 className="mb-3 pl-4">Creación del projecto</h4>
            <button
              className="z-depth-0 border-0 btn btn-primary font-weight-bold"
              style={{ width: "7rem", height: "2.3rem" }}
            >
              Guardar
            </button>
          </div>

          <div className="row bg-white o-project-basic-info">
            <div className="col-xs-12 col-sm-4">
              <small>Icono del proyecto</small>
              <div className="inputWrapper rounded-pill mb-3">
                <img
                  src={
                    this.state.projectIcon === null
                      ? ProjectIcon
                      : URL.createObjectURL(this.state.projectIcon)
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
                  onChange={(event) => {
                    const file = event.target.files[0];
                    this.setState({ projectIcon: file });
                  }}
                />
              </div>
              <small>Portada del proyecto</small>
              <div className="o-project-form">
                <img
                  src={
                    this.state.projectPicture === null
                      ? ProjectPicture
                      : URL.createObjectURL(this.state.projectPicture)
                  }
                  className="o-picture-project"
                  alt="project"
                />
                <div className="inputWrapper o-inputWrapper-btn rounded-pill mb-3">
                  <small
                    className="cyan-text"
                    style={{
                      left: "1.4rem",
                      top: "0.6rem",
                      position: "absolute",
                    }}
                  >
                    Subir icono
                    <FontAwesomeIcon
                      className="text-secondary ml-2"
                      icon={faAngleDoubleUp}
                    />
                  </small>
                  <input
                    className="fileInput rounded-pill"
                    type="file"
                    name="projectPicture"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      this.setState({ projectPicture: file });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-4">
              <MDBInput type="text" label="Nombre del proyecto" outline />
            </div>
            <div className="col-xs-12 col-sm-4">
              <MDBInput
                type="textarea"
                label="Descripción del proyecto"
                className="rounded"
                outline
              />
            </div>
          </div>
          <div
            className="row bg-white mt-4 flex-column"
            style={{ borderRadius: "1rem" }}
          >
            <div className="d-flex justify-content-between">
              <h6 className="m-3 pl-4">Integrantes del proyecto</h6>
              <button
                onClick={this.showContacts}
                className="z-depth-0 border-0 btn btn-primary font-weight-bold m-3"
              >
                Agregar
              </button>
            </div>
            <div className="o-member-selection-container">
              {this.state.members.length === 0 ? (
                <p className="text-secondary m-auto">
                  No hay miembros seleccionados
                </p>
              ) : (
                this.state.members.map((member, i) => (
                  <CardMember
                    remove={this.removeMember}
                    change={this.changeRol}
                    key={i}
                    member={member}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-4 o-blue-container o-practice-container">
          <h4 className="mb-3">Practicas para concebir la pre-producción</h4>
          <div className="bg-white rounded mb-2 p-2">
            <p className="text-warning">Concebir la experiencia multimedia</p>
            <div className="d-flex justify-content-between">
              <input
                type="checkbox"
                className="bg-warning mt-2 rounded border-warning"
              />
              <a
                href="Documentation"
                className="o-btn-partices rounded btn-warning text-white z-depth-0"
              >
                Mas información
              </a>
            </div>
          </div>
          <div className="bg-white rounded p-2">
            <p className="text-success">Sistema multimedia mínimo viable</p>
            <div className="d-flex justify-content-between">
              <input
                type="checkbox"
                className="bg-warning mt-2 rounded border-warning"
              />
              <a
                href="Documentation"
                className="o-btn-partices rounded bg-success text-white z-depth-0"
              >
                Mas información
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateProject;
