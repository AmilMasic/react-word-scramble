import { State, Action } from "../Types/gamestate";
import { getRandomWord } from "../helpers/getRandomWord";
export function getInitialState(): State {
  return {
    phase: "pre-game",
    wordPack: null,
  };
}

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
        skippedWord: "",
        guessedWords: 0,
        skippedWords: 0,
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
          skippedWord: "",
          scrabmledGoal: scrabmledGoal,
          guessedWords: state.guessedWords++,
          skippedWords: state.skippedWords,
          guess: "",
          wordPack: state.wordPack,
        };
      }

      if (action.skippedWord === state.goal) {
        return {
          phase: "in-game",
          wordPack: state.wordPack,
          goal: goal,
          skippedWord: "",
          scrabmledGoal: scrabmledGoal,
          guessedWords: state.guessedWords,
          skippedWords: state.skippedWords++,
          guess: "",
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
        skippedWords: state.skippedWords,
        wordPack: state.wordPack,
      };
    }
  }

  return state;
}
