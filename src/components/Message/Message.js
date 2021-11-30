import React from "react";

import "./Message.scss";

const Message = () => {
  return (
    <div className="message">
      <div className="message__content">
        <h2 className="message__header"></h2>
        <h3 className="final-message-reveal-word"></h3>
        <button id="play-button">Play Again</button>
      </div>
    </div>
  );
};

export default Message;
