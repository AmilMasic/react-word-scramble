import { State, Action } from "../Types/gamestate";
import { getRandomWord } from "../helpers/getRandomWord";

const scrambleWord = (word: string) => {
  return word;
};

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
      const { goal, scrabmledGoal } = getRandomWord(state.wordPack);

      return {
        phase: "in-game",
        goal: goal,
        scrabmledGoal: scrabmledGoal,
        guessedWords: 0,
        guess: "",
        wordPack: state.wordPack,
      };
    }
    case "update-guess": {
      if (state.phase !== "in-game") {
        return state;
      }

      const { goal, scrabmledGoal } = getRandomWord(state.wordPack);
      if (action.newGuess === state.goal) {
        return {
          phase: "in-game",
          goal: goal,
          scrabmledGoal: scrabmledGoal,
          guessedWords: state.guessedWords++,
          guess: "",
          wordPack: state.wordPack,
        };
      }
      return {
        ...state,
        guess: action.newGuess,
      };
    }
    case "end-game": {
      if (state.phase !== "in-game") {
        return state;
      }
      return {
        phase: "post-game",
        guessedWords: state.guessedWords,
        wordPack: state.wordPack,
      };
    }
  }

  return state;
}
