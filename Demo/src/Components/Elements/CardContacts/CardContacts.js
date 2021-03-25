import React, { useState } from "react";

import PropTypes from "prop-types";
import Rodal from "rodal";
import Fade from "../../Fade/Fade";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import "rodal/lib/rodal.css";
import "./CardContacts.css";

const CardContacts = ({ contact, changefavorite, deleteContact }) => {
  const [show, setShow] = useState(true);
  const [modal, setModal] = useState(false);
  const deleteConfirmation = () => {
    setModal(!modal);
  };

  const deleteContacts = () => {
    setShow(!show);
    setModal(false);
    deleteContact(contact);
  };

  const contactrol = (somejob) => {
    let style = "";
    const joblist = ["other-job-1", "other-job-2", "other-job-3"];
    const rol = somejob.toLowerCase();
    if (rol === "desarrollador web") {
      style = "web-developer";
    } else if (rol === "desarrollador fullstack") {
      style = "fullstack-developer";
    } else if (rol === "ui designer") {
      style = "ui-designer";
    } else {
      style = joblist[Math.floor(Math.random() * joblist.length)];
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
        <h5 className="mt-5 mb-4">
          Eliminar a {contact.name} de tus contactos?
        </h5>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            onClick={() => setModal(!modal)}
            className="btn z-depth-0 border-primary text-primary font-weight-bold"
          >
            Cancelar
          </button>
          <button
            className="btn btn-primary border-0 text-white font-weight-bold"
            onClick={deleteContacts}
          >
            Eliminar
          </button>
        </div>
      </Rodal>
      <Fade show={show}>
        <div className="card p-3 rounded z-depth-0 border-0 mt-3">
          <div className="row">
            <div className="col-12 col-sm-2 mb-3 ">
              <div className="d-flex">
                <span
                  className="btn p-0 z-depth-0 o-show-this"
                  onClick={changefavorite}
                >
                  <FontAwesomeIcon
                    color={contact.favorite ? "#4285F4" : "#9e9e9e"}
                    className="o-talent-favorite-icon"
                    icon={faHeart}
                  />
                </span>
              </div>

              <div className="d-flex">
                <img
                  src={contact.urlimage}
                  className="rounded-circle o-talent-icon z-depth-1"
                  alt="user "
                />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="o-text-info-contact">
                <h3>{contact.name}</h3>
                <p
                  className="text-justify"
                  style={{ fontSize: "0.8rem", color: "#757575" }}
                >
                  {contact.description}
                </p>
                <div className="w-100 d-flex justify-content-around flex-wrap">
                  {contact.jobs.map((job, i) => (
                    <div
                      key={i}
                      className={
                        contactrol(job) + " rounded-pill o-job-contact"
                      }
                    >
                      <p>{job}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-3">
              <Link to={`/Dashboard/Contacts/${contact.id}`}>
                <button
                  type="button"
                  className="btn btn-primary z-depth-0 border-0 text-white font-weight-bold o-search-talents-btn"
                >
                  Contactar
                </button>
              </Link>
              <button
                type="button"
                onClick={deleteConfirmation}
                className="btn z-depth-0 border-primary text-primary font-weight-bold  o-search-talents-btn"
              >
                Eliminar
              </button>
            </div>
            <div className="col-12 col-sm-1 o-hide-this">
              <span
                className="btn ml-2 mr-1 p-0 z-depth-0 "
                onClick={() => changefavorite(contact)}
              >
                <FontAwesomeIcon
                  color={contact.favorite ? "#4285F4" : "#9e9e9e"}
                  className="o-talent-favorite-icon"
                  icon={faHeart}
                />
              </span>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};
CardContacts.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default CardContacts;
