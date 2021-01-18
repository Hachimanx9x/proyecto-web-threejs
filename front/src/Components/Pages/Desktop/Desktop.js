import React, { Component } from "react";
import "./Desktop.css";
import CardDesktop from "../../Elements/CardDesktop/CardDesktop";
import Carousel from 'react-elastic-carousel'
import ProjectPicture from "../../../ilustracion-equipo-de-trabajo.jpg";
import { MDBNotification } from "mdbreact";
import { Radar, defaults } from 'react-chartjs-2';
defaults.global.legend.display = false;

class Desktop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: false,
            updates: [
                { userName: "Juan Carlos Hurtado", projectName: "Desarrollo de videojuegos RV", activity: "A1", date: "13/01/2020", hour: "11:30", fileName: "foto.png", fileUrl: "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png" },
                { userName: "Juan Carlos Hurtado", projectName: "Desarrollo de videojuegos RV", activity: "A1", date: "13/01/2020", hour: "11:30", fileName: "foto.png", fileUrl: "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png" },
                { userName: "Juan Carlos Hurtado", projectName: "Desarrollo de videojuegos RV", activity: "A1", date: "13/01/2020", hour: "11:30", fileName: "foto.png", fileUrl: "https://i.pinimg.com/originals/47/81/18/4781189a78cb263f7ffc16bab6b6b192.png" },
            ]
        }
        
    }
    render() {
        //#bc8a01 eaea91
        const data = {
            labels: ['Oportunidad', 'Valor sm', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                    backgroundColor: '#CFEC92',
                    borderColor: '#80BD01',
                    pointBackgroundColor: '#80BD01',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
            ]
        };
        return (
            <div className="row mb-5 pb-5" >
                <div className="col-12 col-xs-12 col-sm-8 o-blue-container o-updates-section"  >
                    <h4 className="mb-3 pl-4">Actualizaciones</h4>
                    <div className="o-updates-container">
                        <MDBNotification
                        
                        />
                        {this.state.updates.map((update,i)=>(
                            <CardDesktop update={update} key={i} />
                        ))}
                    </div>
                </div> 
                <div className="col-12 col-sm-3 ml-1 o-blue-container o-slider-container" >
                    <div className="bg-white rounded p-0 pr-1 pl-1 mb-2 mt-2">
                        <Carousel itemsToShow={1}
                            onChange={(currentItem) => {
                                const item = currentItem;
                                alert(item.item.alt);
                            }}>
                            <a href="https://www.google.com"><img src={ProjectPicture} alt="project logo" key="your mom" className="o-slider-img" /></a>
                            <img src={ProjectPicture} alt="project logo" className="o-slider-img" />
                            <img src={ProjectPicture} alt="project logo" className="o-slider-img" />
                            <img src={ProjectPicture} alt="project logo" className="o-slider-img" />
                        </Carousel>
                    </div>        
                    <div className="bg-white rounded p-1 mb-2 mt-2 text-center">
                        <Radar data={data}  />
                        <button className="o-btn-graph rounded text-success border-success font-weight-bold mt-4 z-depth-0">Sistema multimedia mínimo viable</button>
                        <button className="o-btn-graph bg-warning rounded text-white border-0 font-weight-bold mt-2 z-depth-0">Concebir la experiencia multimedia</button>
                    </div>
                    
                </div> 
            </div>
        );
    }
}

export default Desktop;