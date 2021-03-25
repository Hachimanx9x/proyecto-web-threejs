import React, { useState } from "react";
import "./CardTalent.css";
import PropTypes from "prop-types";
import Fade from "../../Fade/Fade";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { Link } from "react-router-dom";

const CardTalents = ({ talent, addTalent }) => {
  const [show, setShow] = useState(true);
  const [modal, setModal] = useState(false);

  const addConfirmation = () => {
    setModal(!modal);
  };

  const addTalents = () => {
    setModal(false);
    setShow(!show);
    addTalent(talent);
    /*
    const token = localStorage.getItem("login");
    try {
      const obj = JSON.parse(token);
      const tokensito = obj.token;
      const options = {
        headers: { authorization: `llave ${tokensito}` },
      };

      const { data } = await Axios.post(
        `http://localhost:3030/agregar/contacto`,
        {
          usuario: talent.id,
          preferencia: false,
        },
        options
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }*/
  };
  const contactrol = (somejob) => {
    let style = "";
    const joblist = [
      "other-job-1",
      "other-job-2",
      "other-job-3",
      "other-job-4",
    ];
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
        <h5 className="mt-5 mb-4">Agregar a {talent.name} a tus contactos?</h5>
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
            onClick={addTalents}
          >
            Agregar
          </button>
        </div>
      </Rodal>
      <Fade show={show}>
        <div className="card p-3 rounded z-depth-0 border-0 mt-3">
          <div className="row">
            <div className="col-12 col-xs-12 col-sm-0 mb-1 d-flex justify-content-center">
              <img
                src={talent.img}
                className="rounded-circle o-talent-picture ml-auto mr-auto z-depth-1 o-show-this"
                alt="user"
              />
            </div>
            <div className="col-12 col-sm-7">
              <div className="o-text-info-contact">
                <div className="row">
                  <div className="col-12 col-sm-5">
                    <h4>{talent.name}</h4>
                  </div>
                  <div className="col-12 col-xs-12 p-0 m-0 col-sm-7 row justify-content-center">
                    {talent.jobs.map((job, i) => (
                      <div
                        key={i}
                        className={
                          contactrol(job) +
                          " rounded-pill o-job-talent ml-0 ml-sm-2"
                        }
                      >
                        <p>{job}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <p
                  className="text-justify"
                  style={{ fontSize: "0.8rem", color: "#757575" }}
                >
                  {talent.description}
                </p>
                <div className="row mt-2">
                  {talent.skills.map((skill, i) => (
                    <img
                      key={i}
                      src={skill}
                      className="o-talent-skills ml-2 mr-2"
                      alt="skill"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-2 mb-1 d-flex justify-content-center">
              <img
                src={talent.img}
                className="rounded-circle o-talent-picture z-depth-1 o-hide-this"
                alt="user"
              />
            </div>
            <div className="col-12 col-sm-3">
              <Link to={`/Dashboard/Contacts/${talent.id}`}>
                <button
                  type="button"
                  className="btn z-depth-0 border-primary text-primary font-weight-bold  o-search-talents-btn"
                >
                  Perfil
                </button>
              </Link>
              <button
                onClick={addConfirmation}
                type="button"
                className="btn btn-primary border-0 z-depth-0 text-white font-weight-bold o-search-talents-btn"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

CardTalents.propTypes = {
  talent: PropTypes.object.isRequired,
};

export default CardTalents;
