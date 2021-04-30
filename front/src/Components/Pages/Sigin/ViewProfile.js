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
  const [description, setDescription] = useState(null);
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
  const [skills, setSkills] = useState([]);
  const [userLanguages, setLanguages] = useState([]);
  const [userKeywords, setKeyWords] = useState([]);
  const [selectedLang, setSelectedLang] = useState([]);
  const [selectedKey, setSelectedKey] = useState([]);
  const [test, setTest] = useState([]);
  const [selected, setSelected] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [userPicture, setUserPicture] = useState(null);
  const [cvLink, setCvLink] = useState(null);
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
    const fetchData = async () => {
      const obj = JSON.parse(token);
      const tokensito = obj.token;
      const options = {
        headers: { authorization: `llave ${tokensito}` },
      };
      try {
        Axios.all([
          Axios.get(`http://localhost:3030/api/herramientas`),
          Axios.get(`http://localhost:3030/api/idiomas`),
          Axios.get(`http://localhost:3030/perfil`, options),
        ]).then((response) => {
          const toolList = response[0].data.API;
          const languageList = response[1].data.API;
          const tools = [];
          const languages = [];
          const userData = response[2].data;
          for (let i = 0; i < toolList.length; i++) {
            tools.push({
              cat: {
                id: toolList[i].id,
                icon: toolList[i].icono,
                name: toolList[i].nombre,
              },
              key: toolList[i].nombre,
            });
            setToolist([...tools]);
          }
          for (let i = 0; i < languageList.length; i++) {
            languages.push({
              cat: languageList[i].id,
              key:
                languageList[i].idiomanombre +
                " " +
                languageList[i].idiomanivel,
            });
            setLanguageslist([...languages]);
          }

          const userTools = [];
          const userSelectedTools = [];
          const userWords = [];
          const userSelectedWords = [];
          const userLang = [];
          const userSelecLang = [];
          for (const i of userData.herramienta) {
            userSelectedTools.push({
              cat: {
                id: i.id,
                icon: i.icono,
                name: i.nombre,
              },
              key: i.nombre,
            });
            userTools.push({
              id: i.id,
              icon: i.icono,
              name: i.nombre,
            });
          }
          for (const j of userData.palabra) {
            userSelectedWords.push({
              cat: j,
              key: j,
            });
            userWords.push(j);
          }
          for (const k of userData.idiomas) {
            userSelecLang.push({
              cat: k.id,
              key: k.idiomanombre + " " + k.idiomanivel,
            });
            userLang.push(k.id);
          }
          const half = Math.ceil(userData.nombre.split(" ").length / 2);
          const firstHalf = userData.nombre.split(" ").splice(0, half);
          const secondHalf = userData.nombre
            .split(" ")
            .splice(
              userData.nombre.split(" ").length % 2 === 1 ? -half + 1 : -half
            );
          setName(firstHalf.join(" "));
          setLastname(secondHalf.join(" "));
          setDescription(userData.descripcion);
          setBitbucket(userData.bitbucket);
          setCountry(userData.pais);
          setGithub(userData.github);
          setGitlab(userData.gitlab);
          setLinkedin(userData.linkedin);
          setYears(userData.experiencia);
          setSelectedLang([...userSelecLang]);
          setLanguages([...userLang]);
          setSelectedKey([...userSelectedWords]);
          setKeyWords([...userWords]);
          setTest([...userSelectedTools]);
          setSelected([...userSelectedTools]);
          setSkills([...userTools]);
          setUserPicture(userData.foto);
          setCvLink(userData.cv);
          setFetched(true);
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

        await Axios.put(
          `http://localhost:3030/actualizar/usuario`,
          datform,
          options
        ).then((response) => {
          setModal(false);
          setTimeout(() => {
            setConfirmation(false);
          }, 1200);
        });
      } catch (error) {
        console.log(error);
        setModal(false);
      }
    } else {
      setModal(false);
    }
  };
  if (fetched) {
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
              src={
                picture === null
                  ? userPicture !== null
                    ? userPicture
                    : User
                  : URL.createObjectURL(picture)
              }
              alt={"User profile"}
              className="o-user-register-pic rounded-circle"
            />
            <div className="inputWrapper bg-primary">
              <label htmlFor="user-picture-cv"></label>

              <p className="text-white o-icon-input-text">Subir foto</p>
              <input
                className="fileInput rounded-pill"
                type="file"
                id="user-picture-cv"
                name="file1"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0] !== undefined) {
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
                  <p className="text-white o-icon-input-text">Subir foto</p>
                  <input
                    className="fileInput rounded-pill"
                    type="file"
                    id="user-picture-upload"
                    name="file1"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files[0] !== undefined) {
                        setPicture(e.target.files[0]);
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
                  defaultValue={years.cat}
                  className={!errorList.validYears ? "border-danger" : ""}
                >
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
                <select
                  defaultValue={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
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
  } else {
    return <div>...Cargando</div>;
  }
}
