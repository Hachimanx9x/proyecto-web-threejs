import React, { Component } from "react";
import "./Desktop.css";
import CardDesktop from "../../Elements/CardDesktop/CardDesktop";
//import {Carousel, Item} from 'react-elastic-carousel'

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
                  {/** 
                   *   <Carousel itemsToShow={1}>
                        <Item>1</Item>
                        <Item>2</Item>
                        <Item>3</Item>
                        <Item>4</Item>
                        <Item>5</Item>
                        <Item>6</Item>
                    </Carousel>
                  */}
                </div>
            </div>
        );
    }
}

export default Desktop;