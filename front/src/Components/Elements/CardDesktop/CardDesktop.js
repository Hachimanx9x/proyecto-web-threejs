import React from "react";
import "./CardDesktop.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faCalendarAlt, faClock, faDownload } from "@fortawesome/free-solid-svg-icons";

const CardDesktop = () => {
    const project = <strong className=" ml-1 mr-1 cyan-text">Nombre proyecto</strong>;
    return (
        <div className="bg-white o-desktop-card">
            <div className="d-flex">
                <h4>Juan Carlos Cruz</h4>
                <div className="ml-2 rounded-pill new-update">Nuevo</div>
            </div>
            <div className="mt-2 mb-2">
                <FontAwesomeIcon className="mr-2 cyan-text" icon={faFileAlt} />
                Actividad A1 del proyecto {project} fue realizada.
                </div>
            <div className="row">
                <div className="col-6 col-sm-3">
                    <p className="grey-text"><FontAwesomeIcon icon={faCalendarAlt} /> 24/12/19</p>
                </div>
                <div className="col-6 col-sm-3">
                    <p className="grey-text"><FontAwesomeIcon className="text-danger" style={{ borderColor: "red" }} icon={faClock} /> 11:30pm</p>
                </div>
                <div className="col-xs-4 col-sm-6 rounded-pill grey p-0 lighten-3 d-flex o-download-section">
                    <div className="col-xs-6 col-sm-6">
                        <p className="grey-text pt-2 pl-3 mb-0">archivo.doc</p>
                    </div>
                    <div className="col-xs-6 col-sm-6 p-0 d-flex justify-content-end">
                        <form method="get" action="https://p4.wallpaperbetter.com/wallpaper/581/569/112/fate-series-fate-grand-order-sakata-kintoki-shuten-douji-wallpaper-preview">
                            <button type="submit" className="border-0 rounded-pill grey lighten-2 cyan-text o-download-btn">Download! <FontAwesomeIcon className="mr-2" icon={faDownload} /></button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CardDesktop;