import React, {useState} from "react";
import "./CardContacts.css";
import PropTypes from "prop-types";
import Fade from '../../Fade/Fade'
import {  faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardContacts = ({ id, name, description, urlimg, job, favorite}) => {
    const [show, setShow] = useState(true);
    const [isfavorite, setfavorite] = useState(favorite);
    const deleteConfirmation = () => {
        setShow(!show);
        console.log(id);
    }

    const contactrol = (somejob) => {
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

    const changefavorite = () => {
        setfavorite(!isfavorite);
    }
    return (
        <Fade show={show}>
            <div className="card p-3 rounded z-depth-0 border-0 mt-3">
                <div className="row">
                    <div className="col-12 col-sm-2 mb-3 ">
                        <div className="d-flex">

                            <img src={urlimg} className="rounded-circle o-talent-icon z-depth-1" alt="user " />
                            <span className="btn p-0 z-depth-0 o-show-this" onClick={changefavorite}><FontAwesomeIcon color={isfavorite ? "#4285F4" : "#9e9e9e"} className="o-talent-favorite-icon" icon={faHeart} /></span>

                        </div>


                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="o-text-info-contact">
                            <h3>{name}</h3>
                            <p style={{ fontSize: "0.8rem", color: "#757575" }}>{description}</p>
                            <div className={contactrol(job) + " rounded-pill o-job-contact"}><p>{job}</p></div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-3">
                        <a href="/Dashboard/infoContact" type="button" className="btn btn-primary z-depth-0 text-white font-weight-bold o-search-talents-btn">Contactar</a>
                        <button type="button" className="btn z-depth-0 border-primary text-primary font-weight-bold  o-search-talents-btn">Eliminar</button>
                    </div>
                    <div className="col-12 col-sm-1 o-hide-this">
                        <span className="btn ml-2 mr-1 p-0 z-depth-0 " onClick={changefavorite}><FontAwesomeIcon color={isfavorite ? "#4285F4" : "#9e9e9e"} className="o-talent-favorite-icon" icon={faHeart} /></span>
                    </div>
                </div>
            </div>
        </Fade>
    );

}
CardContacts.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    urlimg: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
};

export default CardContacts;
