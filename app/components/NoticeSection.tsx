"use client";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

export const NoticeSection = () => {
  const notices = [
    {
      title: "사순절 두 번째 주일",
      date: "2024.03.17"
    },
    {
      title: "재직회 부서 정기 회의",
      date: "2024.03.10"
    },
    {
      title: "3월 공동 의회 주제",
      date: "2024.03.03"
    }
  ];

  return (
    <motion.div 
      className="w-full mt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* 제목 섹션 */}
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-2xl font-semibold">공지사항</h2>
        <IoIosArrowForward className="text-xl cursor-pointer" />
      </div>

      {/* 카드 섹션 */}
      <div className="flex flex-col gap-3 px-4">
        {notices.map((notice, index) => (
          <motion.div 
            key={index}
            className="w-full aspect-[5/1] bg-white rounded-xl shadow-sm p-2.5 flex flex-col justify-between cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-sm font-medium">{notice.title}</h3>
            <span className="text-xs text-gray-500">{notice.date}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NoticeSection; 