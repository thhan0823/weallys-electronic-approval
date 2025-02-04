"use client";

import React, { useState, useEffect } from "react";
import styles from "./calendar.module.css"; // CSS 모듈 불러오기
import Modal from "../modal/modal";
import Tag from "../tag/tag";
import { useUserInfo } from "@/app/context/userInfo";
import { convartKST, getType } from "@/app/util/DateUtil";

const getSchedule = async (email, year, month) => {
  const params = new URLSearchParams({
    email: email,
    year: year,
    month: month,
  });

  return await fetch(
    `https://weallys-electronic-approval.vercel.app/api/schedule?${params}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
};

const Calendar = ({
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
}) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const [openModal, setOpenModal] = useState(false);
  const [pickDate, setPickDate] = useState(null);
  const [schedule, setSchedule] = useState(new Map());
  const daysInMonth = lastDayOfMonth.getDate(); // 현재 달의 총 날짜 수
  const firstDayIndex = firstDayOfMonth.getDay(); // 첫날 요일 인덱스 (0~6)
  const userInfo = useUserInfo();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cells = [];

  useEffect(() => {
    getSchedule(userInfo.email, year, month).then((data) => {
      if (!data || data.length === 0) return;

      const scheduleMap = new Map(
        data.map((item) => [parseInt(item.date), item])
      );

      setSchedule(scheduleMap);
    });
  }, [month]);

  const isToday = (day) => {
    let today = new Date();
    return day === today.getDate() && month === today.getMonth();
  };

  const isHoliday = (day) => {
    let today = new Date(year, month, day);
    return today.getDay() === 0;
  };

  const datePick = async (day) => {
    let pickDate = new Date(year, month, day);
    setPickDate(pickDate);
    setOpenModal(true);
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
    const dateTimestamp = new Date(year, month, i);
    let kst = convartKST(dateTimestamp).getTime();
    const scheduleItem = schedule.get(kst);

    cells.push(
      <div
        key={`day-${i}`}
        className={`${styles.cell} ${styles["date-cell"]}`}
        onClick={isHoliday(i) ? null : () => datePick(i)}
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
          {scheduleItem ? (
            <Tag
              text={`${scheduleItem.user.name} ${getType(scheduleItem.type)}`}
              color={"#E0EDFF"}
              type={scheduleItem.sub_type}
            ></Tag>
          ) : null}
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
      {openModal && <Modal pickDate={pickDate} setOpenModal={setOpenModal} />}
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
