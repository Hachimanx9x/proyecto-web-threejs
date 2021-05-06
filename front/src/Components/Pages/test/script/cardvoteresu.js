import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
const contentCard = (props) => {
  return (
    <div style={{ width: "6rem" }} className="m-2 text-center ">
      <img
        className="rounded-circle "
        style={{ width: "100px" }}
        src={props.img}
      />
      <div>{props.name}</div>
      <h1>
        <FontAwesomeIcon
          style={
            props.voto
              ? {
                  border: "3px solid #208537",
                  color: "#208537",
                  width: "75px",
                  height: "75px",
                }
              : {
                  border: "3px solid #F14352",
                  color: "#F14352",
                  width: "75px",
                  height: "75px",
                }
          }
          icon={props.voto ? faCheck : faTimes}
          className="p-2 rounded-circle"
        />
      </h1>
    </div>
  );
};
export default contentCard;
