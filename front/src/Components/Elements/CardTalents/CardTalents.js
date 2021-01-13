import React, {useState} from "react";
import "./CardTalent.css";
import PropTypes from "prop-types";
import Fade from '../../Fade/Fade';

const CardTalents = ({id, name, description, picture, job, skills}) => {

  const [show, setShow] = useState(true);

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
  return (
    <Fade show={show}>
      <div className="card p-3 rounded z-depth-0 border-0 mt-3">
        <div className="row">
          <div className="col-12 col-sm-7">
            <div className="o-text-info-contact">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <h3>{name}</h3>
                </div>
                <div className="col-12 col-sm-6">
                  <div className={contactrol(job) + " rounded-pill o-job-talent ml-2"}><p>{job}</p></div>
                </div>
              </div>
              <p style={{ fontSize: "0.8rem", color: "#757575" }}>{description}</p>
              <div className="row mt-2">
                {skills.map((skill, i) => (
                  <img key={i} src={skill.skill} className="o-talent-skills ml-2 mr-2" alt="skill" />
                ))}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-2 mb-1 d-flex justify-content-center">
            <img src={picture} className="rounded-circle o-talent-picture z-depth-1" alt="user" />
          </div>
          <div className="col-12 col-sm-3">
            <button type="button" className="btn z-depth-0 border-primary text-primary font-weight-bold  o-search-talents-btn">Perfil</button>
            <button type="button" className="btn btn-primary border-0 z-depth-0 text-white font-weight-bold o-search-talents-btn">Guardar</button>
          </div>

        </div>
      </div>
    </Fade>
  )
}



CardTalents.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired,
};

export default CardTalents;
