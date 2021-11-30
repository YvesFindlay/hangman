import React from "react";

import "./Word.scss";

const Word = ({ chosenWord, correctChars }) => {
  return (
    <div className="word">
      {chosenWord &&
        chosenWord.split("").map((letter, ind) => (
          <span className="letter" key={ind}>
            {correctChars.includes(letter) ? letter : ""}
          </span>
        ))}
    </div>
  );
};

export default Word;

//  In order to display the word what do we need:
//  we'll need the selected word, the correctLetters
