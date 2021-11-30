import React, { useEffect } from "react";

import "./Modal.scss";

import { getResult } from "../../functions/getResult";

const Modal = ({
  setCanPlay,
  correctChars,
  incorrectChars,
  chosenWord,
  onPlayAgain,
  initialLoad,
}) => {
  let canPlay = true;
  let resultHeader = "";
  let resultWord = "";

  if (
    getResult(correctChars, incorrectChars, chosenWord, initialLoad) === "win"
  ) {
    canPlay = false;
    resultHeader = "Well played, you win!";
  } else if (
    getResult(correctChars, incorrectChars, chosenWord, initialLoad) === "lose"
  ) {
    resultHeader = "You lose!";
    resultWord = `Unlucky, the word was: ${chosenWord}`;
    canPlay = false;
  } else if (
    getResult(correctChars, incorrectChars, chosenWord, initialLoad) ===
    "get ready!"
  ) {
    resultHeader = "Press start to play";
  }

  useEffect(() => {
    setCanPlay(canPlay);
  });

  return (
    <div
      className="modal"
      style={resultHeader !== "" ? { display: "flex" } : {}}
    >
      <div className="modal__content">
        <h2 className="modal__result-header">{resultHeader}</h2>
        <p className="modal__result-word">{resultWord}</p>
        <button className="btn" onClick={onPlayAgain}>
          {resultHeader === "Press start to play" ? "Start" : "Play Again?"}
        </button>
      </div>
    </div>
  );
};

export default Modal;
