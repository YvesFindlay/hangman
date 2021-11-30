import React from "react";

import "./IncorrectChars.scss";

const IncorrectChars = ({ incorrectChars }) => {
  return (
    <div className="incorrect-chars__container">
      <div>
        {incorrectChars.length > 0 && <p>Incorrect letters:</p>}
        {incorrectChars
          .map((letter, ind) => <span key={ind}>{letter}</span>)
          .reduce(
            (prev, curr) => (prev === null ? [curr] : [prev, ", ", curr]),
            null
          )}
      </div>
    </div>
  );
};

export default IncorrectChars;
