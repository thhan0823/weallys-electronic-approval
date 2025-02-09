"use client";

import { createContext, useContext } from "react";

const UserInfo = createContext(null);

export const useUserInfo = () => useContext(UserInfo);

export const UserProvider = ({ userProfile, children }) => {
  console.log(userProfile);
  return <UserInfo.Provider value={userProfile}>{children}</UserInfo.Provider>;
};

export default UserInfo;
