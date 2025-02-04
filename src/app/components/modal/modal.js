"use client";

import React, { useState } from "react";
import styles from "./modal.module.css";
import Image from "next/image";
import { useUserInfo } from "@/app/context/userInfo";
import { convartKST } from "@/app/util/DateUtil";

const postSchedule = async (userId, convartDate, type, option, detail) => {
  await fetch("https://weallys-electronic-approval.vercel.app/api/schedule", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      date: convartDate.getTime(),
      type: type,
      option: option,
      detail: detail,
    }),
  });
};

const formatDate = (date) => {
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 (${weekDays[date.getDay()]})`;
};

const Modal = ({ pickDate, setOpenModal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [type, setType] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [wizard, setWizard] = useState(1);
  const userInfo = useUserInfo();
  const onClose = () => {
    setOpenModal(false);
  };

  const handleNextButton = () => {
    setWizard(2);
  };

  const handleRequest = () => {
    let KSTDate = convartKST(pickDate);
    let detail = document.querySelector("#detail").value;
    postSchedule(userInfo.id, KSTDate, type, selectedOption, detail);
    setWizard(0);
  };

  const handleSelect = (text) => {
    setType(text);
    setSelectedOption(null);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button className={styles.closeButton} onClick={() => onClose()}>
            <Image
              src="/icons/close-icon.svg"
              alt="close"
              width={12}
              height={12}
            />
          </button>
        </div>

        <div className={styles.dateSection}>
          <span className={styles.selectDate}>{formatDate(pickDate)}</span>
          <div className={styles.selectOption}>
            <span> {type || ""} </span>
            <span>{selectedOption || ""}</span>
          </div>
        </div>
        {wizard === 1 && (
          <div className={styles.container}>
            <div className={styles.dropdown}>
              <h3 className={styles.extraTitle}>일정 종류 선택</h3>
              <button
                className={styles.dropdownButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {type || "선택해주세요"}
              </button>
              {isDropdownOpen && (
                <ul className={styles.dropdownMenu}>
                  <li
                    className={styles.dropdownItem}
                    onClick={() => handleSelect("휴가")}
                  >
                    휴가
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={() => handleSelect("외부 교육")}
                  >
                    외부 교육
                  </li>
                </ul>
              )}
            </div>

            <div
              className={`${styles.extraContent} ${type ? styles.visible : ""}`}
            >
              <h3 className={styles.extraTitle}>세부 일정 선택</h3>
              <div className={styles.radioGroup}>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="leaveType"
                    value="하루 종일"
                    checked={selectedOption === "하루 종일"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <span className={styles.customRadio}></span>
                  <span className={styles.radioLabel}>하루 종일</span>
                </label>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="leaveType"
                    value="오전"
                    checked={selectedOption === "오전"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <span className={styles.customRadio}></span>
                  <span className={styles.radioLabel}>오전</span>
                </label>
                <label className={styles.radioOption}>
                  <input
                    type="radio"
                    name="leaveType"
                    value="오후"
                    checked={selectedOption === "오후"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <span className={styles.customRadio}></span>
                  <span className={styles.radioLabel}>오후</span>
                </label>
              </div>
            </div>
            <button className={styles.submitButton} onClick={handleNextButton}>
              다음
            </button>
          </div>
        )}
        {wizard === 2 && (
          <div className={styles.container}>
            <div className={styles.extraTitle}>메모</div>
            <textarea
              id="detail"
              className={styles.memo}
              placeholder="간략한 내용을 입력해주세요"
            ></textarea>
            <button className={styles.submitButton} onClick={handleRequest}>
              일정 요청하기
            </button>
          </div>
        )}
      </div>
      {wizard === 0 && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.header} style={{ justifyContent: "center" }}>
              <div className={styles.title} style={{ marginBottom: "20px" }}>
                신청 완료!
              </div>
            </div>
            <div className={styles.container}>
              <div
                className={styles.extraTitle}
                style={{ marginBottom: "50px" }}
              >
                승인 여부를 Teams 로 알려드릴게요! 😊
              </div>
              <button className={styles.submitButton} onClick={() => onClose()}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
