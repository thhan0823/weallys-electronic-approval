"use client";

import { useEffect } from "react";
import { app } from "@microsoft/teams-js";

export default function TeamsApp() {
  useEffect(() => {
    // Teams SDK 초기화
    app
      .initialize()
      .then(() => {
        console.log("Teams SDK initialized");

        // Teams 컨텍스트 가져오기
        return app.getContext();
      })
      .then((context) => {
        console.log("Teams Context:", context);
      })
      .catch((error) => {
        console.error("Error initializing or fetching context:", error);
      });
  }, []);

  return null;
}
