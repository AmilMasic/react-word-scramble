import { State, Action } from "../Types/gamestate";
import { getRandomWord } from "../helpers/getRandomWord";
export function getInitialState(): State {
  return {
    phase: "pre-game",
    wordPack: null,
    bannedWords: null,
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
        bannedWords: action.bannedWords,
      };
    }
    case "start-game": {
      if (state.phase === "in-game") {
        return state;
      }
      if (state.wordPack == null) {
        return state;
      }
      if (state.bannedWords == null) {
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
        bannedWords: state.bannedWords,
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
          bannedWords: state.bannedWords,
        };
      }

      if (action.skippedWord === state.goal) {
        return {
          phase: "in-game",
          wordPack: state.wordPack,
          bannedWords: state.bannedWords,
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
        bannedWords: state.bannedWords,
      };
    }
  }

  return state;
}
