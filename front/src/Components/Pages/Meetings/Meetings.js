import React, { useEffect, useState } from "react";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import User from "../../../Logos/user-icon.png";
import "./Meetings.css";

export default function Meetings(props) {
  const [muted, setMuted] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState("");
  const [names, setNames] = useState([]);
  const [project, setProject] = useState();
  useEffect(() => {
    let isMounted = true;

    function fetchData() {
      const reunionId = props.match.params.id;
      const token = localStorage.getItem("login");
      const obj = JSON.parse(token);
      let temp = obj.token;
      const userdata = obj.data;
      const options = {
        headers: {
          "Content-Type": "application/json",
          authorization: `llave ${temp}`,
        },
      };
      try {
        Axios.get(`http://localhost:3030/reunion/${reunionId}`, options).then(
          (response) => {
            if (isMounted) {
              console.log(response);
              const data = response.data;
              const members = [];
              const names = [];
              for (const i of data.reunion.integrantes) {
                if (i.id !== userdata.id) {
                  names.push(i.nombre.split(" ")[0]);
                  members.push({
                    id: i.id,
                    name: i.nombre.split(" ")[0],
                    pic: i.foto,
                  });
                }
              }
              setFetched(true);
              setTitle(data.reunion.titulo);
              setMembers(members);
              setNames(names);
              setProject(data.reunion.proyecto);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (fetched) {
    return (
      <div className="o-blue-container pb-4 h-75 rounded">
        <div className="h-100 bg-white">
          <div className="rounded m-2 p-2 pt-3 row">
            <div className="col-xs-12 col-sm-6 mb-3">
              <div className="o-picture-meeting-container">
                <button
                  style={{ width: "2.3rem", height: "2.3rem" }}
                  onClick={() => setMuted(!muted)}
                  className="btn rounded-circle p-0 z-depth-0 bg-primary text-white"
                >
                  <FontAwesomeIcon
                    icon={muted ? faMicrophoneSlash : faMicrophone}
                  />
                </button>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6">
              <div className="d-flex justify-content-center">
                <p className="mt-5 o-title-meeting">{title}</p>
              </div>
              <div className="o-member-list">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="d-flex flex-column text-center"
                  >
                    <img
                      src={member.pic}
                      alt="Member list"
                      className="o-meet-member-pic rounded-circle"
                    />
                  </div>
                ))}
              </div>{" "}
              <div className="d-flex justify-content-center">
                <p>
                  {names.slice(0, names.length - 1).join(", ")} y{" "}
                  {names[names.length - 1]} se uniran a la llamada.
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <a
                  className="btn bg-primary rounded-pill text-white text-capitalize m-auto z-depth-0 pl-4 pt-2 pb-2 pr-4"
                  href={`/Room/${project + "ABC" + props.match.params.id}`}
                >
                  Ingresar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>...Cargando</div>;
  }
}
