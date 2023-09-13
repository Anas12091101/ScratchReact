import { useRef, useState, useEffect } from "react";
import classes from "./ChatBox.module.css";
import ChatMessage from "./ChatMessage";
import FileName from "./FileName";
function ChatBox({ messages, onSendHandler }) {
  const inputRef = useRef();
  const fileRef = useRef();
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [files, setFiles] = useState([]);

  function removeFileHandler(key) {
    setFiles(() => files.filter((f, i) => i !== key));
  }

  return (
    <div className={classes.msgChat}>
      <div className={classes.msgs}>
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {files &&
        files.map((file, idx) => (
          <FileName
            key={idx}
            filename={file.name}
            idx={idx}
            removeFileHandler={removeFileHandler}
          />
        ))}

      <div className={classes.msgAction}>
        <button className={classes.btn} onClick={() => fileRef.current.click()}>
          Upload File
        </button>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileRef}
          multiple
          onChange={() => {
            setFiles(files.concat(Array.from(fileRef.current.files)));
          }}
        ></input>
        <input
          className={classes.msgInput}
          type="text"
          ref={inputRef}
          placeholder="Enter your message here"
        ></input>
        <button
          className={classes.btn}
          onClick={() => {
            onSendHandler(files, inputRef.current.value);
            inputRef.current.value = "";
            setFiles([]);
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
