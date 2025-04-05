export const getRandomWord = (wordPack: readonly string[]) => {
  const randomIndex = Math.floor(Math.random() * wordPack.length);
  return wordPack[randomIndex];
};
