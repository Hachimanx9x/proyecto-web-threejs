import React, { useEffect, useState } from "react";
import "./ContactProfile.css";
import { MDBInput } from "mdbreact";
import User from "../../../Logos/user-icon.png";
import arrow from "../../../Logos/arrow.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export default function ContactProfile() {
  const [keywords, setKeywords] = useState([]);
  useEffect(() => {
    function fetching() {
      const words = ["Desarrollador FullStack", "Programador", "Diseñador Web"];
      const list = [];
      for (let i = 0; i < words.length; i++) {
        const color = "#" + Math.floor(Math.random() * 16777215).toString(16);

        list.push({
          keyword: words[i],
          color: color,
        });
      }
      setKeywords([...list]);
    }
    fetching();
  }, []);
  const tools = [
    {
      name: "React JS",
      description:
        "React es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre. En el proyecto hay más de mil desarrolladores libres.",
      img: "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
    },
    {
      name: "Angular",
      description:
        "Angular es un framework para aplicaciones web desarrollado en TypeScript, de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página.",
      img: "https://www.vectorlogo.zone/logos/angular/angular-icon.svg",
    },
    {
      name: "Vue JS",
      description:
        "Vue.js es un framework de JavaScript de código abierto para la construcción de interfaces de usuario y aplicaciones de una sola página. Fue creado por Evan You, y es mantenido por él y por el resto de los miembros activos del equipo central que provienen de diversas empresas como Netlify y Netguru.",
      img: "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg",
    },
    {
      name: "JavaScript",
      description:
        "JavaScript es un lenguaje de programación interpretado, dialecto del estándar ECMAScript. Se define como orientado a objetos, ​ basado en prototipos, imperativo, débilmente tipado y dinámico.",
      img:
        "https://upload.vectorlogo.zone/logos/javascript/images/239ec8a4-163e-4792-83b6-3f6d96911757.svg",
    },
    {
      name: "TypeScript",
      description:
        "TypeScript es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript, que esencialmente añade tipos estáticos y objetos basados en clases.",
      img:
        "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
    },
    {
      name: "Node JS",
      description:
        "Node.js es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor basado en el lenguaje de programación JavaScript, asíncrono, con E/S de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google. ",
      img: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
    },
    {
      name: "HTML5",
      description:
        "HTML, siglas en inglés de HyperText Markup Language, hace referencia al lenguaje de marcado para la elaboración de páginas web. ",
      img: "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg",
    },
    {
      name: "CSS3",
      description:
        "CSS, en español «Hojas de estilo en cascada», es un lenguaje de diseño gráfico para definir y crear la presentación de un documento estructurado escrito en un lenguaje de marcado.",
      img:
        "https://raw.githubusercontent.com/devicons/devicon/ac557d6ff33ff370a5db99f97aeab35ea5c67fbd/icons/css3/css3-original.svg",
    },
    {
      name: "PHP",
      description:
        "PHP es un lenguaje de programación de uso general que se adapta especialmente al desarrollo web.​ Fue creado inicialmente por el programador danés-canadiense Rasmus Lerdorf en 1994.​ En la actualidad, la implementación de referencia de PHP es producida por The PHP Group.",
      img: "https://www.vectorlogo.zone/logos/php/php-icon.svg",
    },
  ];
  /**
   *   */
  return (
    <div>
      {" "}
      <a href="javascript:history.back()" className="text-decoration-none">
        {" "}
        <button className="o-btn-return">
          <span>
            <img src={arrow} alt="Arrow button" />
          </span>
          Regresar
        </button>
      </a>
      <div className="o-blue-container o-blue-container-2">
        <div className="o-talent-intro">
          <div className="col-12 col-sm-4 mt-4 mt-sm-0 justify-content-center align-items-center d-flex">
            <div className="col-xs-6">
              <img
                src={User}
                className="o-profile-talent-picture rounded-circle"
                alt="Foto de perfil del usuario"
              />
            </div>
            <div className="col-xs-6 ml-2 d-flex justify-content-center align-items-center">
              JUAN CARLOS HURTADO
            </div>
          </div>
        </div>
        <div className="d-flex w-100 flex-wrap">
          <div className="mr-0 mr-sm-1">
            <p className="ml-2 ml-sm-0 pl-3 pl-sm-0">Descripción</p>
            <div className="bg-white rounded o-description-profile-contact mt-2 mb-2 p-1">
              <p className="m-1">
                Programador e ingeniero multimedia con experiencia en entorno
                web para diferentes plataformas y dispositivos me considero una
                persona abierta y dispuesta a resolver retos
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
        <div className="o-talent-tool-list">
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
            maxlength="500"
          />
          <MDBInput
            type="textarea"
            className="m-0 mr-0 rounded"
            label="Cuerpo"
            outline
            maxlength="500"
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
}
