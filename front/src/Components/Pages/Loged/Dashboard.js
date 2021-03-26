import React from "react";

import SideToggler from "./SideToggler";

export default function Dashboard(props) {
  const token = localStorage.getItem("login");
  let temp = `${token}`;
  if (
    token === null ||
    token === undefined ||
    token === "" ||
    token === {} ||
    temp === "{}"
  ) {
    props.history.push("/Login");
  }

  return <SideToggler />;
}
