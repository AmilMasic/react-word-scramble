const shuffleWord = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
export const getRandomWord = (
  wordPack: readonly string[],
  bannedWords: readonly string[]
) => {
  const randomIndex = Math.floor(Math.random() * wordPack.length);
  const word = wordPack[randomIndex];
  let scrambledGoal = word;
  let isSafe = false;
  let attempts = 0;
  const maxAttempts = 10;

  while ((!isSafe || scrambledGoal === word) && attempts < maxAttempts) {
    scrambledGoal = shuffleWord(word.split("")).join("");

    // eslint-disable-next-line no-loop-func
    isSafe = !bannedWords.some((banned) =>
      scrambledGoal.toUpperCase().includes(banned.toUpperCase())
    );

    attempts++;
  }

  return {
    goal: word,
    scrambledGoal: scrambledGoal,
  };
};
