import React, { Component } from "react";
import "./Desktop.css";
import CardDesktop from "../../Elements/CardDesktop/CardDesktop";

class Desktop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updates: [
                { userName: "Juan Carlos Hurtado", projectName: "Desarrollo de videojuegos RV", activity: "A1", date: "", hour: "", fileName: "", fileUrl: "" },
                { userName: "Juan Carlos Hurtado", projectName: "Desarrollo de videojuegos RV", activity: "A1", date: "", hour: "", fileName: "", fileUrl: "" },
                { userName: "Juan Carlos Hurtado", projectName: "Desarrollo de videojuegos RV", activity: "A1", date: "", hour: "", fileName: "", fileUrl: "" }
            ]
        }
    }
    render() {
        return (
            <div className="row" >
                <div className="col-12 col-xs-12 col-sm-8 o-blue-container o-updates-section"  >
                    <h4 className="mb-3 pl-4">Actualizaciones</h4>
                    <div className="o-updates-container">
                        {/* 
                        {this.state.updates.map((update)=>(
                            <div></div>
                        ))}
                        */}
                        <CardDesktop />
                        <CardDesktop />
                        <CardDesktop />
                        <CardDesktop />
                    </div>
                </div>
                <div className="col-12 col-sm-3 ml-1 o-blue-container" >
                        

                </div>
            </div>
        );
    }
}

export default Desktop;