"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

export const WordSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandedText, setShowExpandedText] = useState(false);

  // 확장 상태가 변경될 때 body 스크롤 제어 및 텍스트 표시 관리
  useEffect(() => {
    if (isExpanded) {
      // 확장 상태일 때 스크롤 방지
      document.body.style.overflow = 'hidden';
      
      // 약간의 지연 후 확장된 텍스트 표시
      const timer = setTimeout(() => {
        setShowExpandedText(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // 일반 상태일 때 스크롤 허용
      document.body.style.overflow = 'auto';
      setShowExpandedText(false);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // 텍스트 애니메이션 설정
  const textVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3
      }
    }
  };

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
          {/* 일반 카드 - 항상 표시됨 */}
          <motion.div 
            className="flex-none w-[85%] aspect-square rounded-xl bg-[#212121] p-4 flex flex-col cursor-pointer"
            animate={{ opacity: isExpanded ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            onClick={toggleExpand}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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

          {/* 확장된 카드 - 확장 상태일 때만 표시됨 */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                className="fixed inset-0 z-[9999] bg-black p-4 flex flex-col w-screen h-screen"
                initial={{ borderRadius: "0.75rem", opacity: 0, scale: 0.9 }}
                animate={{ borderRadius: 0, opacity: 1, scale: 1 }}
                exit={{ borderRadius: "0.75rem", opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="flex justify-end w-full mb-6">
                  <IoMdClose 
                    className="text-3xl text-white cursor-pointer" 
                    onClick={toggleExpand}
                  />
                </div>
                
                <AnimatePresence>
                  {showExpandedText && (
                    <motion.div 
                      className="flex-1 flex flex-col items-end justify-center"
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <div className="flex flex-col items-end mb-4">
                        <h3 className="text-white text-2xl font-medium">이번주 말씀</h3>
                        <p className="text-white/80 text-base">요한복음 1:1 KOERV</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-2xl font-medium leading-relaxed">
                          맨 처음, 세상이 시작되기 전에<br />
                          말씀이 계셨다. 그 말씀은<br />
                          하나님과 함께 계셨고<br />
                          말씀이 곧 하나님이셨다.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default WordSection; 