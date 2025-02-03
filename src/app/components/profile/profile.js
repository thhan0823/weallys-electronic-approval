import React from "react";
import styles from "./profile.module.css";
import { useUserInfo } from "@/app/context/userInfo";

const getRecentSchedule = (schedules) => {
  const schedule = schedules[0];
  const date = new Date(parseInt(schedule.date));

  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
    approved: schedule.approved,
  };
};

const Profile = () => {
  const userProfile = useUserInfo();
  const recentSchedule = getRecentSchedule(userProfile.schedule);
  return (
    <div className={styles.container}>
      <span className={styles["profile-img"]}>
        {userProfile.name.slice(0, 1)}
      </span>
      <div className={styles["profile-info"]}>
        <span>{userProfile.name}님, 환영합니다!</span>
        {recentSchedule && (
          <div className={styles["recent-schedule"]}>
            <span>
              {recentSchedule.month}월 {recentSchedule.day}일
            </span>
            {recentSchedule.approved ? (
              <span> 일정이 있습니다! 🥳</span>
            ) : (
              <span> 일정 승인 대기중입니다!</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
