import React, {useState} from "react";
import "./CardTalent.css";
import PropTypes from "prop-types";
import Fade from '../../Fade/Fade';
import Rodal from "rodal";

import 'rodal/lib/rodal.css';

const CardTalents = ({talent}) => {

  const [show, setShow] = useState(true);
  const [modal, setModal] = useState(false);

  const addConfirmation = () => {
    console.log(talent.id);
    setModal(!modal);
  }

  const addTalent = () => {
    setShow(!show);

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
  return (
    <Fade show={show}>
      <Rodal width={300} height={200} animation={"fade"} visible={modal} onClose={() => setModal(!modal)}>
        <h5 className="mt-5 mb-4">Agregar a {talent.name} a tus contactos?</h5>
        <button className="btn btn-primary border-0 text-white font-weight-bold" onClick={addTalent}>Agregar</button>
      </Rodal>
      <div className="card p-3 rounded z-depth-0 border-0 mt-3">
        <div className="row">
          <div className="col-12 col-sm-7">
            <div className="o-text-info-contact">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <h3>{talent.name}</h3>
                </div>
                <div className="col-12 col-sm-6">
                  <div className={contactrol(talent.job) + " rounded-pill o-job-talent ml-2"}><p>{talent.job}</p></div>
                </div>
              </div>
              <p style={{ fontSize: "0.8rem", color: "#757575" }}>{talent.description}</p>
              <div className="row mt-2">
                {talent.skills.map((skill, i) => (
                  <img key={i} src={skill.skill} className="o-talent-skills ml-2 mr-2" alt="skill" />
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-2 mb-1 d-flex justify-content-center">
            <img src={talent.img} className="rounded-circle o-talent-picture z-depth-1" alt="user" />
          </div>
          <div className="col-12 col-sm-3">
            <button type="button" className="btn z-depth-0 border-primary text-primary font-weight-bold  o-search-talents-btn">Perfil</button>
            <button onClick={addConfirmation} type="button" className="btn btn-primary border-0 z-depth-0 text-white font-weight-bold o-search-talents-btn">Guardar</button>
          </div>

        </div>
      </div>
    </Fade>
  )
}



CardTalents.propTypes = {
  talent: PropTypes.object.isRequired,
};

export default CardTalents;
