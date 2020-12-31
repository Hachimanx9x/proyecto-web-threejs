import React, { Component } from "react";
import "./ContactProfile.css";

class ContactProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            message: "", subject:""
        }
    }

    render() {
        return (
            <div className="row" >
                <div className="col-12 col-sm-8  text-center o-blue-container"  >
                    
                </div>
                <div className="col o-blue-container" >
                   
                </div>

            </div>
        );
    }
}

export default ContactProfile;