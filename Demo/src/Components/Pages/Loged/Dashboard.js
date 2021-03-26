import React from "react";
import { useHistory } from "react-router";
import SideToggler from "./SideToggler";

export default function Dashboard() {
  const token = localStorage.getItem("login");
  let temp = `${token}`;
  const history = useHistory();

  if (
    token === null ||
    token === undefined ||
    token === "" ||
    token === {} ||
    temp === "{}"
  ) {
    //El metodo de redireccionamiento.
    history.push("/Login");
  }

  return <SideToggler />;
}
