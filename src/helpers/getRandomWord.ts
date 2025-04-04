import { WORDS } from "../CONSTANTS/text";
export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
};
