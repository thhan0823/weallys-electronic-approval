import React from "react";
import styles from "./calendarNavigator.module.css";
import Image from "next/image";

const CalendarNavigator = ({ next, prev }) => {
  return (
    <div className={styles.container}>
      <div className={styles.arrow} onClick={prev}>
        <Image
          src="/icons/chevron-left.svg"
          alt="prevBtn"
          width={24}
          height={24}
        />
      </div>
      <div className={styles.arrow} onClick={next}>
        <Image
          src="/icons/chevron-right.svg"
          alt="nextBtn"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
};

export default CalendarNavigator;
