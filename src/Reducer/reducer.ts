import { State, Action } from "../Types/gamestate";
import { getRandomWord } from "../helpers/getRandomWord";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "load-data": {
      if (state.phase !== "pre-game") {
        return state;
      }
      return {
        ...state,
        wordPack: action.wordPack,
      };
    }
    case "start-game": {
      if (state.phase === "in-game") {
        return state;
      }
      if (state.wordPack == null) {
        return state;
      }
      return {
        phase: "in-game",
        goal: getRandomWord(state.wordPack),
        guess: "",
        wordPack: state.wordPack,
      };
    }
    case "update-guess": {
      if (state.phase !== "in-game") {
        return state;
      }
      if (action.newGuess === state.goal) {
        return {
          phase: "in-game",
          goal: getRandomWord(state.wordPack),
          guess: "",
          wordPack: state.wordPack,
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
