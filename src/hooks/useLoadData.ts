import { useEffect, type Dispatch } from "react";
import { Action } from "../Types/gamestate";

export default function useLoadData({
  dispatch,
}: {
  dispatch: Dispatch<Action>;
}) {
  useEffect(() => {
    Promise.all([
      fetch("https://unpkg.com/naughty-words@1.2.0/en.json").then((res) =>
        res.json()
      ),
      fetch("fruits.txt").then((res) => res.text()),
    ]).then(([bannedWordsData, fruitsText]) => {
      const normalizeWords = (words: unknown[]): string[] =>
        words
          .filter((word): word is string => typeof word === "string")
          .map((word) => word.toUpperCase().trim())
          .filter(Boolean);

      const normalizedBannedWords = Array.isArray(bannedWordsData)
        ? normalizeWords(bannedWordsData)
        : normalizeWords(Object.values(bannedWordsData).flat());

      dispatch({
        type: "load-data",
        wordPack: fruitsText
          .split("\n")
          .map((word) => word.toUpperCase().trim())
          .filter(Boolean),
        bannedWords: normalizedBannedWords,
      });
    });
  }, [dispatch]);
}
