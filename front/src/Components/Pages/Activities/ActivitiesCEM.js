import React, { useEffect, useState } from "react";
import CardActivities from "../../Elements/CardActivities/CardActivities";
import CardDeliverables from "../../Elements/CardDeliverables/CardDeliverables";
import { Doughnut } from "react-chartjs-2";
import Axios from "axios";
import arrow from "../../../Logos/arrow.svg";
import { CEM } from "../Documentation/CEM";
import "./Activities.css";

export default function ActivitiesCEM(props) {
  const [tecniques, setTecniques] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [activities, setActivities] = useState([]);
  const [deliverables, setDeliverables] = useState([]);
  useEffect(() => {
    function searchTecnique() {
      const activities = CEM.actividades;
      const proyectId = props.match.params.id;
      const token = localStorage.getItem("login");
      const obj = JSON.parse(token);
      let temp = obj.token;
      const options = {
        headers: {
          "Content-Type": "application/json",
          authorization: `llave ${temp}`,
        },
      };
      try {
        Axios.get(
          `http://localhost:3030/proyecto/actividades/${proyectId}`,
          options
        ).then((response) => {
          console.log(response);
          setActivities([...response.data.actividades]);
          setDeliverables([...response.data.entregables]);
        });
      } catch (error) {
        console.log(error);
      }
      const array = [];
      for (let i = 0; i < activities.length; i++) {
        for (let j = 0; j < activities[i].herramientas.length; j++) {
          const tecnique = activities[i].herramientas[j];
          const item = array.find((iterador) => iterador === tecnique.nombre);
          if (!item) {
            array.push(tecnique.nombre);
          }
        }
      }
      setFetched(true);
      setTecniques([...array]);
    }
    searchTecnique();
  }, []);
  const data = {
    labels: ["Completado", "Faltante"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#D0A114", "#ddd8d8"],
        hoverBackgroundColor: ["#957411", "rgb(238, 229, 229)"],
      },
    ],
  };
  if (fetched) {
    return (
      <div className="w-100 mb-5 mb-sm-1 pb-5 pb-sm-1">
        <button className="o-btn-return" onClick={() => props.history.goBack()}>
          <span>
            <img src={arrow} alt="Arrow button" />
          </span>
          Regresar
        </button>
        <div className="d-flex justify-content-between p-1">
          <p>Proyecto creación de entornos 3d</p>
          <button className="btn mt-2 bg-primary z-depth-0 text-white">
            Guardar
          </button>
        </div>
        <div className="row">
          <div className="col-xs-12 bg-white rounded z-depth-1 p-0 p-sm-4 mb-2 mr-0 ml-0 mr-sm-4 ml-sm-4 o-activities-col">
            <p className="m-2">Actividades</p>
            {activities.map((activity, i) => (
              <CardActivities
                key={i}
                alfa="cem"
                activity={activity}
                tecniques={tecniques}
              />
            ))}
          </div>
          <div className="col o-deliverables-col bg-white d-flex flex-wrap rounded z-depth-1 p-0 p-sm-1">
            <div>
              <p className="m-2">Entregables</p>
              <div className="o-activities-col">
                {deliverables.map((deliverable, i) => (
                  <CardDeliverables
                    key={i}
                    alfa="cem"
                    deliverable={deliverable}
                  />
                ))}
              </div>
            </div>
            <div>
              {" "}
              <p className="m-2">Estado de alfa</p>
              <div className="position-relative">
                <Doughnut data={data} />
                <p className="o-text-alfa-state o-text-cem">60%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Cargando....</div>;
  }
}
