import React from "react";
import styles from "./tag.module.css";

const Tag = ({ text, color, type = 1 }) => {
  return (
    <div
      className={styles.tag}
      style={{
        backgroundColor: color,
        width: `${type === 1 ? "148px" : "66px"}`,
      }}
    >
      {text}
    </div>
  );
};

export default Tag;
