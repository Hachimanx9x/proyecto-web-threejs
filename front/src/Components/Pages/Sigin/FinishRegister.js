import React, { useState, useEffect } from "react";
import User from "../../../Logos/user-icon.png";
import { MDBInput } from "mdbreact";
import { Multiselect } from "multiselect-react-dropdown";
import { faTimesCircle, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rodal from "rodal";

import Axios from "axios";

import "./FinishRegister.css";
import SuccessAnimation from "../../Elements/SuccessAnimation/SuccessAnimation";

export default function FinishRegister(props) {
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState(null);
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [country, setCountry] = useState(null);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [cvpicture, setCvpicture] = useState(null);
  const [years, setYears] = useState(null);
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [gitlab, setGitlab] = useState("");
  const [bitbucket, setBitbucket] = useState("");
  const [skills, setSkills] = useState([]);
  const [userLanguages, setLanguages] = useState([]);
  const [userKeywords, setKeyWords] = useState([]);

  const [test, setTest] = useState([]);
  const [selected, setSelected] = useState([]);

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

  const obj = JSON.parse(token);
  const data = obj.data;
  if (data.herramientas.length !== 0) {
    props.history.push("/Dashboard/Projects");
  }
  const countries = [
    { key: "Alemania", cat: "Alemania" },
    { key: "Brasil", cat: "Brasil" },
    { key: "China", cat: "China" },
    { key: "Colombia", cat: "Colombia" },
    { key: "Costa Rica", cat: "Costa Rica" },
    { key: "Ecuador", cat: "Ecuador" },
    { key: "España", cat: "España" },
    { key: "Francia", cat: "Francia" },
    { key: "Italia", cat: "Italia" },
    { key: "Japón", cat: "Japón" },
    { key: "Korea", cat: "Korea" },
    { key: "Panamá", cat: "Panamá" },
    { key: "Rusia", cat: "Rusia" },
    { key: "Suecia", cat: "Suecia" },
    { key: "Venezuela", cat: "Venezuela" },
    { key: "Otro", cat: "Otro" },
  ];
  const yearsList = [
    { key: "0 años", cat: 0 },
    { key: "1 año", cat: 1 },
    { key: "2 años", cat: 2 },
    { key: "3 años", cat: 3 },
    { key: "4 años", cat: 4 },
    { key: "5 años", cat: 5 },
    { key: "+5 años", cat: 6 },
  ];

  const keywords = [
    { key: "Programador", cat: "Programador" },
    { key: "Ing Multimedia", cat: "Ing Multimedia" },
    { key: "Desarrollador Web", cat: "Desarrollador Web" },
    { key: "Desarrollador FrontEnd", cat: "Desarrollador FrontEnd" },
    { key: "Desarrollador BackEnd", cat: "Desarrollador BackEnd" },
    { key: "Desarrollador Móvil", cat: "Desarrollador Móvil" },
    { key: "Desarrollador FullStack", cat: "Desarrollador FullStack" },
    { key: "Ilustraodr", cat: "Ilustraodr" },
    { key: "Modelador 3d", cat: "Modelador 3d" },
    { key: "Animador 2d", cat: "Animador 2d" },
    { key: "Animador 3d", cat: "Animador 3d" },
    { key: "Diseñador", cat: "Diseñador" },
    { key: "Diseñador Gráfico", cat: "Diseñador Gráfico" },
    { key: "Diseñador UI", cat: "Diseñador UI" },
    { key: "Diseñador UX", cat: "Diseñador UX" },
    { key: "Diseñador de producto", cat: "Diseñador de producto" },
    { key: "Diseñador de fotografía", cat: "Diseñador de fotografía" },
    { key: "Diseñador de Fotografía", cat: "Diseñador de Fotografía" },
    { key: "Productor Audiovisual", cat: "Productor Audiovisual" },
    { key: "Gestor de proyectos", cat: "Gestor de proyectos" },
    { key: "Gestor de Software", cat: "Gestor de Software" },
    { key: "Gestor de Hardware", cat: "Gestor de Hardware" },
    { key: "Analista de datos", cat: "Analista de datos" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("login");

    let isMounted = true;
    function fetchData() {
      try {
        Axios.all([
          Axios.get(`http://localhost:3030/api/herramientas`),
          Axios.get(`http://localhost:3030/api/idiomas`),
        ]).then((response) => {
          if (isMounted) {
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
            }
            for (let i = 0; i < response[1].data.API.length; i++) {
              languages.push({
                cat: response[1].data.API[i].id,
                key:
                  response[1].data.API[i].idiomanombre +
                  " " +
                  response[1].data.API[i].idiomanivel,
              });
              const obj = JSON.parse(token);
              const half = Math.ceil(obj.data.nombre.split(" ").length / 2);
              const firstHalf = obj.data.nombre.split(" ").splice(0, half);
              const secondHalf =
                obj.data.nombre.split(" ").length === 1
                  ? ""
                  : obj.data.nombre
                      .split(" ")
                      .splice(
                        obj.data.nombre.split(" ").length % 2 === 1
                          ? -half + 1
                          : -half
                      );
              setName(firstHalf.join(" "));
              setLastname(
                obj.data.nombre.split(" ").length === 1
                  ? ""
                  : secondHalf.join(" ")
              );
              setToolist([...tools]);
              setLanguageslist([...languages]);
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const RemoveSkill = (selectedItem) => {
    if (selectedItem !== undefined) {
      const skill = skills;
      const t = test;
      const t2 = selected;
      for (let i = 0; i < skill.length; i++) {
        const element = skill[i];
        if (element.id === selectedItem.id) {
          skill.splice(i, 1);
          break;
        }
      }
      for (let i = 0; i < t2.length; i++) {
        const element = t2[i];
        if (element.cat.id === selectedItem.id) {
          t.splice(i, 1);
          break;
        }
      }

      setSkills([...skill]);
      setTest([...t]);
      setSelected([...t]);
    }
  };

  async function handleValidation() {
    const letters = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/;
    const userName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const userLastname = lastname
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const errors = errorList;
    //First name validation.
    if (userName.trim() === "") {
      errors.validName = false;
      errors.nameMessage = "Por favor ingresa tu nombre";
    } else if (!userName.match(letters)) {
      errors.validName = false;
      errors.nameMessage = "El nomber solo debe contener letras.";
    } else {
      errors.validName = true;
    }

    //Last name validations.
    if (userLastname.trim() === "") {
      errors.validLastName = false;
      errors.lastnameMessage = "Por favor ingresa tu apellido";
    } else if (!userLastname.match(letters)) {
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
  }

  const updateUserData = async () => {
    const nullData = null;
    const fullname = name + " " + lastname;
    const skillsdi = [];
    for (let i = 0; i < skills.length; i++) {
      skillsdi.push(skills[i].id);
    }
    const errors = errorList;
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

        const obj = JSON.parse(token);
        const tokensito = obj.token;
        const options = {
          headers: { authorization: `llave ${tokensito}` },
        };
        setConfirmation(true);

        Axios.all([
          await Axios.put(
            `http://localhost:3030/actualizar/usuario`,
            datform,
            options
          ),
          await Axios.get(`http://localhost:3030/perfil`, options),
        ]).then((response) => {
          if (response[1].statusText === "OK") {
            const id = obj.data.id;
            localStorage.setItem(
              "login",
              JSON.stringify({
                token: tokensito,
                data: {
                  id: id,
                  nombre: fullname,
                  foto: response[1].data.foto,
                  herramientas: skills,
                  palabras: userKeywords,
                },
              })
            );
            setModal(false);
            window.location.reload();
          }
          console.log(response);
        });
      } catch (error) {
        console.log(error);
        setModal(false);
      }
    } else {
      setModal(false);
    }
  };

  return (
    <div className="o-register-container">
      <p className="text-danger">* Campos obligatorios</p>
      <Rodal
        width={380}
        height={360}
        animation={"fade"}
        visible={showIntroModal}
        onClose={() => setShowIntroModal(false)}
      >
        <div className="text-center p-3">
          <h1 className="text-primary m-auto text-center">
            <FontAwesomeIcon icon={faUserEdit} style={{ fontSize: "12rem" }} />
          </h1>
          <p className="mt-4">
            Completa tu perfil para acceder a las demás funcionalidades del
            sistema.
          </p>
          <button
            className="btn btn-block btn-primary bg-primary"
            onClick={() => setShowIntroModal(false)}
          >
            Entendido
          </button>
        </div>
      </Rodal>
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
                onClick={updateUserData}
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
            src={picture === null ? User : URL.createObjectURL(picture)}
            alt={"User profile"}
            className="o-user-register-pic rounded-circle"
          />
          <div className="inputWrapper bg-primary">
            <label htmlFor="user-picture-upload"></label>
            <p className="text-white o-icon-input-text">Subir foto</p>
            <input
              className="fileInput rounded-pill"
              type="file"
              id="user-picture-upload"
              name="file1"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0] !== undefined) {
                  if (
                    /(?:\.([^.]+))?$/.exec(e.target.files[0].name)[1] === "svg"
                  ) {
                    alert(
                      "Solo se permiten archivos jpg, png, pdf, gif o webp"
                    );
                    return;
                  }
                  setPicture(e.target.files[0]);
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
            className={
              !errorList.validLastName ? "is-invalid border-danger" : ""
            }
            value={lastname}
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
          <MDBInput type="text" label="URL/Link" outline maxLength="130" />
          <div
            className="row bg-primary p-0 m-0 mt-4"
            style={{ height: "2.3rem" }}
          >
            <div className="col-xs-6 col-sm-6 p-0 m-0 o-up-btn bg-primary ">
              <div className="inputWrapper m-0 bg-primary">
                <label htmlFor="user-picture-cv"></label>

                <p className="text-white o-icon-input-text">Subir archivo</p>
                <input
                  className="fileInput rounded-pill"
                  type="file"
                  id="user-picture-cv"
                  name="file1"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0] !== undefined) {
                      if (
                        /(?:\.([^.]+))?$/.exec(e.target.files[0].name)[1] ===
                        "svg"
                      ) {
                        alert(
                          "Solo se permiten archivos jpg, png, pdf, gif o webp"
                        );
                        return;
                      }
                      setCvpicture(e.target.files[0]);
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
                <option hidden>Seleccione</option>
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
              "o-text-error mt-5 pt-1 "
            }
          >
            Campo requerido
          </p>

          <p className="mt-0 mb-0 pb-0 ">
            Idiomas <strong className="text-danger">*</strong>
            <small>(Max. 2)</small>
          </p>
          <Multiselect
            options={languageslist}
            displayValue="key"
            closeOnSelect={false}
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
          <p className="mt-0 mb-0 p-0 ">
            Palabras clave <strong className="text-danger">*</strong>
            <small>(Max. 3)</small>
          </p>
          <Multiselect
            showArrow
            options={keywords}
            displayValue="key"
            selectionLimit="3"
            placeholder="Selecciona...."
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
                <option hidden>Seleccione</option>
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
            <small>(Max. 7)</small>
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
          <div className="rounded p-2 pt-3 d-flex o-skill-list-cnt o-scroll-x">
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
                <div className="bg-primary text-white text-center">
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
