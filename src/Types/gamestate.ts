export type State =
  | {
      phase: "pre-game";
      wordPack: readonly string[] | null;
      bannedWords: readonly string[] | null;
    }
  | {
      phase: "in-game";
      goal: string;
      scrabmledGoal: string;
      skippedWord: string;
      guessedWords: number;
      skippedWords: number;
      guess: string;
      wordPack: readonly string[];
      bannedWords: readonly string[];
    }
  | {
      phase: "post-game";
      guessedWords: number;
      skippedWords: number;
      wordPack: readonly string[];
      bannedWords: readonly string[];
    }
  | {
      phase: "end-game";
      goal: string;
      guessedWords: number;
      skippedWords: number;
      wordPack: readonly string[] | null;
      bannedWords: readonly string[] | null;
    };

export type Action =
  | { type: "start-game" }
  | {
      type: "load-data";
      wordPack: readonly string[];
      bannedWords: readonly string[];
    }
  | { type: "update-guess"; newGuess: string }
  | { type: "skip-guess"; skippedWord: string }
  | { type: "end-game" };
