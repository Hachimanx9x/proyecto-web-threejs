import React, { useState } from "react";

import PropTypes from "prop-types";
import Rodal from "rodal";
import Fade from '../../Fade/Fade'
import { faTrash, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import 'rodal/lib/rodal.css';
import "./CardContacts.css";

const CardMember = ({ member }) => {
    const [show, setShow] = useState(true);
    const [modal, setModal] = useState(false);

    const deleteConfirmation = () => {
        setModal(!modal);
        console.log(contact.id);
    }

    const deleteMember = () => {
        setShow(!show);
        setModal(false);
    }

    const memberRol = (somejob) => {
        let style = ""
        const rol = somejob.toLowerCase();
        if (rol === "desarrollador web") {
            style = "web-developer";
        } else if (rol === "desarrollador fullstack") {
            style = "fullstack-developer"
        } else if (rol === "ui designer") {
            style = "ui-designer";
        }
        return style;
    }
    return (
        <div>
            <Rodal width={300} height={200} animation={"fade"} visible={modal} onClose={() => setModal(!modal)}>
                <h5 className="mt-5 mb-4">Agregar a {member.name} a tus contactos?</h5>
                <button className="btn btn-primary border-0 text-white font-weight-bold" onClick={deleteContact}>Agregar</button>
            </Rodal>
            <Fade show={show}>
                <div className="card o-card-member rounded border-0">
                    <div className="justify-content-center">
                        <img className="rounded-circle o-member-picture" alt="member-picture" src={member.urlimg} />
                        <p>{ member.name}</p>
                    </div>
                    <div className="o-card-member-rols">
                        {member.rols.map((rol, i) => (
                            <div className={memberRol(rol) + " rounded-pill o-job-contact"}><p>{rol}</p></div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-space-between">
                            <FontAwesomeIcon icon={faTrash} className="text-danger" />
                            <FontAwesomeIcon icon={faInfo} className="text-success" />
                    </div>
                </div>
                    
            </Fade>
        </div>

    );

}
CardMember.propTypes = {
    member: PropTypes.object.isRequired,
};

export default CardMember;
