export const getResult = (corrrect, incorrect, word, initialLoad) => {
  let result = "win";

  if (initialLoad) {
    result = "get ready!";
  }

  word &&
    word.split("").forEach((char) => {
      // if our correct letters doen't include a letter from our word
      if (!corrrect.includes(char)) {
        result = "";
      }
    });

  if (incorrect.length === 6) result = "lose";

  return result;
};
