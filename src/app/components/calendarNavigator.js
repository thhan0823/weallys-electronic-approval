import React from "react";
import styles from "../styles/calendarNavigator.module.css";

const CalendarNavigator = ({next, prev}) => {
  return (
    <div className={styles.container}>
      <div className={styles.arrow} onClick={prev}>a</div>
      <div className={styles.arrow} onClick={next}>b</div>
    </div>
  );
};

export default CalendarNavigator;
