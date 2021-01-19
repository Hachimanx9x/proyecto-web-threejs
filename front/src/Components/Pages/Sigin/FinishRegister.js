import React, { useState } from "react";
import "./FinishRegister.css";
import User from "../../../Logos/user-icon.png";
import { MDBInput } from "mdbreact";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function FinishRegister() {
    const [picture, setPicture] = useState();
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [cv, setCv] = useState("");
    const [cvpicture, setCvpicture] = useState(null);
    const [years, setYears] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [gitlab, setGitlab] = useState("");
    const [bitbucket, setBitbucket] = useState("");
    const [skills, setSkills] = useState([]);
    const languages = [
        { value: 'chocolate', label: 'Inglés' },
        { value: 'strawberry', label: 'Español' },
        { value: 'vanilla', label: 'Alemán' },
        { value: 'chocolate', label: 'Francés' },
        { value: 'strawberry', label: 'Russo' },
        { value: 'vanilla', label: 'Japonés' },
        { value: 'vanilla', label: 'Italiano' },
        { value: 'vanilla', label: 'Sueco' },
        { value: 'vanilla', label: 'Chino' },
        { value: 'vanilla', label: 'Koreano' },
        { value: 'vanilla', label: 'Portugués' },
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
    ]
    let data = new FormData();
    const animatedComponents = makeAnimated();

    return (
        <div className="o-register-container">
            <div className="bg-white rounded row p-2" style={{ height: "auto" }}>
                <div className="col-xs-12 col-sm-3 text-center o-col">
                    <p>Foto perfil</p>
                    <img src={User} alt={"User profile"} className="o-user-register-pic rounded-circle" />
                    <div className="inputWrapper bg-primary">
                        <p className="text-white o-icon-input-text">Subir foto</p>
                        <input className="fileInput rounded-pill" type="file" name="file1" onChange={e => { setPicture(e.target.files[0]); }} />
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
                        <div className="col-xs-6 col-sm-6  p-0 m-0 bg-primary ">
                            <div className="inputWrapper m-0 bg-primary" >
                                <p className="text-white o-icon-input-text">Subir foto</p>
                                <input className="fileInput rounded-pill" type="file" name="file1" onChange={e => { setCvpicture(e.target.files[0]); }} />
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 bg-white" style={{ border: "1px solid #4285F4", lineHeight: "1", padding: "5px 0 0 0.3rem", overflow: "hidden" }}>
                            <small style={{ fontSize: "0.6rem" }}>archivolargodetexto.jpeg</small>
                        </div>

                    </div>
                </div>
                <div className="col-xs-12 col-sm-3 o-col mb-4 pb-5">
                    <p>Años de experiencia</p>
                    <div className="o-box">
                        <select>
                            <option>Seleccione el número de años</option>
                            <option>1</option>
                            <option>2</option>
                            <option>4</option>
                            <option>5</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>Más de 10</option>
                        </select>
                    </div>
                    <small>Idiomas</small>
                    <Select options={languages} closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti />
                    <small>Palabras clave</small>
                    <Select options={keywords} closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti  />
                </div>
            </div>
            <div className="bg-white rounded mt-3 row text-center" style={{ height: "auto" }}>
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
            <div className="bg-white rounded mt-3 row text-center" style={{ height: "auto" }}>
                <div className="col-xs-12 col-sm-4  o-skills-select">
                    <p>Habilidades</p>
                    <div className="p-0 pl-1 pr-3 rounded" style={{ border: "1px solid #4285F4", height: "8.3rem" }}>
                        <small style={{ fontSize: "0.6rem" }}>Tipo</small>
                        <hr className="bg-primary mt-0 mb-3" />
                        <div className="o-box mt-0 mb-3">
                            <select>
                                <option>Seleccione una herramienta</option>
                                <option>1</option>
                                <option>1</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 o-col col-sm-9">
                    <p>Herramientas</p>
                    <div className="rounded" style={{ border: "1px solid #4285F4" }}>

                    </div>
                </div>
            </div>

        </div>
    )
}