import React from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="o-container-main">
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
