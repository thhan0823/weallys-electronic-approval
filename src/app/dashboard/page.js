"use client";

import { useState } from "react";
import Calendar from "../components/calendar/calendar";
import CalendarNavigator from "../components/calendarNavigator/calendarNavigator";
import LeaveBalance from "../components/leaveBalance/leaveBalance";
import styles from "./dashboard.module.css";

const getEnglishMonthName = (month) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[month];
};

const Dashboard = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const month = getEnglishMonthName(currentMonth);

  const nextMonthEvent = () => {
    if (currentMonth === 11) {
      setCurrentYear((year) => year + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((month) => month + 1);
    }
  };

  const prevMonthEvent = () => {
    if (currentMonth === 0) {
      setCurrentYear((year) => year - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((month) => month - 1);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.top}>
        <div className={styles.left}>
          <LeaveBalance />
        </div>
        <div className={styles.title}>
          <span className={styles.year}>{currentYear}</span>
          <span className={styles.month}>{month}</span>
        </div>
        <div className={styles.navi}>
          <CalendarNavigator next={nextMonthEvent} prev={prevMonthEvent} />
        </div>
      </div>
      <div className={styles.calendar}>
        <Calendar year={currentYear} month={currentMonth} />
      </div>
    </div>
  );
};

export default Dashboard;
