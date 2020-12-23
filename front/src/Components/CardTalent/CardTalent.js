import React, { useState } from "react";
import "./CardTalent.css";
import Fade from '../Fade/Fade'
import Proptypes from "prop-types";

const CardTalent = (urlpicture, name, description, favorite, job) => {
    const [show, setShow] = useState(true);

    const deleteConfirmation = () => { 
        setShow(!show);
     }

    const job = () => {

    }
    return (
        <Fade show={show}>
            <div className="card p-3 rounded z-depth-0 border-0">
                <div className="row">
                    <div className="col-12 col-sm-2 mb-3 ">
                        <div className="d-flex">

                            <img src={User} className="rounded-circle o-talent-icon z-depth-1" alt="user-picture" />
                            <span className="btn p-0 z-depth-0 o-show-this"><FontAwesomeIcon onClick={this.favorite} color={"#4285F4"} className="o-talent-favorite-icon" icon={faHeart} /></span>

                        </div>


                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="o-text-info-contact">
                            <h3>Juan Carlos</h3>
                            <p style={{ fontSize: "0.8rem", color: "#757575" }}>Programador e ingeniero multimedia con experiencia en entorno web</p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-3">
                        <button type="button" className="btn btn-primary z-depth-0 text-white font-weight-bold o-search-talents-btn">Contactar</button>
                        <button type="button" className="btn z-depth-0 border-primary text-primary font-weight-bold  o-search-talents-btn">Eliminar</button>
                    </div>
                    <div className="col-12 col-sm-1 o-hide-this">
                        <span className="btn ml-2 mr-1 p-0 z-depth-0 " onClick={this.favorite}><FontAwesomeIcon color={"#4285F4"} className="o-talent-favorite-icon" icon={faHeart} /></span>
                    </div>
                </div>
            </div>
        </Fade>
    )
}


export default CardTalent;