import React, { useState } from "react";
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

export default function ProjectView() {
  const [projectIcon, setProjectIcon] = useState(null);
  const [projectPicture, setProjectPicture] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectPractices, setProjectPractices] = useState("");
  const [modal, setModal] = useState(false);
  const [confirmationmodal, setConfirmationmodal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(null);
  const [members, setMembers] = useState([]);
  const [contacts, setContacts] = useState([]);

  const handleResize = (e) => {
    setWindowWidth(window.innerWidth);
  };
  /*
   * Shows the modal with the list of contacts.
   */
  const showContacts = () => {
    setModal(true);
  };
  useEffect(() => {
    /*
     * Add an resizable method to get the current viewport dimensions for responsive issues.
     */
    document.addEventListener("click", handleResize);
    /*
     * Removes the method before the component is unmounted.
     */

    return function cleanup() {
      document.removeEventListener("click", handleResize);
    };
  }, []);
  /*
   * Recieves an object of the member.
   * Stores the current array of members in a temporal variable.
   * Looks if the member exist in the array of selected members by searching for the id.
   * Removes the member and set the state.
   */
  const removeMember = (member) => {
    const memberslist = members;
    const item = memberslist.find((iterador) => iterador.id === member.id);
    if (item) {
      memberslist.splice(item, 1);
      setMembers([...memberslist]);
    }
    console.log(members);
  };
  /*
   * Recieves an object of the member.
   * Stores the current array of members in a temporal variable.
   * Looks if the member exist in the array of selected members by searching for the id so the member is not duplicated.
   * Adds the member and set the state.
   */
  const addMember = (member) => {
    const memberslist = members;
    const item = memberslist.find((iterador) => iterador.id === member.id);
    if (!item) {
      memberslist.push({ ...memberslist, selectedrol: "" });
      setMembers([...memberslist]);
    }
    console.log(members);
  };

  /*
   * Recieves an object of the member and the selected rol.
   * Stores the current array of members in a temporal variable.
   * Looks if the member exist in the array of selected members by searching for the id.
   * Updates the rol in the array and set the state.
   */
  const changeRol = (member, rol) => {
    const memberslist = members;
    const item = members.find((iterador) => iterador.id === member.id);
    if (item) {
      item.selectedrol = rol;
      setMembers([...memberslist]);
    }
    console.log(members);
  };
  return (
    <div className="row">
      <Rodal
        width={windowWidth < 600 ? 400 : 1000}
        height={350}
        animation={"fade"}
        visible={modal}
        onClose={() => setModal(false)}
      >
        <div className="o-member-selection-container">
          {contacts.map((contact, i) => (
            <CardMember key={i} add={addMember} member={contact} />
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
        <div>
          <h4 className="mt-3">Guardar cambios?</h4>
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
              onClick={() => this.props.history.push("Dashboard/projects")}
            >
              Guardar
            </button>
          </div>
        </div>
      </Rodal>
      <div className="col-xs-12 col-sm-8 o-project-creation-section">
        <div className="d-flex justify-content-between mb-2">
          <h4 className="mb-3 pl-4">Creación del projecto</h4>
          <button
            className="z-depth-0 border-0 btn btn-primary font-weight-bold"
            style={{ width: "7rem", height: "2.3rem" }}
            onClick={() => setConfirmationmodal(true)}
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
                  projectIcon === null
                    ? ProjectIcon
                    : URL.createObjectURL(projectIcon)
                }
                alt={"icon"}
                className="rounded-circle"
                style={{ width: "3rem" }}
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
                  setProjectIcon(file);
                }}
              />
            </div>
            <small>Portada del proyecto</small>
            <div className="o-project-form">
              <img
                src={
                  projectPicture === null
                    ? ProjectPicture
                    : URL.createObjectURL(projectPicture)
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
                    setProjectPicture(file);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-xs-12 p-0 pl-sm-4 col-sm-4">
            <MDBInput
              type="text"
              label="Nombre del proyecto *"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              outline
              required
            />
          </div>
          <div className="col-xs-12 col-sm-4">
            <MDBInput
              type="textarea"
              label="Descripción del proyecto *"
              className="rounded"
              outline
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
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
              onClick={showContacts}
              className="z-depth-0 border-0 btn btn-primary font-weight-bold m-3"
            >
              Agregar
            </button>
          </div>
          <div className="o-member-selection-container">
            {members.length === 0 ? (
              <p className="text-secondary m-auto">
                No hay miembros seleccionados
              </p>
            ) : (
              members.map((member, i) => (
                <CardMember
                  remove={removeMember}
                  change={changeRol}
                  key={i}
                  member={member}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="col-xs-12 col-sm-4 o-blue-container o-practice-container">
        <h4 className="mb-3">Prácticas para concebir la pre-producción *</h4>
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
              Más información
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
              Más información
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
