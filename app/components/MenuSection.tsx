"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaRegClock, FaNewspaper, FaMapMarkedAlt, FaHandHoldingHeart } from "react-icons/fa";

export const MenuSection = () => {
  const handleShowWorshipTime = () => {
    const event = new CustomEvent('showWorshipTime');
    document.dispatchEvent(event);
  };

  const handleShowBulletin = () => {
    const event = new CustomEvent('showBulletin');
    document.dispatchEvent(event);
  };

  const handleShowLocation = () => {
    const event = new CustomEvent('showLocation');
    document.dispatchEvent(event);
  };

  const handleShowOffering = () => {
    const event = new CustomEvent('showOffering');
    document.dispatchEvent(event);
  };
  
  const menuItems = [
    { text: "예배 시간", onClick: handleShowWorshipTime, icon: FaRegClock },
    { text: "주보", onClick: handleShowBulletin, icon: FaNewspaper },
    { text: "오시는 길", onClick: handleShowLocation, icon: FaMapMarkedAlt },
    { text: "헌금안내", onClick: handleShowOffering, icon: FaHandHoldingHeart }
  ];

  return (
    <motion.div 
      className="w-full mt-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2 px-2.5">
        {menuItems.map((item, index) => (
          <motion.div 
            key={index}
            className="flex-1 aspect-[2/1] md:aspect-square bg-white dark:bg-neutral-800 rounded-xl flex flex-row items-center justify-center gap-2 md:flex-col md:gap-1 cursor-pointer relative hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={item.onClick}
            whileHover={{ 
              scale: 1.05,
              // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" // 호버 시 배경색 변경으로 대체
            }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300" />
            <motion.span 
              className="text-xs md:text-sm font-medium whitespace-nowrap dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              {item.text}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MenuSection; 