import React, { useState } from "react";
import "./FinishRegister.css";
import User from "../../../Logos/user-icon.png";
import { MDBInput } from "mdbreact";
import { Multiselect } from "multiselect-react-dropdown";

import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FinishRegister() {
    const [picture, setPicture] = useState(null);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [cv, setCv] = useState("");
    const [cvpicture, setCvpicture] = useState(null);
    const [years, setYears] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [gitlab, setGitlab] = useState("");
    const [bitbucket, setBitbucket] = useState("");
    const [skills,setSkills] = useState([]);
    const userLanguages = [];
    const userKeywords = [];
    const languages = [
        { key: 'Inglés', cat: {id:'1',value:"1" }},
        { key: 'Español', cat: '2' },
        { key: 'Alemán', cat: '3' },
        { key: 'Francés', cat: '4' },
        { key: 'Russo', cat: '5' },
        { key: 'Japonés', cat: '6' },
        { key: 'Italiano', cat: '7' },
        { key: 'Sueco', cat: '8' },
        { key: 'Chino', cat: '9' },
        { key: 'Koreano', cat: '10' },
        { key: 'Portugués', cat: '11' },
    ];
    const keywords = [
        { value: 'chocolate', label: 'Desarrollador Web' },
        { value: 'strawberry', label: 'Desarrollador Frontend' },
        { value: 'vanilla', label: 'Desarrollador Móvil' },
        { value: 'vanilla', label: 'Desarrollador Backend' },
        { value: 'vanilla', label: 'Desarrollador FullStack' },
        { value: 'vanilla', label: 'Diseñador Gráfico' },
        { value: 'vanilla', label: 'Diseñador UI' },
        { value: 'vanilla', label: 'Diseñador UX' },
    ];
    const tools = [
        { cat: { id: '1', icon:"https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg", name:"React JS"}, key: 'React js' },
        { cat: { id: '2', icon: "https://www.vectorlogo.zone/logos/angular/angular-icon.svg", name: "Angular" }, key: 'Angular' },
        { cat: { id: "3", icon: "https://www.vectorlogo.zone/logos/vuejs/vuejs-icon.svg", name: "Vue JS" }, key: 'Vue js' },
        { cat: { id: "4", icon: "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg", name: "Node JS" }, key: 'Node js' },
        { cat: { id: "5", icon: "https://www.vectorlogo.zone/logos/python/python-icon.svg", name: "Python" }, key: 'Deno' },
        { cat: { id: "7", icon: "https://www.vectorlogo.zone/logos/php/php-icon.svg", name:"PHP" }, key:"PHP"},
        { cat: { id: "8", icon: "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg", name: "Flutter" }, key: "Flutter" },
        { cat: { id: "9", icon: "https://cdn.worldvectorlogo.com/logos/mysql-7.svg", name: "MySQL" }, key: "MySQL" },
        { cat: { id: "10", icon: "https://www.vectorlogo.zone/logos/golang/golang-official.svg", name: "Golang" }, key: "Golang" },
        { cat: { id: "11", icon: "https://www.vectorlogo.zone/logos/graphql/graphql-icon.svg", name: "GraphQL" }, key: "GraphQL" },
        { cat: { id: "12", icon: "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg", name: "TypeScript" }, key: "TypeScript" },
    ];

    const RemoveSkill = (selectedItem) => {
        if(selectedItem != undefined){
        const skill = skills
        const item = skill.find(iterador => iterador.id == selectedItem.id);
        if (item) {
            skills.splice(item, 1);
            setSkills([...skills]);
        }
        console.log(skills);}
    }
    return (
        <div className="o-register-container">
            <div className="bg-white rounded row p-2" style={{ height: "auto" }}>
                <div className="col-xs-12 col-sm-3 text-center o-col">
                    <p>Foto perfil</p>
                    <img src={picture === null ? User : URL.createObjectURL(picture)} alt={"User profile"} className="o-user-register-pic rounded-circle" />
                    <div className="inputWrapper bg-primary">
                        <p className="text-white o-icon-input-text">Subir foto</p>
                        <input className="fileInput rounded-pill" type="file" name="file1" accept="image/*" onChange={event => {
                            const file = event.target.files[0]; 
                            setPicture(file);
                        }} />
                    </div>
                </div>
                <div className="col-xs-12 col-sm-3 o-col">
                    <p>Nombre Completo</p>
                    <MDBInput type="text" label="Nombres" onChange={e => { setName(e.target.value); }} outline />
                    <MDBInput type="text" label="Apellidos" onChange={e => { setLastname(e.target.value); }} outline />

                </div>
                <div className="col-xs-12 col-sm-3 o-col">
                    <p>Hoja de vida</p>
                    <MDBInput type="text" label="URL/Link" onChange={e => { setCv(e.target.value); }} outline />
                    <div className="row bg-primary p-0 m-0" style={{ height: "2.3rem" }}>
                        <div className="col-xs-6 col-sm-6 p-0 m-0 o-up-btn bg-primary ">
                            <div className="inputWrapper m-0 bg-primary" >
                                <p className="text-white o-icon-input-text">Subir foto</p>
                                <input className="fileInput rounded-pill" type="file" name="file1" onChange={e => { setCvpicture(e.target.files[0]); }} />
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 bg-white o-f" style={{  border: "1px solid #4285F4", lineHeight: "1", padding: "5px 0 0 0.3rem", overflow: "hidden" }}>
                            <small style={{ fontSize: "0.6rem" }}>archivolargodetexto.jpeg</small>
                        </div>

                    </div>
                </div>
                <div className="col-xs-12 col-sm-3 o-col mb-4 pb-5">
                    <p>Años de experiencia</p>
                    
                    <small>Idiomas</small>
                    <Multiselect
                        options={languages}
                        displayValue="key"
                        closeOnSelect={false}
                        placeholder="Selecciona tus idiomas"
                        hidePlaceholder={true}
                        id="languageT"
                        onSelect={(selectedList, selectedItem) => {console.log(selectedItem)}}
                    />

                    <small>Palabras clave</small>
                    <Multiselect
                        options={languages}
                        displayValue="key"
                        placeholder="Selecciona...."
                        hidePlaceholder={true}
                        id="keyWorkdb"
                    />
                </div>
            </div>
            <div className="bg-white rounded mt-3 row text-center p-2" style={{ height: "auto" }}>
                <p className="col-xs-12 col-sm-12">Vincultar con otras plataformas</p>

                <div className="col-xs-12 col-sm-3 text-center o-col">
                    <img src="https://cdn.worldvectorlogo.com/logos/bitbucket-icon.svg" className="o-accounts-link" alt="Bitbucket account" />
                    <MDBInput type="text" label="URL/Bitbucket" onChange={e => { setBitbucket(e.target.value); }} outline />
                </div>
                <div className="col-xs-12 col-sm-3 text-center o-col">
                    <img src="https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg" className="o-accounts-link" alt="Bitbucket account" />
                    <MDBInput type="text" label="URL/LinkedIn" onChange={e => { setLinkedin(e.target.value); }} outline />
                </div>
                <div className="col-xs-12 col-sm-3 text-center o-col">
                    <img src="https://cdn.worldvectorlogo.com/logos/gitlab.svg" className="o-accounts-link" alt="Bitbucket account" />
                    <MDBInput type="text" label="URL/GitLab" onChange={e => { setGitlab(e.target.value); }} outline />
                </div>
                <div className="col-xs-12 col-sm-3 text-center o-col">
                    <img src="https://cdn.worldvectorlogo.com/logos/github-icon-1.svg" className="o-accounts-link" alt="Bitbucket account" />
                    <MDBInput type="text" label="URL/GitHub" onChange={e => { setGithub(e.target.value); }} outline />
                </div>
            </div>
            <div className="bg-white rounded mt-3 row text-center p-2" style={{ height: "auto" }}>
                <div className="col-xs-12 col-sm-4 text-center  o-skills-select">
                    <p>Habilidades</p>
                    <div className="p-0 pl-3 pr-3 rounded o-list-skill-cont">
                        <small style={{ fontSize: "0.6rem" }}>Tipo</small>
                        <hr className="bg-primary mt-0 mb-3" />
                        <Multiselect
                            options={tools}
                            displayValue="key"
                            closeOnSelect={false}
                            onSelect={(selectedList, selectedItem) => {
                                const skill = skills
                                const item = skill.find(iterador => iterador.id == selectedItem.cat.id);
                                if (!item) {
                                    setSkills([...skills, { id: selectedItem.cat.id, icon: selectedItem.cat.icon, name: selectedItem.cat.name }]);  
                                } 
                                console.log(skills);
                            }}
                            onRemove={(selectedList, selectedItem) => { RemoveSkill(selectedItem.cat)  }}
                            id="toolb"
                            hidePlaceholder={true}
                        />
                        {/**<button className="btn mt-2 bg-primary z-depth-0 text-white">Agregar</button>*/}

                    </div>
                </div>
                <div className="col-xs-12 o-col col-sm-9">
                    <p>Herramientas</p>
                    <div className="rounded p-2 pt-3 d-flex o-skill-list-cnt">
                        {skills.map((skill) => (
                            <div key={skill.id} className="o-card-select-skill rounded">
                                <span onClick={()=>{RemoveSkill(skill)}} className="o-x-btn"><FontAwesomeIcon icon={faTimesCircle} /></span>
                                <img className="o-selected-skill-img" alt={skill.name} src={skill.icon} />
                                <div className="bg-primary text-white">
                                    <small style={{ fontSize: "0.65rem" }}>{skill.name}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-xs-12 col-sm-12 d-flex justify-content-end">
                    <button className="btn mt-2 bg-primary z-depth-0 text-white">Guardar</button>
                </div>
            </div>

        </div>
    )
}

/*

 <div className="o-box">
                        <select>
                            <option>Seleccione el número de años</option>
                        </select>
                    </div>
*/