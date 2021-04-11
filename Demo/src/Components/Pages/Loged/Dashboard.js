import React, { useEffect } from "react";

import SideToggler from "./SideToggler";

export default function Dashboard(props) {
  const token = localStorage.getItem("login");
  let path = props.location.pathname;
  let temp = `${token}`;
  console.log(path);
  if (
    token === null ||
    token === undefined ||
    token === "" ||
    token === {} ||
    temp === "{}"
  ) {
    props.history.push("/Login");
  } else if (
    token === "registrandose" &&
    path !== "/Dashboard/FinishRegister"
  ) {
    props.history.push("/Dashboard/FinishRegister");
  }

  return <SideToggler />;
}
