import React from "react";
import styles from "./profile.module.css";
import { useUserInfo } from "@/app/context/userInfo";

const Profile = () => {
  const userProfile = useUserInfo();
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
