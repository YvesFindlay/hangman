import React, { useState, useEffect } from "react";

import "./App.scss";

import Header from "./components/Header/Header";
import HangmanSVG from "./components/HangmanSVG/HangmanSVG";
import IncorrectLetters from "./components/IncorrectChars/IncorrectChars";
import Word from "./components/Word/Word";
import Modal from "./components/Modal/Modal";
import Alert from "./components/Alert/Alert";
import { renderAlert } from "./functions/renderAlert";

let words = [];
let chosenWord = "";

const App = () => {
  const [canPlay, setCanPlay] = useState(true);
  const [correctChars, setCorrectChars] = useState([]);
  const [incorrectChars, setIncorrectChars] = useState([]);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [currentChar, setCurrentChar] = useState("");
  const [initialLoad, setIntitalLoad] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    // can't use async directly in useEffect.
    fetch("https://random-word-api.herokuapp.com/word?number=20")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error could not fetch data for that resource...");
        }

        return res.json();
      })
      .then((data) => {
        words = data;
        chosenWord = words[Math.floor(Math.random() * words.length)];
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    const keydownHandler = ({ key, keyCode }) => {
      if (canPlay && keyCode >= 65 && keyCode <= 90) {
        const char = key.toLowerCase();

        if (chosenWord.includes(char)) {
          if (!correctChars.includes(char)) {
            setCorrectChars((prevCorrectChars) => [...prevCorrectChars, char]);
          } else {
            renderAlert(setDisplayAlert); // entered letter twice
            setCurrentChar(char);
          }
        } else {
          if (!incorrectChars.includes(char)) {
            setIncorrectChars((prevIncorrectChars) => [
              ...prevIncorrectChars,
              char,
            ]);
          } else {
            renderAlert(setDisplayAlert);
            setCurrentChar(char);
          }
        }
      }
    };

    window.addEventListener("keydown", keydownHandler);

    // listener cleanup
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [canPlay, correctChars, incorrectChars]);

  const resetHandler = () => {
    setIntitalLoad(false);
    setCanPlay(true);
    setCorrectChars([]);
    setIncorrectChars([]);

    const randNum = Math.floor(Math.random() * words.length);
    chosenWord = words[randNum];
  };

  return (
    <>
      {!error && (
        <>
          <Header />
          <div className="game__container">
            <HangmanSVG incorrectChars={incorrectChars} />
            <IncorrectLetters incorrectChars={incorrectChars} />
            <Word
              chosenWord={chosenWord}
              correctChars={correctChars}
              canPlay={canPlay}
            />
          </div>
          <Modal
            correctChars={correctChars}
            incorrectChars={incorrectChars}
            chosenWord={chosenWord}
            setCanPlay={setCanPlay}
            onPlayAgain={resetHandler}
            initialLoad={initialLoad}
          />
          <Alert displayAlert={displayAlert} currentChar={currentChar} />
        </>
      )}

      {error && (
        <div style={{ background: "none" }}>could not load resource</div>
      )}
    </>
  );
};

export default App;
