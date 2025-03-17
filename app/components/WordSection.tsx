"use client";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

export const WordSection = () => {
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
        <h2 className="text-2xl font-semibold">말씀</h2>
        <IoIosArrowForward className="text-xl cursor-pointer" />
      </div>

      {/* 카드 섹션 */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 px-4">
          {/* 첫 번째 카드 */}
          <motion.div 
            className="flex-none w-[85%] aspect-square rounded-xl bg-[#212121] p-4 flex flex-col cursor-pointer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-end mb-2">
              <h3 className="text-white text-lg font-medium">이번주 말씀</h3>
              <p className="text-white/80 text-sm">요한복음 1:1 KOERV</p>
            </div>
            <div className="flex-1 flex items-center justify-end text-right">
              <p className="text-white text-xl font-medium leading-relaxed">
                맨 처음, 세상이 시작되기 전에<br />
                말씀이 계셨다. 그 말씀은<br />
                하나님과 함께 계셨고<br />
                말씀이 곧 하나님이셨다.
              </p>
            </div>
          </motion.div>

          {/* 두 번째 카드 */}
          <motion.div 
            className="flex-none w-[85%] aspect-square rounded-xl bg-[#212121] p-4 flex flex-col cursor-pointer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col items-end mb-2">
              <h3 className="text-white text-lg font-medium">2024.03.10</h3>
              <p className="text-white/80 text-sm">시편 46:1-2 KOERV</p>
            </div>
            <div className="flex-1 flex items-center justify-end text-right">
              <p className="text-white text-xl font-medium leading-relaxed">
                하나님은 우리의 피난처시요<br />
                힘이시며 환난 중에 만나시는<br />
                도움이시라 그러므로 우리가<br />
                두려워하지 아니하리라
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WordSection; 