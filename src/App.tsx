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
        return (
          <div className="flex flex-col p-10 mx-auto w-1/2 bg-gray-200 h-screen">
            <div className="mx-auto text-xl">
              Plese wait while we are gathering fruits...
            </div>
          </div>
        );
      }
      return (
        <div className="flex flex-col p-10 bg-gray-200 h-screen mx-auto w-1/2">
          <div className="mx-auto text-xl">
            Fruit basket loaded with {state.wordPack.length} fruits!
          </div>
          <button
            className="my-5 mx-auto p-5 w-max bg-slate-200 rounded-md border border-1 border-gray-500 hover:bg-slate-300"
            autoFocus
            onClick={() => dispatch({ type: "start-game" })}
          >
            New Game
          </button>
        </div>
      );
    }

    case "in-game": {
      return (
        <div className="flex flex-col p-10 bg-gray-200 h-screen mx-auto w-1/2 items-center ">
          <div className="mt-2">Can you guess it? </div>
          <div className="font-semibold my-5">{state.scrabmledGoal}</div>
          <label className=" mb-5">
            <input
              className="uppercase rounded-md ml-2 bg-gray-300 p-2 "
              type="text"
              autoFocus
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
          <div className="space-x-5">
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
