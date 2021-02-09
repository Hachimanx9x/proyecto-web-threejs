import React, { useState } from "react";
import User from "../../../Logos/user-icon.png";
import { MDBInput } from "mdbreact";
import { Multiselect } from "multiselect-react-dropdown";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./FinishRegister.css";

export default function FinishRegister(props) {
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState();
  const [country, setCountry] = useState();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [cv, setCv] = useState("");
  const [cvpicture, setCvpicture] = useState(null);
  const [years, setYears] = useState();
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [gitlab, setGitlab] = useState("");
  const [bitbucket, setBitbucket] = useState("");
  const [skills, setSkills] = useState([]);
  const [userLanguages, setLanguages] = useState([]);
  const [userKeywords, setKeyWords] = useState([]);
  const [test, setTest] = useState([]);
  const [selected, setSelected] = useState([]);

  const countries = [
    { key: "Alemania", cat: "Alemania" },
    { key: "Brasil", cat: "Brasil" },
    { key: "China", cat: "China" },
    { key: "Colombia", cat: "Colombia" },
    { key: "España", cat: "España" },
    { key: "Francia", cat: "Francia" },
    { key: "Italia", cat: "Italia" },
    { key: "Japón", cat: "Japón" },
    { key: "Korea", cat: "Korea" },
    { key: "Rusia", cat: "Rusia" },
    { key: "Suecia", cat: "Suecia" },
  ];
  const yearsList = [
    { key: "0 años", cat: 0 },
    { key: "1 año", cat: 1 },
    { key: "2 años", cat: 2 },
    { key: "3 años", cat: 3 },
    { key: "4 años", cat: 4 },
    { key: "5 años", cat: 5 },
  ];
  const languageslist = [
    { key: "Inglés", cat: "Inglés" },
    { key: "Español", cat: "Español" },
    { key: "Alemán", cat: "Alemán" },
    { key: "Francés", cat: "Francés" },
    { key: "Russo", cat: "Russo" },
    { key: "Japonés", cat: "Japonés" },
    { key: "Italiano", cat: "Italiano" },
    { key: "Sueco", cat: "Sueco" },
    { key: "Chino", cat: "Chino" },
    { key: "Koreano", cat: "Koreano" },
    { key: "Portugués", cat: "Portugués" },
  ];
  const keywords = [
    { key: "Desarrollador Web", cat: "Desarrollador Web" },
    { key: "Desarrollador Frontend", cat: "Desarrollador Frontend" },
    { key: "Desarrollador Móvil", cat: "Desarrollador Móvil" },
    { key: "Desarrollador Backend", cat: "Desarrollador Backend" },
    { key: "Desarrollador FullStack", cat: "Desarrollador FullStack" },
    { key: "Diseñador Gráfico", cat: "Diseñador Gráfico" },
    { key: "Diseñador UI", cat: "Diseñador UI" },
    { key: "Diseñador UX", cat: "Diseñador UX" },
  ];
  const tools = [
    {
      cat: {
        id: "1",
        icon: "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
        name: "React JS",
      },
      key: "React js",
    },
    {
      cat: {
        id: "2",
        icon: "https://www.vectorlogo.zone/logos/angular/angular-icon.svg",
        name: "Angular",
      },
      key: "Angular",
    },
    {
      cat: {
        id: "3",
        icon: "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg",
        name: "Vue JS",
      },
      key: "Vue js",
    },
    {
      cat: {
        id: "4",
        icon: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
        name: "Node JS",
      },
      key: "Node js",
    },
    {
      cat: {
        id: "5",
        icon: "https://www.vectorlogo.zone/logos/python/python-icon.svg",
        name: "Python",
      },
      key: "Python",
    },
    {
      cat: {
        id: "7",
        icon: "https://www.vectorlogo.zone/logos/php/php-icon.svg",
        name: "PHP",
      },
      key: "PHP",
    },
    {
      cat: {
        id: "8",
        icon: "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg",
        name: "Flutter",
      },
      key: "Flutter",
    },
    {
      cat: {
        id: "9",
        icon: "https://cdn.worldvectorlogo.com/logos/mysql-7.svg",
        name: "MySQL",
      },
      key: "MySQL",
    },
    {
      cat: {
        id: "10",
        icon: "https://www.vectorlogo.zone/logos/golang/golang-official.svg",
        name: "Golang",
      },
      key: "Golang",
    },
    {
      cat: {
        id: "11",
        icon: "https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg",
        name: "GraphQL",
      },
      key: "GraphQL",
    },
    {
      cat: {
        id: "12",
        icon:
          "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
        name: "TypeScript",
      },
      key: "TypeScript",
    },
  ];

  const RemoveSkill = (selectedItem) => {
    if (selectedItem !== undefined) {
      const skill = skills;
      const item = skill.find((iterador) => iterador.id === selectedItem.id);
      const t = test;
      const t2 = selected;
      const item2 = t2.find((iterador) => iterador.cat.id === selectedItem.id);
      if (item) {
        skill.splice(item, 1);
        t.splice(item2, 1);
        setSkills([...skill]);
        setTest([...t]);
        setSelected([...t]);
      }
    }
  };

  return (
    <div className="o-register-container">
      <div className="bg-white rounded row p-2" style={{ height: "auto" }}>
        <div className="col-xs-12 col-sm-3 text-center o-col">
          <p>Foto perfil</p>
          <img
            src={picture === null ? User : URL.createObjectURL(picture)}
            alt={"User profile"}
            className="o-user-register-pic rounded-circle"
          />
          <div className="inputWrapper bg-primary">
            <p className="text-white o-icon-input-text">Subir foto</p>
            <input
              className="fileInput rounded-pill"
              type="file"
              name="file1"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];
                setPicture(file);
              }}
            />
          </div>
        </div>
        <div className="col-xs-12 col-sm-3 o-col">
          <p>Nombre Completo</p>
          <MDBInput
            type="text"
            label="Nombres"
            onChange={(e) => {
              setName(e.target.value);
            }}
            outline
          />
          <MDBInput
            type="text"
            label="Apellidos"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            outline
          />
        </div>
        <div className="col-xs-12 col-sm-3 o-col">
          <p>Hoja de vida</p>
          <MDBInput
            type="text"
            label="URL/Link"
            onChange={(e) => {
              setCv(e.target.value);
            }}
            outline
          />
          <div className="row bg-primary p-0 m-0" style={{ height: "2.3rem" }}>
            <div className="col-xs-6 col-sm-6 p-0 m-0 o-up-btn bg-primary ">
              <div className="inputWrapper m-0 bg-primary">
                <p className="text-white o-icon-input-text">Subir foto</p>
                <input
                  className="fileInput rounded-pill"
                  type="file"
                  name="file1"
                  onChange={(e) => {
                    setCvpicture(e.target.files[0]);
                  }}
                />
              </div>
            </div>
            <div
              className="col-xs-6 col-sm-6 bg-white o-f"
              style={{
                border: "1px solid #4285F4",
                lineHeight: "1",
                padding: "5px 0 0 0.3rem",
                overflow: "hidden",
              }}
            >
              <small style={{ fontSize: "0.6rem" }}>
                {cvpicture === null ? "" : cvpicture.name}
              </small>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-3 o-col mb-4 pb-5">
          <p>Años de experiencia</p>
          <Multiselect
            options={yearsList}
            displayValue="key"
            singleSelect
            closeOnSelect={false}
            onSelect={(selectedList, selectedItem) => {
              const year = selectedItem.cat;
              setYears(year);
            }}
            id="years"
            hidePlaceholder={true}
            placeholder="Selecciona...."
          />
          <small>Idiomas</small>
          <Multiselect
            options={languageslist}
            displayValue="key"
            closeOnSelect={false}
            placeholder="Selecciona tus idiomas"
            hidePlaceholder={true}
            selectionLimit="2"
            id="languageT"
            onSelect={(selectedList, selectedItem) => {
              const lang = userLanguages;
              const item = lang.find(
                (iterador) => iterador === selectedItem.cat
              );
              if (!item) {
                setLanguages([...lang, selectedItem.cat]);
              }
            }}
            onRemove={(selectedList, selectedItem) => {
              const lang = userLanguages;
              const item = lang.find(
                (iterador) => iterador === selectedItem.cat
              );
              if (item) {
                lang.splice(item, 1);
                setLanguages([...lang]);
              }
            }}
          />

          <small>Palabras clave</small>
          <Multiselect
            options={keywords}
            displayValue="key"
            selectionLimit="4"
            placeholder="Selecciona...."
            hidePlaceholder={true}
            id="keyWorkdb"
            onSelect={(selectedList, selectedItem) => {
              const keyword = userKeywords;
              const item = keyword.find(
                (iterador) => iterador === selectedItem.cat
              );
              if (!item) {
                setKeyWords([...keyword, selectedItem.cat]);
              }
            }}
            onRemove={(selectedList, selectedItem) => {
              const keyword = userKeywords;
              const item = keyword.find(
                (iterador) => iterador === selectedItem.cat
              );
              if (item) {
                keyword.splice(item, 1);
                setKeyWords([...keyword]);
              }
            }}
          />
        </div>
      </div>
      <div
        className="bg-white rounded mt-3 row text-center p-2"
        style={{ height: "auto" }}
      >
        <p className="col-xs-12 col-sm-12">Vincultar con otras plataformas</p>

        <div className="col-xs-12 col-sm-3 text-center o-col">
          <img
            src="https://cdn.worldvectorlogo.com/logos/bitbucket-icon.svg"
            className="o-accounts-link"
            alt="Bitbucket account"
          />
          <MDBInput
            type="text"
            label="URL/Bitbucket"
            onChange={(e) => {
              setBitbucket(e.target.value);
            }}
            outline
          />
        </div>
        <div className="col-xs-12 col-sm-3 text-center o-col">
          <img
            src="https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg"
            className="o-accounts-link"
            alt="Bitbucket account"
          />
          <MDBInput
            type="text"
            label="URL/LinkedIn"
            onChange={(e) => {
              setLinkedin(e.target.value);
            }}
            outline
          />
        </div>
        <div className="col-xs-12 col-sm-3 text-center o-col">
          <img
            src="https://cdn.worldvectorlogo.com/logos/gitlab.svg"
            className="o-accounts-link"
            alt="Bitbucket account"
          />
          <MDBInput
            type="text"
            label="URL/GitLab"
            onChange={(e) => {
              setGitlab(e.target.value);
            }}
            outline
          />
        </div>
        <div className="col-xs-12 col-sm-3 text-center o-col">
          <img
            src="https://cdn.worldvectorlogo.com/logos/github-icon-1.svg"
            className="o-accounts-link"
            alt="Bitbucket account"
          />
          <MDBInput
            type="text"
            label="URL/GitHub"
            onChange={(e) => {
              setGithub(e.target.value);
            }}
            outline
          />
        </div>
      </div>
      <div
        className="bg-white rounded mt-3 row text-center p-2"
        style={{ height: "auto" }}
      >
        <div className="col-xs-12 col-sm-12">
          <p>Datos adicionales</p>
        </div>
        <div className="col-xs-12 col-sm-8">
          <p>Descripción</p>
          <MDBInput
            type="textarea"
            label="Descripción"
            className="rounded"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            outline
          />
        </div>
        <div className="col-xs-12 col-sm-4">
          <p>País</p>
          <Multiselect
            options={countries}
            displayValue="key"
            singleSelect
            closeOnSelect={false}
            onSelect={(selectedList, selectedItem) => {
              const temcountry = selectedItem.cat;
              setCountry(temcountry);
            }}
            id="country"
            hidePlaceholder={true}
            placeholder="Selecciona...."
          />
        </div>
      </div>

      <div
        className="bg-white rounded mt-3 row text-center p-2"
        style={{ height: "auto" }}
      >
        <div className="col-xs-12 col-sm-4 text-center  o-skills-select">
          <p>Habilidades</p>
          <div className="p-0 pl-3 pr-3 rounded o-list-skill-cont">
            <small style={{ fontSize: "0.6rem" }}>Tipo</small>
            <hr className="bg-primary mt-0 mb-3" />
            <Multiselect
              options={tools}
              selectionLimit="7"
              displayValue="key"
              closeOnSelect={false}
              selectedValues={selected.length % 2 === 0 ? selected : selected}
              onSelect={(selectedList, selectedItem) => {
                const skill = skills;
                const item = skill.find(
                  (iterador) => iterador.id === selectedItem.cat.id
                );
                const skillList = [
                  ...selected,
                  { cat: selectedItem.cat, key: selectedItem.key },
                ];
                if (!item) {
                  setTest([...skillList]);
                  setSelected([...skillList]);

                  setSkills([
                    ...skills,
                    {
                      id: selectedItem.cat.id,
                      icon: selectedItem.cat.icon,
                      name: selectedItem.cat.name,
                    },
                  ]);
                }
              }}
              onRemove={(selectedList, selectedItem) => {
                RemoveSkill(selectedItem.cat);
              }}
              id="sb"
              hidePlaceholder={true}
              placeholder="Selecciona...."
            />
          </div>
        </div>
        <div className="col-xs-12 o-col col-sm-9">
          <p>Herramientas</p>
          <div className="rounded p-2 pt-3 d-flex o-skill-list-cnt">
            {skills.map((skill) => (
              <div key={skill.id} className="o-card-select-skill rounded">
                <span
                  onClick={() => {
                    RemoveSkill(skill);
                  }}
                  className="o-x-btn"
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                </span>
                <img
                  className="o-selected-skill-img bg-white"
                  alt={skill.name}
                  src={skill.icon}
                />
                <div className="bg-primary text-white">
                  <small style={{ fontSize: "0.65rem" }}>{skill.name}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-xs-12 col-sm-12 d-flex justify-content-end">
          <a href="/login" className="btn mt-2 bg-primary z-depth-0 text-white">
            Guardar
          </a>
        </div>
      </div>
    </div>
  );
}
