import React from "react";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Room from "../../../Logos/Meet.png";
import User from "../../../Logos/user-icon.png";
import "./Meetings.css";

export default function Meetings(props) {
  const members = [
    {
      name: "Juan",
      pic: User,
    },
    {
      name: "Juan",
      pic: User,
    },
    {
      name: "Juan",
      pic: User,
    },
    {
      name: "Juan",
      pic: User,
    },
    {
      name: "Juan",
      pic: User,
    },
    {
      name: "Juan",
      pic: User,
    },
    {
      name: "Juan",
      pic: User,
    },
  ];
  function handleClick() {
    props.history.push("/Dashboard/Desktop");
  }
  return (
    <div className="o-blue-container pb-4 h-75 rounded">
      <div className="h-100 bg-white">
        <div className="rounded m-2 p-2 pt-3 row">
          <div className="col-xs-12 col-sm-6 mb-3">
            <p>Reunión de socialización de avances</p>
            <div className="o-picture-meeting-container">
              <button className="btn rounded-circle o-btn-mic z-depth-0 bg-primary text-white">
                <FontAwesomeIcon icon={faMicrophone} />
              </button>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6">
            <p>Ingresa a la reunión</p>
            <div className="o-member-list">
              {members.map((member) => (
                <div className="d-flex flex-column text-center">
                  <img
                    src={member.pic}
                    alt="Member list"
                    className="o-meet-member-pic rounded-circle"
                  />
                  <small>{member.name}</small>
                </div>
              ))}
            </div>
            <button
              className="btn bg-primary text-white z-depth-0 pl-4 pr-4"
              onClick={handleClick}
            >
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
