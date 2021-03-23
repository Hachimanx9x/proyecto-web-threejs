import React from "react";
import SideToggler from "./SideToggler";

export default function Dashboard() {
  const token = localStorage.getItem("login");
  // console.log("el token es => " + token);
  let temp = `${token}`;
  //   console.log(temp)
  if (
    token === null ||
    token === undefined ||
    token === "" ||
    token === {} ||
    temp === "{}"
  ) {
    //El metodo de redireccionamiento.
    //    this.props.history.push("/Login");
  }

  return <SideToggler />;
}
