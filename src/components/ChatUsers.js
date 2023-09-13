import { useNavigate } from "react-router-dom";
import classes from "./ChatUsers.module.css";

function ChatUsers({ users, currentUser }) {
  const navigate = useNavigate();
  function clickHandler(user) {
    console.log(user, currentUser);
    let roomName = [user.user.id, currentUser.user.id].sort().join("_");
    navigate(roomName);
  }
  return (
    <div className={classes.main}>
      {users.map((user, idx) => (
        <div
          className={classes.item}
          key={idx}
          onClick={() => clickHandler(user)}
        >
          <img
            className={classes.avatar}
            src={process.env.REACT_APP_BACKEND_URL.slice(0, -1) + user.avatar}
            alt="profile-pic"
          ></img>
          <div className={classes.text}>
            <h2>{user.user.name}</h2>
            <h4>{user.user.email}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatUsers;
