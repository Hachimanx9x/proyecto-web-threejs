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
        const data = {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
                {
                    backgroundColor: 'rgba(255,0,0,0.2)',
                    borderColor: 'rgba(255,0,0,1)',
                    pointBackgroundColor: 'rgba(255,0,0,1)',
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
    
                    <Carousel itemsToShow={1}
                        onChange={(currentItem, pageIndex) =>{
                            const item = currentItem;
                            alert(item.item.alt);
                        }}>
                        <img src={ProjectPicture} alt="project logo" key="your mom" className="o-slider-img" />
                        <img src={ProjectPicture} alt="project logo" className="o-slider-img" />
                        <img src={ProjectPicture} alt="project logo" className="o-slider-img" />
                        <img src={ProjectPicture} alt="project logo" className="o-slider-img" />
                    </Carousel>
                    <Radar data={data} />
                    
                </div> 
            </div>
        );
    }
}

export default Desktop;