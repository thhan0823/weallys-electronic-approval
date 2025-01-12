import React from "react";
import styles from "./profile.module.css";

const Profile = ({userProfile}) => {

    return (
        <div className={styles.container}>
            <span className={styles["profile-img"]}>{userProfile.name.slice(0,1)}</span>
            <span>{userProfile.name}님, 어서오세요!</span>
        </div>
    );
}

export default Profile;