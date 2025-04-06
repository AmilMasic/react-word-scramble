import React, { useEffect, useReducer } from "react";
import "./App.css";
import { State } from "./Types/gamestate";
import { reducer } from "./Reducer/reducer";
import Button from "./Button";
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

  const handleDispatchStartGame = () => {
    return dispatch({ type: "start-game" });
  };
  const handleDispatchUpdateGuess = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "update-guess",
      newGuess: e.target.value.toUpperCase(),
      skippedWord: "",
    });
  };

  const handleDispathEndGame = () => {
    return dispatch({ type: "end-game" });
  };

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
          <Button
            handleClick={handleDispatchStartGame}
            label="New Game"
            autofocus={true}
          />
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
              onChange={(e) => handleDispatchUpdateGuess(e)}
            />
          </label>
          <div className="space-x-5">
            <Button
              handleClick={() =>
                dispatch({
                  type: "update-guess",
                  newGuess: "",
                  skippedWord: state.goal,
                })
              }
              label="Skip Word"
            />

            <Button handleClick={handleDispathEndGame} label="End Game" />
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
