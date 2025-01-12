import React from "react";
import styles from "./leaveBalance.module.css"

const LeaveBalance = () => {
    return (
        <div className={styles.container}>
            <div className={styles["leave-balance"]}>
                <div className={styles.title}>
                    <span>사용 가능 연차</span>
                    <span> / </span>
                    <span>총 연차</span>
                </div>
                <div className={styles.value}>
                    <span>15</span>
                    <span> / </span>
                    <span>15</span>
                </div>
            </div>
            <div className={styles["join-date"]}>
                <div className={styles.title}>
                    <span> 나의 입사일</span>
                </div>
                <div className={styles.tag}>
                    <span>🎉</span>
                    <span>2024.01.02</span>
                </div>
            </div>
        </div>
    ); 
}

export default LeaveBalance;
