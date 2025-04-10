export type State =
  | {
      phase: "pre-game";
      wordPack: readonly string[] | null;
    }
  | {
      phase: "in-game";
      goal: string;
      scrabmledGoal: string;
      guessedWords: number;
      guess: string;
      wordPack: readonly string[];
    }
  | {
      phase: "post-game";
      guessedWords: number;
      wordPack: readonly string[];
    }
  | {
      phase: "end-game";
      goal: string;
      
      guessedWords: number;
      wordPack: readonly string[] | null;
    };

export type Action =
  | { type: "start-game" }
  | { type: "load-data"; wordPack: readonly string[] }
  | { type: "update-guess"; newGuess: string }
  | { type: "end-game" };
