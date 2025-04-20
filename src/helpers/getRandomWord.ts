export const getRandomWord = (
  wordPack: readonly string[],
  bannedWords: readonly string[],
  playedWords: Set<string>
) => {
  const avaialbleWords = wordPack.filter((word) => !playedWords.has(word));
  console.log("avalialbe", avaialbleWords);
  const wordsToUse = avaialbleWords?.length < 0 ? avaialbleWords : wordPack;

  const randomIndex = Math.floor(Math.random() * wordsToUse.length);
  const word = wordsToUse[randomIndex];
  let scrambledGoal = word;
  let isClean = false;
  let attempts = 0;
  const maxAttempts = 10;
  let playedSet;

  while ((isClean || scrambledGoal === word) && attempts < maxAttempts) {
    scrambledGoal = shuffleWord(word.split("")).join("");

    isClean = isRandomWordClean(scrambledGoal, bannedWords);
    playedSet = hasBeenPlayed(playedWords, word, wordPack);

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
  const newSet = new Set(wordSet);
  newSet.add(word);

  return newSet;
};
