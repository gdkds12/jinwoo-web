// components/AnimatedCard.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnimatedCardProps {
  menuData: { [key: string]: string[] };
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({ menuData }) => {
  return (
    <motion.div
      className="bg-white shadow-lg  w-full" //h-[300px] 제거
      initial={{ opacity: 0, y: 0 }} //  y: 0 에서 시작
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }} //  y: 0 에서 사라짐
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-[1400px] mx-auto  px-4 py-4 flex flex-wrap justify-between gap-4">
        {Object.entries(menuData).map(([mainMenuItem, subMenuItems]) => (
          <div key={mainMenuItem} className="flex flex-col gap-2">
            <h4 className="font-bold text-foreground">{mainMenuItem}</h4>
            <div className="flex flex-wrap">
              {subMenuItems
                .slice(0, mainMenuItem === "소통" ? 4 : undefined)
                .map((item) => (
                  <div
                    key={item}
                    className="text-foreground hover:text-gray-600 mr-4 whitespace-nowrap"
                  >
                    {item}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};