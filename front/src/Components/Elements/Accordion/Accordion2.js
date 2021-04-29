import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Accordion2Styles.css";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

class Accordion2 extends Component {
  render() {
    return (
      <div className="accordion">
        <button
          className="accordionHeading container"
          onClick={() =>
            this.props.active === this.props.projectId
              ? this.props.setActive(null)
              : this.props.setActive(this.props.projectId)
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
              {this.props.number} Cambios
            </div>

            <FontAwesomeIcon
              icon={faChevronDown}
              className={
                (this.props.active === this.props.projectId
                  ? "rotate "
                  : "rotated ") + "mr-2"
              }
              style={{ fontSize: "20px" }}
            />
          </span>
        </button>

        <div
          className={
            (this.props.active === this.props.projectId ? "show" : "") +
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
