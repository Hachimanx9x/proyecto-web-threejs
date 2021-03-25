import React, { useState } from "react";

import PropTypes from "prop-types";
import Rodal from "rodal";
import Fade from "../../Fade/Fade";
import { faTrash, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import "rodal/lib/rodal.css";
import "./CardMember.css";

const CardMember = ({ member, remove, add, change }) => {
  const [show, setShow] = useState(true);
  const [modal, setModal] = useState(false);

  const deleteConfirmation = () => {
    setShow(!show);
    setTimeout(() => remove(member), 1000);
  };

  const deleteMember = () => {
    setShow(!show);
    setModal(false);
  };

  const addMember = () => {
    setShow(!show);
    setTimeout(() => add(member), 1000);
  };

  const memberRol = (somejob) => {
    let style = "";
    const rol = somejob.toLowerCase();
    if (rol === "desarrollador web") {
      style = "web-developer";
    } else if (rol === "desarrollador fullstack") {
      style = "fullstack-developer";
    } else if (rol === "ui designer") {
      style = "ui-designer";
    }
    return style;
  };
  return (
    <div>
      <Rodal
        width={300}
        height={200}
        animation={"fade"}
        visible={modal}
        onClose={() => setModal(!modal)}
      >
        <h5 className="mt-5 mb-4">Eliminar a {member.name} del proyecto?</h5>
        <button
          className="btn btn-primary border-0 text-white font-weight-bold"
          onClick={deleteMember}
        >
          Agregar
        </button>
      </Rodal>
      <Fade show={show}>
        <div className="card o-card-member rounded">
          <div className="text-center">
            <img
              className="rounded-circle o-member-picture"
              alt="member profile"
              src={member.urlimage}
            />
            <p>{member.name}</p>
          </div>
          <div className="o-card-member-rols">
            {member.rols.map((rol, i) => (
              <div
                key={i}
                className={
                  memberRol(rol.rol) + " rounded-pill mt-1 o-job-contact"
                }
              >
                <p>{rol.rol}</p>
              </div>
            ))}
          </div>
          {remove === null || remove === undefined ? (
            <button
              className="z-depth-0 btn-block border-0 btn btn-primary font-weight-bold m-0"
              onClick={addMember}
            >
              Agregar
            </button>
          ) : (
            <>
              <div className="d-flex justify-content-between">
                <button
                  className="bg-transparent border-0"
                  onClick={deleteConfirmation}
                >
                  <FontAwesomeIcon icon={faTrash} className="text-danger" />
                </button>
                <Link
                  to={{
                    pathname: "/Dashboard/Contacts/" + member.name,
                    contact: member,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    style={{ border: "1px solid #007E33" }}
                    className="bg-success text-white border-success rounded-circle"
                  />
                </Link>
              </div>
              <div className="o-rol-select">
                <select onChange={(e) => change(member, e.target.value)}>
                  <option hidden>Rol del proyecto</option>
                  <option value="Arquitecto de experiencia multimedia">
                    Arquitecto de experiencia multimedia
                  </option>
                  <option value="Arquitecto Software">
                    Arquitecto Software
                  </option>
                  <option value="Arquitecto Hardware">
                    Arquitecto Hardware
                  </option>
                </select>
              </div>
            </>
          )}
        </div>
      </Fade>
    </div>
  );
};
CardMember.propTypes = {
  member: PropTypes.object.isRequired,
};

export default CardMember;