import React, { useReducer } from "react";
import logo from "./logo.svg";
import "./App.css";
import { State, Action } from "./Types/gamestate";
function getInitialState(): State {
  return { phase: "pre-game" };
}
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "start-game": {
      console.log("game started");
      break;
    }
    case "update-guess": {
      console.log("updated guess");
      break;
    }
  }

  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, null, getInitialState);
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
