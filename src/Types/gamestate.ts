export type State =
  | {
      phase: "pre-game";
    }
  | {
      phase: "in-game";
      goal: string;
      guess: string;
    }
  | {
      phase: "post-game";
      goal: string;
    };

export type Action =
  | { type: "start-game" }
  | { type: "update-guess"; newGuess: string };
