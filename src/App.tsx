import React, { useReducer } from "react";
import "./App.css";
import { State } from "./Types/gamestate";
import { reducer } from "./Reducer/reducer";
function getInitialState(): State {
  return { phase: "pre-game" };
}

function App() {
  const [state, dispatch] = useReducer(reducer, null, getInitialState);

  switch (state.phase) {
    case "pre-game": {
      return (
        <button onClick={() => dispatch({ type: "start-game" })}>
          Begin new game
        </button>
      );
    }

    case "in-game": {
      return (
        <div>
          <div>Goal: {state.goal}</div>
          <label>
            Guess:
            <input
              type="text"
              value={state.guess}
              onChange={(ev) =>
                dispatch({ type: "update-guess", newGuess: ev.target.value })
              }
            />
          </label>
        </div>
      );
    }

    case "post-game": {
      return (
        <div>
          <div>Nice game! You guessed {state.goal}</div>
          <button onClick={() => dispatch({ type: "start-game" })}>
            Begin new game
          </button>
        </div>
      );
    }
  }

  // This should never happen.
  return null;
}
export default App;
