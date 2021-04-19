import React, { useEffect, useState } from "react";
import "./Desktop.css";
import CardDesktop from "../../Elements/CardDesktop/CardDesktop";
import ProjectPicture from "../../../ilustracion-equipo-de-trabajo.jpg";
import ProjectIcon from "../../../Logos/project_icon.png";
import { defaults, Doughnut } from "react-chartjs-2";
import axios from "axios";
import Accordion2 from "../../Elements/Accordion/Accordion2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
defaults.global.legend.display = false;

export default function Desktop() {
  const [active, setActive] = useState();
  const [keyWord, setKeyWord] = useState("");
  const [fetched, setFetched] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    function fetchData() {
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
        axios
          .all([axios.get(`http://localhost:3030/escritorio`, options)])
          .then((response) => {
            console.log(response[0].data.proyectos);
            const temp = response[0].data.proyectos;
            const projects = [];

            for (const i of temp) {
              const practices = [];
              for (const j of i.practicas) {
                if (j.practica === "Sistema Multimedia mínimo viable") {
                  practices.push({
                    name: j.practica,
                    data: {
                      labels: ["Completado", "Faltante"],
                      datasets: [
                        {
                          data: [j.porcentaje, 100 - j.porcentaje],
                          backgroundColor: ["#4fa77b", "#ddd8d8"],
                          hoverBackgroundColor: [
                            "#3c8862",
                            "rgb(238, 229, 229)",
                          ],
                        },
                      ],
                    },
                  });
                } else {
                  practices.push({
                    name: j.practica,
                    data: {
                      labels: ["Completado", "Faltante"],
                      datasets: [
                        {
                          data: [j.porcentaje, 100 - j.porcentaje],
                          backgroundColor: ["#D0A114", "#ddd8d8"],
                          hoverBackgroundColor: [
                            "#957411",
                            "rgb(238, 229, 229)",
                          ],
                        },
                      ],
                    },
                  });
                }
              }
              projects.push({
                id: i.id,
                title: i.title,
                icon: i.icon !== null ? i.icon : ProjectIcon,
                image: i.image !== null ? i.image : ProjectPicture,
                description: i.descripcion,
                practices: [...practices],
                updates: [...i.updates],
              });
            }
            setProjects([...projects]);
            setShow([...projects]);
            setFetched(true);
          });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const [show, setShow] = useState([...projects]);
  function search() {
    const array = [];
    if (keyWord.trim() !== "") {
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const contain = project.title
          .toLocaleLowerCase()
          .includes(keyWord.toLocaleLowerCase());
        contain ? array.push(project) : console.log("D :");
      }
      setShow([...array]);
    } else {
      setShow([...projects]);
    }
  }
  if (!fetched) {
    return <div>Cargando....</div>;
  } else {
    return (
      <div className="container-fluid mb-5 mb-sm-0 pb-5 pb-sm-0 m-0 p-0">
        <h4 className="mb-3 pl-4">Proyectos</h4>

        <div className="o-blue-container o-updates-container">
          <div className="mt-3 mb-0 d-flex justify-content-end">
            <a
              className="btn btn-primary m-0 border-0 text-capitalize  text-white z-depth-0"
              type="button"
              href="/Dashboard/Projects/CreateProject"
            >
              Crear proyecto
            </a>
          </div>
          <section className="d-flex justify-content-center input-group mt-2 pt-1">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar proyecto"
              aria-label="Buscar proyecto"
              onChange={(e) => setKeyWord(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary text-white z-depth-0"
                type="button"
                onClick={search}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </section>
          {show.length !== 0 ? (
            show.map((project, i) => (
              <Accordion2
                title={project.title}
                active={active}
                icon={project.icon}
                projectId={project.id}
                setActive={setActive}
                number={project.updates.length}
                key={i}
              >
                <div
                  className={
                    "o-updates-section" +
                    (project.updates.length === 0 ? " overflow-hidden" : "")
                  }
                >
                  {project.updates.length !== 0 ? (
                    project.updates.map((update, i) => (
                      <CardDesktop update={update} key={i} />
                    ))
                  ) : (
                    <div className="d-flex h-100 justify-content-center align-items-center">
                      <p className="text-secondary">
                        No hay actualizaciones para mostrar
                      </p>
                    </div>
                  )}
                </div>

                <div className="o-collapse-column text-center">
                  <div className="o-accord-scroll">
                    {project.practices.map((practice, i) => (
                      <div key={i}>
                        <small
                          className="text-center position-absolute"
                          style={{
                            fontSize: "12px",
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                        >
                          Actividades del{" "}
                          {practice.name === "Sistema Multimedia mínimo viable"
                            ? "SMMV"
                            : "CEM"}{" "}
                          completadas en un:
                        </small>
                        <div className="o-grahpcart-project mt-4">
                          <Doughnut data={practice.data} />
                          <p
                            className="o-text-chart"
                            style={
                              practice.name ===
                              "Sistema Multimedia mínimo viable"
                                ? { color: "#4fa77b" }
                                : { color: "#D0A114" }
                            }
                          >
                            {practice.data.datasets[0].data[0]}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="h-auto ">
                    <img
                      src={project.image}
                      alt="Project"
                      className="o-project-update-img"
                    />
                    <small>{project.description}</small>
                    <a
                      className="mt-auto mb-0 m-auto btn btn-primary m-0 border-0 text-capitalize  text-white z-depth-0 text-capitalize"
                      href={`/Dashboard/Projects/${project.id}`}
                    >
                      Ingresar
                    </a>
                  </div>
                </div>
              </Accordion2>
            ))
          ) : (
            <div className="d-flex h-75">
              <p className="m-auto text-secondary">No tienes ningún proyecto</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
/*
class Desktop extends Component {
  constructor(props) {
    super(props);
    this.setActive = this.setActive.bind(this);
    this.state = {

      color: "#80BD01",
      bgcolor: "#CFEC92",
      datagraph: [65, 59, 0, 0, 0, 0, 0],
      active: "",
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
          projectName: "Desarrollo de videojuegos RV",
          activity: "A1",
          date: "13/01/2020",
          hour: "11:30",
          fileName: "foto.png",
          fileUrl:
            "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png",
        },
      ],
    };
  }
  setActive = () => {
    this.setState({})
  }
  /*
  componentDidMount() {
    const token = localStorage.getItem("login");
    const obj = JSON.parse(token);
    const tokensito = obj.token;
    const httpInstance = axios.create({
      baseURL: "http://localhost:3030/",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
        authorization: `llave ${tokensito}`,
      },
    }); //

    httpInstance.interceptors.response.use(null, (error) => {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
      if (!expectedError) {
        // Loggear mensaje de error a un servicio como Sentry
        // Mostrar error genérico al usuario
        return Promise.reject(error);
      }
    });
    //------
    httpInstance
      .get("escritorio")
      .then((respuesta) => {
        if (respuesta.statusText === "OK") {
          console.log(respuesta.data);
        } else {
          console.log("error fatal");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    //#bc8a01 eaea91
    const data = {
      labels: ["Oportunidad", "Valor sm", "", "", "", "", ""],
      datasets: [
        {
          backgroundColor: this.state.bgcolor,
          borderColor: this.state.color,
          pointBackgroundColor: this.state.color,
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: this.state.datagraph,
        },
      ],
    };
    return (
      <div className="container-fluid mb-5 mb-sm-0 pb-5 pb-sm-0 ">
        <h4 className="mb-3 pl-4">Actualizaciones</h4>

        <div className="o-blue-container o-updates-section">
          <div className="o-updates-container">
            {this.state.updates.map((update, i) => (
              <Accordion2 key={i}>
                <CardDesktop update={update} key={i} />
              </Accordion2>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Desktop;
*/
