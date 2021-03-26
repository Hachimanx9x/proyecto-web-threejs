import React, { Component } from "react";

import SideToggler from "./SideToggler";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("login");
    let temp = `${token}`;
    if (
      token === null ||
      token === undefined ||
      token === "" ||
      token === {} ||
      temp === "{}"
    ) {
      this.props.history.push("/Login");
    }
  }
  render() {
    return <SideToggler />;
  }
}

export default Dashboard;
