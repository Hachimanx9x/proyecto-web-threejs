import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Accordion2Styles.css";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

class Accordion2 extends Component {
  render() {
    return (
      <div className="accordion">
        <button
          className="accordionHeading container"
          onClick={() =>
            this.props.active === this.props.title
              ? this.props.setActive("")
              : this.props.setActive(this.props.title)
          }
        >
          <img
            src={this.props.icon}
            alt="Project"
            className="o-icon-collapse"
          />
          <p className="p-2 mt-3">{this.props.title}</p>
          <span className={"accordion-icon d-flex"}>
            <div className="mr-3 mr-sm-4 mt-0 rounded-pill new-update">
              {this.props.number} Nuevos
            </div>

            <FontAwesomeIcon
              icon={this.props.active === this.props.title ? faMinus : faPlus}
              className={
                (this.props.active === this.props.title
                  ? "rotate "
                  : "rotated ") + "mr-2"
              }
            />
          </span>
        </button>

        <div
          className={
            (this.props.active === this.props.title ? "show" : "") +
            " accordionContent"
          }
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Accordion2;
