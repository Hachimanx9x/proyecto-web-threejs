import React, { useState } from "react";
import "./Desktop.css";
import CardDesktop from "../../Elements/CardDesktop/CardDesktop";
import ProjectPicture from "../../../ilustracion-equipo-de-trabajo.jpg";
import ProjectIcon from "../../../Logos/project_icon.png";
import { defaults, Doughnut } from "react-chartjs-2";
import Accordion2 from "../../Elements/Accordion/Accordion2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
defaults.global.legend.display = false;

export default function Desktop() {
  const [active, setActive] = useState();
  const data = {
    labels: ["Completado", "Faltante"],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#4fa77b", "#ddd8d8"],
        hoverBackgroundColor: ["#3c8862", "rgb(238, 229, 229)"],
      },
    ],
  };
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Videojuegos 3d",
      description:
        "Este proyecto es una guía firme de como unir un grupo de trabajo para la creación de un sistema multimedia.",
      image: ProjectPicture,
      icon: ProjectIcon,
      updates: [
        {
          userName: "Juan Carlos Hurtado",
          projectName: "Desarrollo de videojuegos RV",
          activity: "A1",
          date: "13/01/2020",
          hour: "11:30",
          fileName: "foto.png",
          fileUrl:
            "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png",
        },
        {
          userName: "Juan Carlos Hurtado",
          projectName: "Desarrollo de videojuegos RV1",
          activity: "A1",
          date: "13/01/2020",
          hour: "11:30",
          fileName: "foto.png",
          fileUrl:
            "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png",
        },
        {
          userName: "Juan Carlos Hurtado",
          projectName: "Desarrollo de videojuegos RV2",
          activity: "A1",
          date: "13/01/2020",
          hour: "11:30",
          fileName: "foto.png",
          fileUrl:
            "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png",
        },
      ],
    },
    {
      id: 2,
      title: "Videojuegos ameno",
      description:
        "Este proyecto es una guía firme de como unir un grupo de trabajo para la creación de un sistema multimedia.",
      image: ProjectPicture,
      icon: ProjectIcon,
      updates: [
        {
          userName: "Juan Carlos Hurtado",
          projectName: "Desarrollo de videojuegos RV",
          activity: "A1",
          date: "13/01/2020",
          hour: "11:30",
          fileName: "foto.png",
          fileUrl:
            "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png",
        },
        {
          userName: "Juan Carlos Hurtado",
          projectName: "Desarrollo de videojuegos RV1",
          activity: "A1",
          date: "13/01/2020",
          hour: "11:30",
          fileName: "foto.png",
          fileUrl:
            "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png",
        },
        {
          userName: "Juan Carlos Hurtado",
          projectName: "Desarrollo de videojuegos RV2",
          activity: "A1",
          date: "13/01/2020",
          hour: "11:30",
          fileName: "foto.png",
          fileUrl:
            "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png",
        },
      ],
    },
    {
      id: 3,
      title: "Videojuegos latirre",
      description:
        "Este proyecto es una guía firme de como unir un grupo de trabajo para la creación de un sistema multimedia.",
      image: ProjectPicture,
      icon: ProjectIcon,
      updates: [
        {
          userName: "Juan Carlos Hurtado",
          projectName: "Desarrollo de videojuegos RV",
          activity: "A1",
          date: "13/01/2020",
          hour: "11:30",
          fileName: "foto.png",
          fileUrl:
            "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png",
        },
        {
          userName: "Juan Carlos Hurtado",
          projectName: "Desarrollo de videojuegos RV1",
          activity: "A1",
          date: "13/01/2020",
          hour: "11:30",
          fileName: "foto.png",
          fileUrl:
            "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png",
        },
        {
          userName: "Juan Carlos Hurtado",
          projectName: "Desarrollo de videojuegos RV2",
          activity: "A1",
          date: "13/01/2020",
          hour: "11:30",
          fileName: "foto.png",
          fileUrl:
            "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png",
        },
      ],
    },
  ]);
  return (
    <div className="container-fluid mb-5 mb-sm-0 pb-5 pb-sm-0 m-0 p-0">
      <h4 className="mb-3 pl-4">Actualizaciones</h4>

      <div className="o-blue-container o-updates-container">
        <div className="mt-3 mb-0 d-flex justify-content-end">
          <button
            className="btn btn-primary m-0 border-0 text-capitalize  text-white z-depth-0"
            type="button"
          >
            Crear proyecto
          </button>
        </div>
        <section className="d-flex justify-content-center input-group mt-2 pt-1">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar proyecto"
            aria-label="Buscar proyecto"
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary text-white z-depth-0"
              type="button"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </section>
        {projects.map((project, i) => (
          <Accordion2
            title={project.title}
            active={active}
            icon={project.icon}
            projectId={project.id}
            setActive={setActive}
            key={i}
          >
            <div className="o-updates-section">
              {project.updates.map((update, i) => (
                <CardDesktop update={update} key={i} />
              ))}{" "}
            </div>

            <div className="o-collapse-column text-center">
              <div className="h-100">
                <div className="o-grahpcart-project">
                  {" "}
                  <p className="position-absolute">
                    Prácticas completadas en un:
                  </p>
                  <Doughnut data={data} />
                  <p className="o-text-chart">60%</p>
                </div>
              </div>
              <div className="h-100">
                {" "}
                <img
                  src={project.image}
                  alt="Project"
                  className="o-project-update-img"
                />
                <small>{project.description}</small>
                <button className="mt-auto mb-0 m-auto btn btn-primary m-0 border-0 text-capitalize  text-white z-depth-0 text-capitalize">
                  Ingresar
                </button>
              </div>
            </div>
          </Accordion2>
        ))}
      </div>
    </div>
  );
}
