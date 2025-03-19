"use client";
import React from "react";
import { motion } from "framer-motion";

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
    { text: "예배 시간", onClick: handleShowWorshipTime },
    { text: "주보", onClick: handleShowBulletin },
    { text: "오시는 길", onClick: handleShowLocation },
    { text: "헌금안내", onClick: handleShowOffering }
  ];

  return (
    <motion.div 
      className="w-full mt-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-3 px-6 mb-2">
        {menuItems.map((item, index) => (
          <motion.div 
            key={index}
            className="flex-1 aspect-[5/2.5] bg-transparent border border-black border-opacity-20 rounded-xl flex items-center cursor-pointer relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={item.onClick}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="text-xs font-medium whitespace-nowrap absolute left-1/2 -translate-x-1/2"
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