export const getRandomWord = (
  wordPack: readonly string[],
  bannedWords: readonly string[],
  wordSet: Set<string>
) => {
  const randomIndex = Math.floor(Math.random() * wordPack.length);
  const word = wordPack[randomIndex];
  let scrambledGoal = word;
  let isClean = false;
  let attempts = 0;
  const maxAttempts = 10;
  let playedSet;

  while ((isClean || scrambledGoal === word) && attempts < maxAttempts) {
    scrambledGoal = shuffleWord(word.split("")).join("");

    isClean = isRandomWordClean(scrambledGoal, bannedWords);
    playedSet = hasBeenPlayed(wordSet, word, wordPack);

    attempts++;
  }

  return {
    goal: word,
    scrambledGoal: scrambledGoal,
    playedWords: playedSet,
  };
};

const shuffleWord = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const isRandomWordClean = (word: string, bannedWords: readonly string[]) => {
  return bannedWords.some((banned) => {
    return word.toUpperCase().includes(banned.toUpperCase());
  });
};

const hasBeenPlayed = (
  wordSet: Set<string>,
  word: string,
  wordPack: readonly string[]
) => {
  wordSet.add(word);
  console.log("set", wordSet);
  return wordSet;
};
