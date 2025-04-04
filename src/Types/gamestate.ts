export type State =
  | {
      phase: "pre-game";
      wordPack: readonly string[] | null;
    }
  | {
      phase: "in-game";
      goal: string;
      guess: string;
      wordPack: readonly string[];
    }
  | {
      phase: "post-game";
      goal: string;
      wordPack: readonly string[];
    };

export type Action =
  | { type: "start-game" }
  | { type: "load-data"; wordPack: readonly string[] }
  | { type: "update-guess"; newGuess: string };
