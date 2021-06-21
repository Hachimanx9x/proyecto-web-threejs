import React, { useEffect, useState } from "react";
import "./ContactProfile.css";
import { MDBInput } from "mdbreact";
import User from "../../../Logos/user-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

export default function ContactProfile(props) {
  const [keywords, setKeywords] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [tools, setTools] = useState([]);
  const [fetched, setFetched] = useState(false);
  // const [id, setId] = useState(null);
  useEffect(() => {
    function fetching() {
      const talentoId = props.match.params.id;
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
        Axios.get(`http://localhost:3030/talentos/${talentoId}`, options).then(
          (response) => {
            //setId(response.data.id);
            const words = response.data[0].palabras;
            const list = [];
            const tools = [];
            for (let i = 0; i < words.length; i++) {
              const color =
                "#" + Math.floor(Math.random() * 16777215).toString(16);

              list.push({
                keyword: words[i],
                color: color,
              });
            }
            for (const i of response.data[0].herramientas) {
              tools.push({
                id: i.id,
                name: i.nombre,
                description: i.descripcion,
                img: i.icono,
              });
            }
            setName(response.data[0].nombre);
            setDescription(response.data[0].descripcion);
            setPicture(response.data[0].fotoperfil);
            setTools([...tools]);
            setKeywords([...list]);
            setFetched(true);
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetching();
  }, []);
  if (fetched) {
    return (
      <div>
        <div className="o-blue-container o-blue-container-2">
          <div className="o-talent-intro">
            <div className="col-12 col-sm-3 ">
              <img
                src={picture !== null && picture !== "null" ? picture : User}
                className="o-profile-talent-picture rounded-circle"
                alt="Foto de perfil del usuario"
              />
            </div>
            <div className="col-12 col-sm-6  d-flex justify-content-center align-items-center">
              <p className="text-uppercase">{name} </p>
            </div>
          </div>
          <div className="d-flex w-100 flex-wrap">
            <div className="mr-0 m-auto mr-sm-1">
              <p className="ml-2 ml-sm-0 pl-3 pl-sm-0">Descripción</p>
              <div className="bg-white rounded o-description-profile-contact o-scroll-y mt-2 mb-2 p-1">
                <p className="m-auto">
                  {description !== null && description !== "null"
                    ? description
                    : "Sin descripción."}
                </p>
              </div>
            </div>
            <div className="m-auto">
              <p>Palabras clave</p>
              <div className="bg-white rounded o-keywords-profile-contact mt-2 mb-2 p-1">
                {keywords.map((keyword, i) => (
                  <p className="m-1" key={i}>
                    <FontAwesomeIcon
                      className="mr-2"
                      color={keyword.color}
                      icon={faCircle}
                    />
                    {keyword.keyword}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <p>Herramientas utilizadas</p>
          <div className="o-talent-tool-list o-scoll-y">
            {tools.map((tool, i) => (
              <div className="o-profile-tool" key={i}>
                <img className="o-talent-tool" src={tool.img} alt="User tool" />

                <div className="o-tool-description">
                  <p className="m-0">{tool.name}</p>
                  <small className="text-secondary">{tool.description}</small>
                </div>
              </div>
            ))}
          </div>
          <p>Mandar mensaje</p>
          <div className="bg-white p-2 ml-2 mr-2 m-sm-0  rounded">
            <MDBInput
              className="ml-0 mr-0"
              style={{ maxWidth: "40rem" }}
              label="Asunto"
              outline
              maxLength="500"
            />
            <MDBInput
              type="textarea"
              className="m-0 mr-0 rounded"
              label="Cuerpo"
              outline
              maxLength="500"
            />
            <div className="d-flex justify-content-end">
              <button className="text-capitalize btn border-0 z-depth-0 btn-primary text-white font-weight-bold">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>...Cargando</div>;
  }
}
