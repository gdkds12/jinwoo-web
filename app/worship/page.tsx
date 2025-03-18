"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaPlayCircle } from "react-icons/fa";
import Link from "next/link";

const WorshipPage = () => {
  const sermon = {
    title: "하나님의 은혜",
    pastor: "홍길동 목사",
    date: "2023년 10월 10일",
    scripture: "요한복음 3:16",
    imageUrl: "/images/sermon.jpg",
  };

  return (
    <div className="pt-24 px-4 pb-10">
      <h1 className="text-2xl font-bold mb-6 pl-2">말씀</h1>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="h-48 bg-gray-200 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <FaPlayCircle className="text-4xl text-white opacity-80" />
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{sermon.title}</h2>
          <p className="text-gray-700 mb-1">{sermon.pastor}</p>
          <p className="text-gray-500 text-sm mb-2">{sermon.scripture}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <FaCalendarAlt className="mr-1" />
            <span>{sermon.date}</span>
          </div>
        </div>
        <Link 
          href="/worship/1" 
          className="block w-full bg-gray-100 text-center py-3 font-medium text-gray-700 hover:bg-gray-200 transition-colors"
        >
          자세히 보기
        </Link>
      </motion.div>
    </div>
  );
};

export default WorshipPage; 