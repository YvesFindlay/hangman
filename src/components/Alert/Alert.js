import React from "react";

import "./Alert.scss";

const Alert = ({ currentChar, displayAlert }) => {
  return (
    <>
      {displayAlert && (
        <div className="alert-container">
          <p>
            Letter '<span className="bold">{`${currentChar}`}</span>' has
            already been entered!
          </p>
        </div>
      )}
    </>
  );
};

export default Alert;
