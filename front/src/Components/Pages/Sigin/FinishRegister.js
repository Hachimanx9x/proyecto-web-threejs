import React, { useState } from "react";
import "./FinishRegister.css";

export default function FinishRegister(){
    const [picture, setPicture] = useState(null);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [cv, setCv] = useState("");
    const [cvpicture, setCvpicture] = useState(null);
    const [years, setYears] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [hut, setHut] = useState("");
    const [skills, setSkills] = useState([]);
    return (
        <div className="o-register-container">
            <div className="bg-white rounded row">
                <div className="col-xs-12 col-sm-3">
                    Foto perfil
                     
                       <div className="inputWrapper mb-3">
                        
                        <p className="text-white o-icon-input-text">Subir icono</p>
                        <input className="fileInput rounded-pill" type="file" name="file1" />
                    </div>
                </div>
                <div className="col-xs-12 col-sm-3">
                    Nombre Completo
                </div>
                <div className="col-xs-12 col-sm-3">
                    Hoja de vida
                </div>
                <div className="col-xs-12 col-sm-3">
                    Años de experiencia
                </div>
            </div>
        </div>
    )
}