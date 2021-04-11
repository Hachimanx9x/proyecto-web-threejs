import React from "react";

import SideToggler from "./SideToggler";

export default function Dashboard(props) {
  let path = props.location.pathname;
  const token = localStorage.getItem("login");
  const obj = JSON.parse(token);
  const data = obj.data;
  console.log(token);
  console.log(data);
  let temp = obj.token;
  if (
    temp === null ||
    temp === undefined ||
    temp === "" ||
    temp === {} ||
    temp === "{}"
  ) {
    props.history.push("/Login");
  } else if (
    data.herramientas.length === 0 &&
    path !== "/Dashboard/FinishRegister"
  ) {
    props.history.push("/Dashboard/FinishRegister");
  }

  return <SideToggler />;
}
