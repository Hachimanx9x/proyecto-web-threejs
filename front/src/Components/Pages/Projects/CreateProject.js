import React, {Component} from "react";
import "./CreateProject.css";
import { MDBInput } from "mdbreact";
import User from "../../../Logos/user-icon.png";
import ProjectIcon from "../../../Logos/project.png";
import ProjectPicture from "../../../ilustracion-equipo-de-trabajo.jpg";
import CardMember from "../../Elements/CardMember/CardMember";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CreateProject extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            projectIcon: null, projectPicture: null, projectName: "", projectDescription: "", projectMembers: [], projectPractices: "",
            members: [
                {
                    name: "Juan Carlos Cruz",
                    urlimage: User,
                    rols: [
                        { rol: "desarrollador web" },
                        { rol: "desarrollador fullstack" },
                        { rol: "ui designer" },
                    ]
                },
                {
                    name: "Juan Carlos Cruz",
                    urlimage: User,
                    rols: [
                        { rol: "desarrollador web" },
                        { rol: "desarrollador fullstack" },
                        { rol: "ui designer" },
                    ]
                },
                {
                    name: "Juan Carlos Cruz",
                    urlimage: User,
                    rols: [
                        { rol: "desarrollador web" },
                        { rol: "desarrollador fullstack" },
                        { rol: "ui designer" },
                    ]
                },
                {
                    name: "Juan Carlos Cruz",
                    urlimage: User,
                    rols: [
                        { rol: "desarrollador web" },
                        { rol: "desarrollador fullstack" },
                        { rol: "ui designer" },
                    ]
                },
                {
                    name: "Juan Carlos Cruz",
                    urlimage: User,
                    rols: [
                        { rol: "desarrollador web" },
                        { rol: "desarrollador fullstack" },
                        { rol: "ui designer" },
                    ]
                }
            ]
        }
    }
    render() {
        return (
            <div className="row" >
                
                <div className="col-xs-12 col-sm-8 o-project-creation-section">
                    <div className="d-flex justify-content-between mb-2">
                        <h4 className="mb-3 pl-4">Creación del projecto</h4>
                        <button className="z-depth-0 border-0 btn btn-primary font-weight-bold">Guardar</button>
                    </div>
                    
                    <div className="row bg-white o-project-basic-info">
                        <div className="col-xs-12 col-sm-4">
                            <small>Icono del proyecto</small>
                            <div className="inputWrapper rounded-pill mb-3">
                                <img src={ProjectIcon} alt={"icon"} className="rounded-circle" style={{width:"3rem"}} />
                                <p className="cyan-text o-icon-input-text">Subir icono<FontAwesomeIcon className="text-secondary ml-2" icon={faAngleDoubleUp} /></p> 
                                <input className="fileInput rounded-pill" type="file" name="file1"/>
                            </div>
                            <small>Portada del proyecto</small>
                            <div className="o-project-form">
                                <img src={ProjectPicture} className="o-picture-project" alt="project" />
                                <div className="inputWrapper o-inputWrapper-btn rounded-pill mb-3">
                                    <small className="cyan-text" style={{ left: "1.4rem", top: "0.6rem", position: "absolute" }}>Subir icono<FontAwesomeIcon className="text-secondary ml-2" icon={faAngleDoubleUp} /></small>
                                    <input className="fileInput rounded-pill" type="file" name="file1" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-4">
                            <MDBInput type="text" label="Nombre del proyecto" outline/>
                        </div>
                        <div className="col-xs-12 col-sm-4">
                            <MDBInput type="textarea" label="Descripción del proyecto" className="rounded" outline/>
                        </div>
                    </div>
                    <div className="row bg-white mt-4 flex-column" style={{borderRadius:"1rem"}}>
                        <h6 className="m-3 pl-4">Integrantes del proyecto</h6>
                        <div className="o-member-selection-container">
                            {this.state.members.map((member, i) => (
                                <CardMember key={i} member={member} />
                            ))}
                        </div>
                    </div>
                   
                </div>
                <div className="col-xs-12 col-sm-4 o-blue-container o-practice-container">
                    <h4 className="mb-3">Practicas para concebir la pre-producción</h4>
                    <div className="bg-white rounded mb-2 p-2">
                        <p className="text-warning">Concebir la experiencia multimedia</p>
                        <div className="d-flex justify-content-between">
                            <input type="checkbox" className="bg-warning mt-2 rounded border-warning" />
                            <a href="#" className="o-btn-partices rounded btn-warning text-white z-depth-0">Mas información</a>
                        </div>
                    </div>
                    <div className="bg-white rounded p-2">
                        <p className="text-success">Sistema multimedia mínimo viable</p>
                        <div className="d-flex justify-content-between">
                            <input type="checkbox" className="bg-warning mt-2 rounded border-warning" />
                            <a href="#" className="o-btn-partices rounded bg-success text-white z-depth-0">Mas información</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateProject;