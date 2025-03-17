// app/components/GallerySection.tsx
"use client";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

export const GallerySection = () => {
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
        <h2 className="text-2xl font-semibold">갤러리</h2>
        <IoIosArrowForward className="text-xl cursor-pointer" />
      </div>

      {/* 카드 섹션 */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 px-4">
          {/* 첫 번째 카드 */}
          <motion.div 
            className="flex-none w-[85%] aspect-[3/3.5] rounded-xl bg-[#212121]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          />
          
          {/* 두 번째 카드 (살짝 보이는 효과) */}
          <motion.div 
            className="flex-none w-[85%] aspect-[3/3.5] rounded-xl bg-[#212121]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default GallerySection;