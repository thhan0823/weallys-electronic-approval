import React from "react";
import CalendarNavigator from "./calendarNavigator";
import styles from "../styles/calendar.module.css"; // CSS 모듈 불러오기

const Calendar = () => {
  const today = new Date();
  const nextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate(); // 현재 달의 총 날짜 수
  const firstDayIndex = firstDayOfMonth.getDay(); // 첫날 요일 인덱스 (0~6)

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cells = [];

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
      <div key={`day-${i}`} className={`${styles.cell} ${styles["date-cell"]}`}>
        <div className={styles.date}>{i}</div>
        <div className={styles.content}></div>
      </div>
    );
  }

  // 마지막 줄의 빈 셀 추가 (7열 맞추기)
  const remainingCells = 7 - (cells.length % 7); // 남은 빈 셀 개수 계산
  if (remainingCells < 7) {
    // 7열로 채워야 하는 경우만 빈 셀 추가
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
      <CalendarNavigator />
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
