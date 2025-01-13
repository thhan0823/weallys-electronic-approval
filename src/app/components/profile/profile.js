import React from "react";
import styles from "./profile.module.css";

const Profile = ({ userProfile }) => {
  return (
    <div className={styles.container}>
      <span className={styles["profile-img"]}>
        {userProfile.name.slice(0, 1)}
      </span>
      <span>{userProfile.name}님, 환영합니다!</span>
    </div>
  );
};

export default Profile;
