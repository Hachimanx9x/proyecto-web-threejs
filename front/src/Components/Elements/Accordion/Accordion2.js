import React,{Component, useRef, useEffect} from "react";
import "./AccordionStyles.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Accordion2Styles.css";
import {
  faPlus, faCaretRight, faMinus } from "@fortawesome/free-solid-svg-icons";
class Accordion2 extends Component {
  constructor(props){
    super();
  }
   

  render(){
    return(
        <div className="accordion">
           <button className="accordionHeading" onClick={()=> this.props.active === this.props.title ? this.props.setActive("") :this.props.setActive(this.props.title)}>
          <div >
              <div className="container">
               
                <p>{this.props.title}</p>
                <span className={ this.props.active === this.props.title ? "accordion-icon rotate" : "accordion-icon "}>
                <FontAwesomeIcon icon={this.props.active === this.props.title ? faMinus: faPlus } className="mr-2 rotated" />  
                </span>
               
              </div>
          </div> </button>
          
          <div  className={(this.props.active === this.props.title ? "show" : "") + " accordionContent"}>
            <div className=" accordion-text">
              {this.props.children}
            </div>
          </div>
        </div>
    )}
}

export default Accordion2;