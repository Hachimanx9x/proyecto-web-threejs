import React from "react";

import SideToggler from "./SideToggler";

export default function Dashboard(props) {
  let path = props.location.pathname;
  const token = localStorage.getItem("login");
  if (
    token !== "" &&
    token !== {} &&
    token !== "{}" &&
    token !== null &&
    token !== undefined
  ) {
    const obj = JSON.parse(token);
    const data = obj.data;
    console.log(data);
    if (
      data.herramientas.length === 0 &&
      path !== "/Dashboard/FinishRegister"
    ) {
      props.history.push("/Dashboard/FinishRegister");
    }
  } else {
    props.history.push("/Login");
    window.history.replaceState(null, "Home", "/Login");
  }
  return <SideToggler />;
}
