"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";

type WorshipTimeProps = {
  onClose: () => void;
};

export const WorshipTime: React.FC<WorshipTimeProps> = ({ onClose }) => {
  const worshipTimeVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "100%", opacity: 0 }
  };

  useEffect(() => {
    // 오버레이가 열릴 때 body 스크롤 방지
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.top = '0';
    
    return () => {
      // 컴포넌트가 언마운트될 때 body 스크롤 복구
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 bg-white z-[60] overflow-hidden"
      initial="closed"
      animate="open"
      exit="closed"
      variants={worshipTimeVariants}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-5">
          <div 
            className="w-10 h-10 flex items-center cursor-pointer"
            onClick={onClose}
          >
            <IoIosArrowBack size={20} className="text-gray-600" />
          </div>
          <h1 className="text-xl font-bold">예배 시간</h1>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-5">
          <motion.div 
            className="mt-4 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-lg font-bold mb-3 text-gray-800">주일 예배</h2>
              <div className="space-y-3">
                <motion.div 
                  className="flex justify-between items-center border-b pb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <span className="font-medium">1부 예배</span>
                  <span className="text-gray-600">10:30 - 12:00</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <span className="font-medium">2부 예배</span>
                  <span className="text-gray-600">13:00 - 14:10</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-lg font-bold mb-3 text-gray-800">주중 예배</h2>
              <div className="space-y-3">
                <motion.div 
                  className="flex justify-between items-center border-b pb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <span className="font-medium">수요 예배</span>
                  <span className="text-gray-600">19:00 - 20:30</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center border-b pb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <span className="font-medium">금요 예배</span>
                  <span className="text-gray-600">19:00 - 20:30</span>
                </motion.div>
                <motion.div 
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 }}
                >
                  <span className="font-medium">새벽 기도회</span>
                  <span className="text-gray-600">매일 05:00</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorshipTime; 