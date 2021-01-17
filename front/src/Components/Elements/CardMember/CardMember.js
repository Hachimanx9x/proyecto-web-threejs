import React, { useState } from "react";

import PropTypes from "prop-types";
import Rodal from "rodal";
import Fade from '../../Fade/Fade'
import { faTrash, faInfo, faPlusSquare, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import 'rodal/lib/rodal.css';
import "./CardMember.css";

const CardMember = ({ member }) => {
    const [show, setShow] = useState(true);
    const [modal, setModal] = useState(false);

    const deleteConfirmation = () => {
        setModal(!modal);
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
                <h5 className="mt-5 mb-4">Eliminar a {member.name} del proyecto?</h5>
                <button className="btn btn-primary border-0 text-white font-weight-bold" onClick={deleteMember}>Agregar</button>
            </Rodal>
            <Fade show={show}>
                <div className="card o-card-member rounded">
                    <div className="text-center">
                        <img className="rounded-circle o-member-picture" alt="member-picture" src={member.urlimage} />
                        <p>{ member.name}</p>
                    </div>
                    <div className="o-card-member-rols">
                        {member.rols.map((rol, i) => (
                            <div key={i} className={memberRol(rol.rol) + " rounded-pill mt-1 o-job-contact"}><p>{rol.rol}</p></div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-between">
                        <button className="bg-transparent border-0" onClick={deleteConfirmation}><FontAwesomeIcon icon={faPlusCircle} className="text-info" /></button>
                        <Link to={{ pathname: "/Dashboard/Contacts/" + member.name, contact: member }}><FontAwesomeIcon icon={faInfo} className="text-success" /></Link>

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
