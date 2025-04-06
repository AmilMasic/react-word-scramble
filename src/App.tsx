import React, { useEffect, useReducer } from "react";
import "./App.css";
import { State } from "./Types/gamestate";
import { reducer } from "./Reducer/reducer";
function getInitialState(): State {
  return {
    phase: "pre-game",
    wordPack: null,
  };
}

function App() {
  const [state, dispatch] = useReducer(reducer, null, getInitialState);

  useEffect(() => {
    fetch("fruits.txt")
      .then((response) => response.text())
      .then((text) => {
        setTimeout(
          () =>
            dispatch({
              type: "load-data",
              wordPack: text
                .split("\n")
                .map((word) => word.toUpperCase().trim())
                .filter(Boolean),
            }),
          3000
        );
      });
  }, []);

  switch (state.phase) {
    case "pre-game": {
      if (state.wordPack === null) {
        return <>Loading Data...</>;
      }
      return (
        <>
          <div>Fruit basket loaded with {state.wordPack.length} fruits!</div>
          <button onClick={() => dispatch({ type: "start-game" })}>
            Begin new game
          </button>
        </>
      );
    }

    case "in-game": {
      return (
        <div>
          <div>Goal: {state.scrabmledGoal}</div>
          <label>
            Guess:
            <input
              className="uppercase "
              type="text"
              value={state.guess}
              onChange={(ev) =>
                dispatch({
                  type: "update-guess",
                  newGuess: ev.target.value.toUpperCase(),
                  skippedWord: "",
                })
              }
            />
          </label>
          <div>
            <button
              onClick={(e) =>
                dispatch({
                  type: "update-guess",
                  newGuess: "",
                  skippedWord: state.goal,
                })
              }
            >
              Skip Word
            </button>
          </div>
          <div>
            <button onClick={(e) => dispatch({ type: "end-game" })}>
              End Game
            </button>
          </div>
        </div>
      );
    }

    case "post-game": {
      return (
        <div>
          <div>
            Nice game! You guessed {state.guessedWords} and skipped{" "}
            {state.skippedWords} words.
          </div>
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
