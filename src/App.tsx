import React, { useReducer } from "react";
import "./App.css";
import { WORDS } from "./CONSTANTS/text";
import { State, Action } from "./Types/gamestate";
function getInitialState(): State {
  return { phase: "pre-game" };
}

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
};
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "start-game": {
      if (state.phase === "in-game") {
        return state;
      }
      return {
        phase: "in-game",
        goal: getRandomWord(),
        guess: "",
      };
    }
    case "update-guess": {
      if (state.phase !== "in-game") {
        return state;
      }
      if (action.newGuess === state.goal) {
        return {
          phase: "post-game",
          goal: state.goal,
        };
      }
      return {
        ...state,
        guess: action.newGuess,
      };
    }
  }

  return state;
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
