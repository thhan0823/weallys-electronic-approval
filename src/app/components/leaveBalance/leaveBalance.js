import React from "react";
import styles from "./leaveBalance.module.css";
import Image from "next/image";

const LeaveBalance = () => {
  return (
    <div className={styles.container}>
      <div className={styles["leave-balance"]}>
        <div className={styles.title}>
          <div className={styles.tooltip}>
            <div className={styles["speech-bubble"]}>
              <p className={styles["bubble-title"]}>연차 계산 안내</p>
              <ul>
                <li>
                  연차는 <strong>회계연도 기준</strong>으로 지급됩니다.
                </li>
                <li>
                  입사 첫해에는 <strong>근무 개월 수에 비례한 연차</strong>가
                  지급됩니다.
                </li>
                <li>
                  입사 1년 후부터는 매년 <strong>1월 1일 기준</strong>으로
                  연차가 부여됩니다.
                </li>
              </ul>
            </div>
            <Image
              src="/icons/info_circle.svg"
              alt="tooltip"
              width={12}
              height={12}
            />
          </div>
          <span>잔여 연차</span>
          <span> / </span>
          <span>총 연차</span>
        </div>
        <div className={styles.value}>
          <span>15</span>
          <span> / </span>
          <span>15</span>
        </div>
      </div>
    </div>
  );
};

export default LeaveBalance;
