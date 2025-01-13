import React from "react";
import styles from "./calendar.module.css"; // CSS 모듈 불러오기
import Tag from "../tag/tag";

const Calendar = ({
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
}) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate(); // 현재 달의 총 날짜 수
  const firstDayIndex = firstDayOfMonth.getDay(); // 첫날 요일 인덱스 (0~6)

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cells = [];

  const isToday = (day) => {
    let today = new Date();
    return day === today.getDate() && month === today.getMonth();
  };

  const isHoliday = (day) => {
    let today = new Date(year, month, day);
    return today.getDay() === 0;
  };

  const datePick = (day) => {
    let pickDate = new Date(year, month, day);
  };

  for (let i = 0; i < firstDayIndex; i++) {
    cells.push(
      <div
        key={`empty-${i}`}
        className={`${styles.cell} ${styles["empty-cell"]}`}
      ></div>
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    cells.push(
      <div
        key={`day-${i}`}
        className={`${styles.cell} ${styles["date-cell"]}`}
        onClick={() => datePick(i)}
      >
        <div
          className={`${styles.date} 
          ${isToday(i) ? styles["date-today"] : ""}
          ${isHoliday(i) ? styles["date-holiday"] : ""}
          `}
        >
          {i}
        </div>
        <div className={styles.content}>
          <Tag text={"한태희 휴가"} color={"#E0EDFF"}></Tag>
          <Tag text={"한태희 휴가"} color={"#E0EDFF"} type={"3"}></Tag>
        </div>
      </div>
    );
  }

  const remainingCells = 7 - (cells.length % 7);
  if (remainingCells < 7) {
    for (let i = 0; i < remainingCells; i++) {
      cells.push(
        <div
          key={`empty-end-${i}`}
          className={`${styles.cell} ${styles["empty-cell"]}`}
        ></div>
      );
    }
  }

  return (
    <div>
      <div className={styles.calendar}>
        <div className={styles.header}>
          {weekDays.map((day, index) => (
            <div key={index} className={styles.day}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.body}>{cells}</div>
      </div>
    </div>
  );
};

export default Calendar;
