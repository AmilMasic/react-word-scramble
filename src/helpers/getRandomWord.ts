export const getRandomWord = (
  wordPack: readonly string[],
  bannedWords: readonly string[],
  playedWords: Set<string>,
  lastWord?: string | undefined
) => {
  let availableWords = wordPack.filter((word) => !playedWords.has(word));

  if (availableWords.length === 0) {
    playedWords.clear();
    if (lastWord) playedWords.add(lastWord);
    availableWords = wordPack.filter((word) => !playedWords.has(word));
  }

  const randomIndex = Math.floor(Math.random() * availableWords.length);
  const word = availableWords[randomIndex];

  let scrambledGoal = word;
  let isClean = false;
  let attempts = 0;
  const maxAttempts = 10;

  while ((isClean || scrambledGoal === word) && attempts < maxAttempts) {
    scrambledGoal = shuffleWord(word.split("")).join("");

    isClean = isRandomWordClean(scrambledGoal, bannedWords);

    attempts++;
  }

  return {
    goal: word,
    scrambledGoal: scrambledGoal,
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
