import { State, Action } from "../Types/gamestate";
import { getRandomWord } from "../helpers/getRandomWord";
export function getInitialState(): State {
  return {
    phase: "pre-game",
    wordPack: null,
    bannedWords: null,
    playedWords: null,
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
      const { goal, scrambledGoal } = getRandomWord(
        state.wordPack,
        state.bannedWords,
        new Set()
      );

      return {
        phase: "in-game",
        goal: goal,
        scrambledGoal: scrambledGoal,
        skippedWord: "",
        guessedWords: 0,
        skippedWords: 0,
        guess: "",
        playedWords: new Set(),
        wordPack: state.wordPack,
        bannedWords: state.bannedWords,
      };
    }
    case "update-guess": {
      if (state.phase !== "in-game") {
        return state;
      }

      if (action.newGuess === state.goal) {
        const { goal, scrambledGoal } = getRandomWord(
          state.wordPack,
          state.bannedWords,
          state.playedWords
        );
        return {
          phase: "in-game",
          goal: goal,
          skippedWord: "",
          scrambledGoal: scrambledGoal,
          guessedWords: state.guessedWords + 1,
          skippedWords: state.skippedWords,
          guess: "",
          playedWords: state.playedWords,
          wordPack: state.wordPack,
          bannedWords: state.bannedWords,
        };
      }

      return {
        ...state,
        guess: action.newGuess,
      };
    }
    case "skip-guess": {
      if (state.phase !== "in-game") {
        return state;
      }
      const { goal, scrambledGoal } = getRandomWord(
        state.wordPack,
        state.bannedWords,
        state.playedWords
      );

      if (action.skippedWord === state.goal) {
        return {
          phase: "in-game",
          wordPack: state.wordPack,
          bannedWords: state.bannedWords,
          goal: goal,
          skippedWord: "",
          scrambledGoal: scrambledGoal,
          playedWords: state.playedWords,
          guessedWords: state.guessedWords,
          skippedWords: state.skippedWords + 1,
          guess: "",
        };
      }
      return {
        ...state,
        skippedWord: action.skippedWord,
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
        playedWords: state.playedWords,
        wordPack: state.wordPack,
        bannedWords: state.bannedWords,
      };
    }
  }

  return state;
}
