"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { app, authentication } from "@microsoft/teams-js";

const Login = () => {
  const router = useRouter();
  const [isTeams, setIsTeams] = useState(null); // ✅ 상태 기본값 null로 설정

  useEffect(() => {
    // Teams SDK 초기화 및 Teams 환경 감지
    app
      .initialize()
      .then(() => app.getContext())
      .then((context) => {
        const isInTeams = context?.app?.host?.name === "Teams";
        console.log("Teams Context:", context);
        if (isInTeams) {
          console.log("Running inside Teams");
          setIsTeams(true);
        } else {
          console.log("Running in browser");
          setIsTeams(false);
        }
      })
      .catch((error) => {
        console.error("Teams initialization failed:", error);
        setIsTeams(false);
      });
  }, []);

  useEffect(() => {
    if (isTeams === null) return; // ✅ 초기 상태에서는 실행하지 않음

    if (isTeams) {
      console.log("Executing Teams login...");
      handleTeamsLogin();
    } else {
      console.log("Executing Web login...");
      handleWebLogin();
    }
  }, [isTeams]); // ✅ isTeams가 null이 아닐 때만 실행됨

  // ✅ 일반 웹 브라우저에서 Azure AD 로그인
  const handleWebLogin = () => {
    console.log("Logging in via NextAuth (Web)");
    signIn("azure-ad", { callbackUrl: "/dashboard", prompt: "consent" }).catch(
      (error) => console.error("Login failed:", error)
    );
  };

  // ✅ Teams 환경에서 Microsoft Teams 인증 실행
  const handleTeamsLogin = () => {
    console.log("Logging in via Teams SDK");
    authentication
      .initiateAuth({
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin/azure-ad`,
        width: 600,
        height: 535,
      })
      .then((result) => {
        console.log("Authentication successful:", result);
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error("Authentication failed:", error);
      });
  };

  return <div>로그인 중...</div>;
};

export default Login;
