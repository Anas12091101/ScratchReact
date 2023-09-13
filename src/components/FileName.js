import classes from "./ChatBox.module.css";

function FileName({ idx, filename, removeFileHandler }) {
  return (
    <div className={classes.fileNameBox}>
      <p>{filename}</p>
      <button
        className={classes.closeBtn}
        onClick={() => removeFileHandler(idx)}
      >
        X
      </button>
    </div>
  );
}

export default FileName;
