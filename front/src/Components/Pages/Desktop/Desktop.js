import React, { Component } from "react";
import "./Desktop.css";
import CardDesktop from "../../Elements/CardDesktop/CardDesktop";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact";
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
                <div className="col-12 col-xs-12 col-sm-8 o-blue-container"  >
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
                        <MDBCarousel
                            activeItem={1}
                            length={3}
                            showControls={true}
                            showIndicators={true}
                            className="z-depth-1"
                        >
                            <MDBCarouselInner>
                                <MDBCarouselItem itemId="1">
                                    <MDBView>
                                    <a href="http://google.com" target="_black"><img
                                        className="d-block w-100"
                                        src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg"
                                        alt="First slide"
                                    /></a>
                                        
                                    </MDBView>
                                </MDBCarouselItem>
                                <MDBCarouselItem itemId="2">
                                    <MDBView>
                                        <img
                                            className="d-block w-100"
                                            src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg"
                                            alt="Second slide"
                                        />
                                    </MDBView>
                                </MDBCarouselItem>
                                <MDBCarouselItem itemId="3">
                                    <MDBView>
                                        <img
                                            className="d-block w-100"
                                            src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
                                            alt="Third slide"
                                        />
                                    </MDBView>
                                </MDBCarouselItem>
                            </MDBCarouselInner>
                        </MDBCarousel>

                </div>
            </div>
        );
    }
}

export default Desktop;