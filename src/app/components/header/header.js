"use client";

import React from "react";
import styles from "./header.module.css";
import { usePathname } from "next/navigation";
import Profile from "../profile/profile";

const Header = ({ userProfile }) => {
  const pathname = usePathname();

  return (
    <div className={styles.header}>
      <div className={styles.profile}>
        <Profile userProfile={userProfile} />
      </div>
      <div className={styles.navigation}>
        <a
          href="/dashboard"
          className={`${pathname === "/dashboard" ? styles.active : ""}`}
        >
          휴가 현황
        </a>
        <a
          href="/history"
          className={`${pathname === "/history" ? styles.active : ""}`}
        >
          휴가 이력
        </a>
      </div>
      <hr color="#D3D3D3" />
    </div>
  );
};

export default Header;
