"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const MainBanner = () => {
  return (
    <motion.div 
      className="w-full mt-16 px-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md">
        <Image
          src="/images/main-home.jpg"
          alt="메인 배너"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70" />
        <div className="absolute bottom-[13%] left-5 right-5">
          <h1 className="text-white text-2xl font-bold leading-tight">
            항상 기뻐하라<br />
            쉬지말고 기도하라
          </h1>
        </div>
      </div>
    </motion.div>
  );
};

export default MainBanner; 