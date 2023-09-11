import { useRef, useState } from "react";
import classes from "./ChatBox.module.css";
import ChatMessage from "./ChatMessage";
function ChatBox({ messages, onSendHandler }) {
  const inputRef = useRef();

  return (
    <div className={classes.msgChat}>
      <div className={classes.msgs}>
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}
      </div>
      <div className={classes.msgAction}>
        <input
          className={classes.msgInput}
          type="text"
          ref={inputRef}
          placeholder="Enter your message here"
        ></input>
        <button
          className={classes.btn}
          onClick={() => {
            onSendHandler(inputRef.current.value);
            inputRef.current.value = "";
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
