import React, { useEffect, useReducer, useRef } from "react";
import "./App.css";

import { reducer, getInitialState } from "./Reducer/reducer";
import Button from "./Button";

function App() {
  const [state, dispatch] = useReducer(reducer, null, getInitialState);

  const guessInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("https://unpkg.com/naughty-words@1.2.0/en.json").then((res) =>
        res.json()
      ),
      fetch("fruits.txt").then((res) => res.text()),
    ]).then(([bannedWordsData, fruitsText]) => {
      const normalizeWords = (words: unknown[]): string[] =>
        words
          .filter((word): word is string => typeof word === "string")
          .map((word) => word.toUpperCase().trim())
          .filter(Boolean);

      const normalizedBannedWords = Array.isArray(bannedWordsData)
        ? normalizeWords(bannedWordsData)
        : normalizeWords(Object.values(bannedWordsData).flat());

      dispatch({
        type: "load-data",
        wordPack: fruitsText
          .split("\n")
          .map((word) => word.toUpperCase().trim())
          .filter(Boolean),
        bannedWords: normalizedBannedWords,
      });
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

  const handleSkipWord = () => {
    if (state.phase === "in-game") {
      dispatch({
        type: "update-guess",
        newGuess: "",
        skippedWord: state.goal,
      });
      guessInputRef.current?.focus();
    }
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
              ref={guessInputRef}
              autoFocus
              value={state.guess}
              onChange={(e) => handleDispatchUpdateGuess(e)}
            />
          </label>
          <div className="space-x-5">
            <Button handleClick={handleSkipWord} label="Skip Word" />

            <Button handleClick={handleDispathEndGame} label="End Game" />
          </div>
        </div>
      );
    }

    case "post-game": {
      return (
        <div className=" flex flex-col p-10 bg-gray-200 h-screen mx-auto w-1/2 items-center">
          <div className="text-xl p-5">
            Nice game! You guessed {state.guessedWords} and skipped{" "}
            {state.skippedWords} words.
          </div>
          <Button
            handleClick={handleDispatchStartGame}
            label="New Game?"
            autofocus={true}
          />
        </div>
      );
    }
  }

  // This should never happen.
  return null;
}
export default App;
