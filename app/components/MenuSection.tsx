"use client";
import React from "react";
import { motion } from "framer-motion";

export const MenuSection = () => {
  const menuItems = [
    { title: "SaRang ON", subtitle: "사랑온" },
    { title: "SaGA", subtitle: "사랑글로벌아카데미" },
    { title: "글로벌 특별새벽부흥회", subtitle: "" },
    { title: "2025 WEA", subtitle: "서울총회" },
    { title: "제4회", subtitle: "한국교회섬김의날" },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 py-8">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              className="p-4 bg-gray-100 dark:bg-neutral-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-gray-800 dark:text-white">{item.title}</h3>
              {item.subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{item.subtitle}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSection;