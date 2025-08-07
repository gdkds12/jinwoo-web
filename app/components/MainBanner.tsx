"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const MainBanner = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/images/main-home.jpg"
        alt="메인 배너"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 px-3 py-1 bg-black/20 rounded-full text-sm"
        >
          2025년 &quot;새로운 길&quot; 주일 설교 시리즈 (이사야서 강해)
        </motion.div>
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          앙망하라, 새로운 길이
          <br />
          반드시 열리리라!
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Turn to God and a New Way Will Surely Open
        </motion.p>
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button className="px-8 py-3 bg-white/20 border border-white rounded-full hover:bg-white/30 transition-colors">
            생방송
          </button>
          <button className="px-8 py-3 bg-white/20 border border-white rounded-full hover:bg-white/30 transition-colors">
            은혜게시판
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default MainBanner;