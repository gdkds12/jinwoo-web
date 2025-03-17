"use client";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

export const MenuSection = () => {
  const menuItems = [
    "예배 시간",
    "주보",
    "오시는 길",
    "헌금안내"
  ];

  return (
    <motion.div 
      className="w-full mt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-2 px-4">
        {menuItems.map((item, index) => (
          <motion.div 
            key={index}
            className="flex-1 aspect-[9/3] bg-white rounded-full shadow-sm flex items-center cursor-pointer relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <span className="text-xs font-medium whitespace-nowrap absolute left-1/2 -translate-x-1/2">{item}</span>
            <IoIosArrowForward className="text-sm text-gray-400 absolute right-2" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MenuSection; 