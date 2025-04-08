const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
export const getRandomWord = (wordPack: readonly string[]) => {
  const randomIndex = Math.floor(Math.random() * wordPack.length);
  const word = wordPack[randomIndex];
  let scrabmledGoal = word;
  while (scrabmledGoal === word) {
    scrabmledGoal = shuffleArray(word.split("")).join("");
  }
  return {
    goal: word,
    scrabmledGoal: scrabmledGoal,
  };
};
