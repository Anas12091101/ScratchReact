import { useState } from "react";
import classes from "./ChatBox.module.css";
import { useNavigate } from "react-router-dom";

function ChatMessage({ message }) {
  const [imgZoom, setImgZoom] = useState(false);

  return (
    <div className={classes.msg}>
      <div className={classes.msgHeader}>
        <img
          className={classes.msgAvatar}
          src={
            process.env.REACT_APP_BACKEND_URL.slice(0, -1) +
            message.profile.avatar
          }
          alt="Profile pic"
        ></img>
        <div>
          <h3 className={classes.msgTitle}>{message.profile.user.name}</h3>
          {message.type === "text" && (
            <p className={classes.msgText}>{message.message}</p>
          )}
        </div>
      </div>

      {message.type.split("/")[0] === "image" && (
        <img
          className={
            !imgZoom ? classes.image + " " + classes.media : classes.zoomImg
          }
          src={process.env.REACT_APP_BACKEND_URL.slice(0, -1) + message.message}
          alt="image"
          onClick={() => setImgZoom(!imgZoom)}
        ></img>
      )}
      {message.type.split("/")[0] === "video" && (
        <video className={classes.media} controls>
          <source
            src={
              process.env.REACT_APP_BACKEND_URL.slice(0, -1) + message.message
            }
          />
        </video>
      )}
      {message.type.split("/")[1] === "pdf" && (
        <button
          className={classes.pdfBtn}
          onClick={() =>
            (window.location =
              process.env.REACT_APP_BACKEND_URL.slice(0, -1) + message.message)
          }
        >
          {message.message.split("/").at(-1)}
        </button>
      )}
      {message.type !== "text" &&
        message.type.split("/")[1] !== "pdf" &&
        message.type.split("/")[0] !== "video" &&
        message.type.split("/")[0] !== "image" && (
          <button
            className={classes.fileBtn}
            onClick={() =>
              (window.location =
                process.env.REACT_APP_BACKEND_URL.slice(0, -1) +
                message.message)
            }
          >
            {message.message.split("/").at(-1)}
          </button>
        )}
    </div>
  );
}

export default ChatMessage;
