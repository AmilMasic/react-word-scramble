import { State, Action } from "../Types/gamestate";
import { getRandomWord } from "../helpers/getRandomWord";

export function reducer(state: State, action: Action): State {
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
