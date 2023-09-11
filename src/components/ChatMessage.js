import classes from "./ChatBox.module.css";

function ChatMessage({ message }) {
  return (
    <div className={classes.msg}>
      {/* <div className={classes.msgHeader}> */}
      <img
        className={classes.msgAvatar}
        src={
          process.env.REACT_APP_BACKEND_URL.slice(0, -1) +
          message.profile.avatar
        }
        alt="Profile pic"
      ></img>
      <h3 className={classes.msgTitle}>{message.profile.user.name} :</h3>
      {/* </div> */}
      <p className={classes.msgText}>{message.message}</p>
    </div>
  );
}

export default ChatMessage;
