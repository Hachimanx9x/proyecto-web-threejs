import React, {Component} from "react";
import "./CreateProject.css";
import { MDBInput } from "mdbreact";
import User from "../../../Logos/user-icon.png";

class CreateProject extends Component {
    constructor(props) {
        super(props);
        this.state = { projectIcon: null, projectPicture:null, projectName: "", projectDescription:"", projectMembers:[],projectPractices:""}
    }
    render() {
        return (
            <div className="row" >
                <div className="col-12 col-xs-12 col-sm-8 o-project-creation-section">
                    <h4 className="mb-3 pl-4">Nombre del projecto</h4>
                    <div className="row bg-white rounded o-project-basic-info">
                        <div className="col-xs-12 col-sm-4">
                            <small>Icono del proyecto</small>
                            <div className="inputWrapper rounded-pill">
                                <p className="cyan-text" style={{margin:"0.7rem 0.1rem 0rem 1.3rem", fontSize:"1rem", position:"absolute"}}>Subir icono</p> 
                                <input className="fileInput rounded-pill" type="file" name="file1"/>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-4">
                            <MDBInput type="text" label="Nombre del proyecto" outline/>
                        </div>
                        <div className="col-xs-12 col-sm-4">
                            <MDBInput type="textarea" label="Descripción del proyecto" className="rounded" outline/>
                        </div>
                    </div>
                    <div className="bg-white rounded">
                        <h6 className="mb-3 pl-4">Integratnes del proyecto</h6>
                        <div className="o-member-selection-container">

                        </div>
                    </div>
                   
                </div>
                <div className="col-12 col-xs-12 col-sm-4">

                </div>
            </div>
        );
    }
}

export default CreateProject;