import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { State, Action } from "./Types/gamestate";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="w-10" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
