import React, { useState, useEffect } from "react";
import User from "../../../Logos/user-icon.png";
import { MDBInput } from "mdbreact";
import { Multiselect } from "multiselect-react-dropdown";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rodal from "rodal";

import Axios from "axios";

import "./FinishRegister.css";
import SuccessAnimation from "../../Elements/SuccessAnimation/SuccessAnimation";

export default function ViewProfile(props) {
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState(
    "Desarrollador MERN/FullStack. Maneja herramientas como Reactjs, Node JS, Apollo, GraphQl entre otros."
  );
  const [country, setCountry] = useState("Colombia");
  const [name, setName] = useState("Accel");
  const [lastname, setLastname] = useState("Zero");
  const [cv, setCv] = useState("");
  const [cvpicture, setCvpicture] = useState(null);
  const [years, setYears] = useState({ key: "0 años", cat: 0 });
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [gitlab, setGitlab] = useState("");
  const [bitbucket, setBitbucket] = useState("");
  const [skills, setSkills] = useState([
    {
      id: "1",
      icon: "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
      name: "React JS",
    },
    {
      id: "2",
      icon: "https://www.vectorlogo.zone/logos/angular/angular-icon.svg",
      name: "Angular",
    },
    {
      id: "3",
      icon: "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg",
      name: "Vue JS",
    },
    {
      id: "4",
      icon: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
      name: "Node JS",
    },
  ]);
  const [userLanguages, setLanguages] = useState([]);
  const [userKeywords, setKeyWords] = useState([
    { key: "Desarrollador Web", cat: "Desarrollador Web" },
    { key: "Desarrollador Frontend", cat: "Desarrollador Frontend" },
    { key: "Desarrollador Móvil", cat: "Desarrollador Móvil" },
  ]);

  const [selectedLang, setSelectedLang] = useState([
    {
      key: "Inglés",
      cat: "Inglés",
    },
  ]);
  const [selectedKey, setSelectedKey] = useState([
    { key: "Desarrollador Web", cat: "Desarrollador Web" },
    { key: "Desarrollador Frontend", cat: "Desarrollador Frontend" },
  ]);
  const [test, setTest] = useState([
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
  ]);
  const [selected, setSelected] = useState([
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
  ]);

  const [confirmation, setConfirmation] = useState(false);
  const [modal, setModal] = useState(false);
  const token = localStorage.getItem("login");
  const [languageslist, setLanguageslist] = useState([]);
  const [toolist, setToolist] = useState([]);
  const [errorList, setErrorList] = useState({
    validName: true,
    nameMessage: ".",
    validLastName: true,
    lastnameMessage: " ",
    validYears: true,
    validLang: true,
    validWords: true,
    validSkills: true,
  });
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        Axios.all([
          Axios.get(`http://localhost:3030/api/herramientas`),
          Axios.get(`http://localhost:3030/api/idiomas`),
        ]).then((response) => {
          const tools = [];
          const languages = [];
          for (let i = 0; i < response[0].data.API.length; i++) {
            tools.push({
              cat: {
                id: response[0].data.API[i].id,
                icon: response[0].data.API[i].icono,
                name: response[0].data.API[i].nombre,
              },
              key: response[0].data.API[i].nombre,
            });
            setToolist([...tools]);
          }
          for (let i = 0; i < response[1].data.API.length; i++) {
            languages.push({
              cat: response[1].data.API[i].id,
              key:
                response[1].data.API[i].idiomanombre +
                " " +
                response[1].data.API[i].idiomanivel,
            });
            setLanguageslist([...languages]);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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

  async function handleValidation() {
    const letters = /^[a-z][a-z\s]*$/;
    const errors = errorList;
    //First name validation.
    if (name.trim() === "") {
      errors.validName = false;
      errors.nameMessage = "Por favor ingresa tu nombre";
    } else if (!name.toLocaleLowerCase().match(letters)) {
      errors.validName = false;
      errors.nameMessage = "El apellido solo debe contener letras.";
    } else {
      errors.validName = true;
    }

    //Last name validations.
    if (lastname.trim() === "") {
      errors.validLastName = false;
      errors.lastnameMessage = "Por favor ingresa tu nombre";
    } else if (!lastname.toLocaleLowerCase().match(letters)) {
      errors.validLastName = false;
      errors.lastnameMessage = "El apellido solo debe contener letras.";
    } else {
      errors.lastnameMessage = true;
    }

    //Skills validation
    skills.length === 0
      ? (errors.validSkills = false)
      : (errors.validSkills = true);
    //Languages validation
    userLanguages.length === 0
      ? (errors.validLang = false)
      : (errors.validLang = true);
    //Years validation
    years === null ? (errors.validYears = false) : (errors.validYears = true);
    //Years validation
    userKeywords.length === 0
      ? (errors.validWords = false)
      : (errors.validWords = true);

    setErrorList(errors);
    console.log(errors);
  }

  const updateUserDate = async () => {
    const nullData = null;
    const fullname = name + " " + lastname;
    const skillsdi = [];
    for (let i = 0; i < skills.length; i++) {
      skillsdi.push(skills[i].id);
    }
    const errors = errorList;
    console.log(errors);
    await handleValidation();
    if (
      errors.validSkills &&
      errors.validWords &&
      errors.validYears &&
      errors.validName &&
      errors.validLastName &&
      errors.validLang
    ) {
      try {
        const datform = new FormData();
        datform.append("email", nullData);
        datform.append("password", nullData);
        datform.append("experiencia", years);
        datform.append("nombre", fullname);
        datform.append("descripcion", description);
        datform.append("pais", country);
        datform.append("edad", nullData);
        datform.append("github", github);
        datform.append("gitlab", gitlab);
        datform.append("bitbucket", bitbucket);
        datform.append("linkedin", linkedin);
        datform.append("herramienta", skillsdi);
        datform.append("palabra", userKeywords);
        datform.append("idiomas", userLanguages);
        datform.append("foto", picture);
        datform.append("cv", cvpicture);
        console.log(skillsdi);
        const obj = JSON.parse(token);
        const tokensito = obj.token;
        const options = {
          headers: { authorization: `llave ${tokensito}` },
        };

        const { data } = await Axios.put(
          `http://localhost:3030/actualizar/usuario`,
          datform,
          options
        );
      } catch (error) {
        console.log(error);
      }
      setConfirmation(true);
      setTimeout(() => {
        setModal(false);
        props.history.push("/Dashboard/Projects");
      }, 1200);
    } else {
      setModal(false);
    }
  };

  return (
    <div className="o-register-container">
      <Rodal
        width={300}
        height={160}
        animation={"fade"}
        visible={modal}
        onClose={() => setModal(false)}
      >
        {!confirmation ? (
          <div>
            <h5 className="mt-5 mb-2">¿Guardar cambios?</h5>
            <div className="d-flex justify-content-between p-2">
              <button
                className="z-depth-0 border-primary btn border-primary text-primary font-weight-bold"
                type="button"
                style={{
                  width: "7.2rem",
                  fontSize: "0.8rem",
                  height: "2.5rem",
                }}
                onClick={() => setModal(false)}
              >
                Cancelar
              </button>
              <button
                className="z-depth-0 border-0 btn btn-primary font-weight-bold"
                type="button"
                style={{
                  width: "7.2rem",
                  fontSize: "0.8rem",
                  height: "2.5rem",
                }}
                onClick={updateUserDate}
              >
                Guardar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <SuccessAnimation />
          </div>
        )}
      </Rodal>
      {/* Name, cv, languages, years of experience and keywords section  */}
      <section
        className="bg-white rounded row  p-2 pb-0 pl-0"
        style={{ height: "auto", boxSizing: "border-box" }}
      >
        <div className="col-xs-12 col-sm-3 text-center o-col">
          <p>Foto perfil</p>
          <img
            src={picture === null ? User : picture}
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
              onChange={(e) => {
                const reader = new FileReader();
                try {
                  reader.onload = () => {
                    if (reader.readyState === 2) {
                      setPicture(reader.result);
                    }
                  };
                  reader.readAsDataURL(e.target.files[0]);
                } catch (error) {
                  console.log(
                    "Error en la subida del archivo. Probablemente archivo abortado."
                  );
                }
              }}
            />
          </div>
        </div>
        <div className="col-xs-12 col-sm-3 o-col">
          <p>
            Nombre Completo <strong className="text-danger">*</strong>
          </p>
          <MDBInput
            type="text"
            className={!errorList.validName ? "is-invalid border-danger" : ""}
            label="Nombres"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            outline
            maxLength="115"
          />
          <p
            className={
              (!errorList.validName ? "" : "invisible ") + "o-text-error mb-2"
            }
          >
            {errorList.nameMessage}
          </p>

          <MDBInput
            type="text"
            label="Apellidos"
            value={lastname}
            className={
              !errorList.validLastName ? "is-invalid border-danger" : ""
            }
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            outline
            maxLength="115"
          />
          <p
            className={
              (!errorList.validLastName ? "" : "invisible ") + "o-text-error"
            }
          >
            {errorList.lastnameMessage}
          </p>
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
            maxLength="130"
          />
          <div
            className="row bg-primary p-0 m-0 mt-4"
            style={{ height: "2.3rem" }}
          >
            <div className="col-xs-6 col-sm-6 p-0 m-0 o-up-btn bg-primary ">
              <div className="inputWrapper m-0 bg-primary">
                <p className="text-white o-icon-input-text">Subir foto</p>
                <input
                  className="fileInput rounded-pill"
                  type="file"
                  name="file1"
                  accept="image/*"
                  onChange={(e) => {
                    const reader = new FileReader();
                    try {
                      reader.onload = () => {
                        if (reader.readyState === 2) {
                          setCvpicture(reader.result);
                        }
                      };
                      reader.readAsDataURL(e.target.files[0]);
                    } catch (error) {
                      console.log(
                        "Error en la subida del archivo. Probablemente archivo abortado."
                      );
                    }
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
        <div className="col-xs-12 col-sm-3 o-col mb-0 pb-0 p-2 ">
          <p>
            Años de experiencia <strong className="text-danger">*</strong>
          </p>
          <div className="position-relative">
            <div
              className={
                (!errorList.validYears ? "border-danger" : "") +
                " o-single-select m-0 p-0"
              }
            >
              <select
                onChange={(e) => setYears(e.target.value)}
                className={!errorList.validYears ? "border-danger" : ""}
              >
                <option value={years.cat} selected>
                  {years.key}
                </option>
                {yearsList.map((year) => (
                  <option key={year.cat} value={year.cat}>
                    {year.key}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p
            className={
              (!errorList.validYears ? "" : "invisible ") +
              "o-text-error mt-5 pt-1"
            }
          >
            Campo requerido
          </p>

          <p className="mt-0 mb-0 pb-0">
            Idiomas <strong className="text-danger">*</strong>
          </p>
          <Multiselect
            options={languageslist}
            displayValue="key"
            closeOnSelect={false}
            selectedValues={selectedLang}
            style={
              !errorList.validLang
                ? {
                    searchBox: {
                      border: "1px solid #ff2020",
                    },
                  }
                : {}
            }
            placeholder="Selecciona tus idiomas"
            hidePlaceholder={true}
            selectionLimit="2"
            id="languageT"
            showArrow={true}
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
          <p
            className={
              (!errorList.validLang ? "" : "invisible ") + "o-text-error"
            }
          >
            Seleccione al menos un idioma
          </p>
          <p className=" mb-0 p-0">
            Palabras clave <strong className="text-danger">*</strong>
          </p>
          <Multiselect
            showArrow
            options={keywords}
            displayValue="key"
            selectionLimit="3"
            placeholder="Selecciona...."
            selectedValues={selectedKey}
            hidePlaceholder={true}
            style={
              !errorList.validWords
                ? {
                    searchBox: {
                      border: "1px solid #ff2020",
                    },
                  }
                : {}
            }
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
          <p
            className={
              (errorList.validWords ? "invisible " : "visible ") +
              "o-text-error"
            }
          >
            Seleccione al menos una palabra clave
          </p>
        </div>
      </section>
      {/* Country and description section */}
      <section
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
            value={bitbucket}
            onChange={(e) => {
              setBitbucket(e.target.value);
            }}
            outline
            maxLength="130"
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
            value={linkedin}
            onChange={(e) => {
              setLinkedin(e.target.value);
            }}
            outline
            maxLength="130"
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
            value={gitlab}
            onChange={(e) => {
              setGitlab(e.target.value);
            }}
            outline
            maxLength="130"
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
            value={github}
            onChange={(e) => {
              setGithub(e.target.value);
            }}
            outline
            maxLength="130"
          />
        </div>
      </section>
      {/* Skills section */}
      <section
        className="bg-white rounded mt-3 row text-center p-2"
        style={{ height: "auto" }}
      >
        <div className="col-xs-12 col-sm-12">
          <p>Datos adicionales</p>
        </div>
        <div className="col-xs-12 col-sm-4 text-justify">
          <p>País</p>
          <div className="position-relative">
            <div className="o-single-select m-0 p-0">
              <select onChange={(e) => setCountry(e.target.value)}>
                <option selected>{country}</option>
                {countries.map((country) => (
                  <option key={country.cat} value={country.cat}>
                    {country.key}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-8 text-justify">
          <p>Descripción</p>
          <MDBInput
            type="textarea"
            value={description}
            label="Descripción"
            className="rounded"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            outline
            maxLength="1000"
          />
        </div>
      </section>

      <div
        className="bg-white rounded mt-3 row text-justify p-2"
        style={{ height: "auto" }}
      >
        <div className="col-xs-12 col-sm-4  o-skills-select">
          <p>
            Habilidades <strong className="text-danger">*</strong>
          </p>
          <div className="p-0 pl-3 pr-3 rounded o-list-skill-cont">
            <Multiselect
              options={toolist}
              displayValue="key"
              closeOnSelect={false}
              showArrow={true}
              style={
                !errorList.validSkills
                  ? {
                      searchBox: {
                        border: "1px solid #ff2020",
                      },
                    }
                  : {}
              }
              selectionLimit="7"
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
              id="toolb"
              hidePlaceholder={true}
              placeholder="Selecciona...."
            />
            <p
              className={
                (!errorList.validSkills ? "" : "invisible ") + "o-text-error"
              }
            >
              Seleccione al menos una habilidad
            </p>
          </div>
        </div>
        <div className="col-xs-12 o-col col-sm-8">
          <p>Herramientas Seleccionadas</p>
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
          <button
            onClick={() => setModal(true)}
            className="btn mt-2 bg-primary z-depth-0 text-white"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
