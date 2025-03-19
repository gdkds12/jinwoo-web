"use client";
import React from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { FaHandHoldingHeart, FaPray, FaChurch, FaGraduationCap, FaCross, FaHeart } from "react-icons/fa";

type OfferingGuideProps = {
  onClose: () => void;
};

// 헌금 정보
const offeringData = {
  bankAccount: "OO은행 123-456-789012 (예금주: 진우교회)",
  offeringTypes: [
    { 
      icon: <FaHandHoldingHeart />, 
      name: "십일조", 
      description: "월 소득의 10%를 하나님께 드리는 헌금입니다." 
    },
    { 
      icon: <FaPray />, 
      name: "감사헌금", 
      description: "개인적인 감사의 마음을 담아 드리는 헌금입니다." 
    },
    { 
      icon: <FaChurch />, 
      name: "주일헌금", 
      description: "주일예배를 드리며 감사함으로 드리는 헌금입니다." 
    },
    { 
      icon: <FaGraduationCap />, 
      name: "교육헌금", 
      description: "다음 세대 교육을 위해 드리는 헌금입니다." 
    },
    { 
      icon: <FaCross />, 
      name: "선교헌금", 
      description: "국내외 선교사역을 위해 드리는 헌금입니다." 
    },
    { 
      icon: <FaHeart />, 
      name: "구제헌금", 
      description: "어려운 이웃을 돕기 위해 드리는 헌금입니다." 
    }
  ],
  onlineGuide: "모바일 뱅킹, 인터넷 뱅킹을 통해 계좌이체가 가능합니다. 메모/이체 내용에 헌금 종류와 이름을 기재해 주시기 바랍니다.",
  offlineGuide: "주일 예배 시간에 헌금 봉투에 이름과 헌금 종류를 기재한 후 헌금함에 넣으시면 됩니다."
};

export const OfferingGuide: React.FC<OfferingGuideProps> = ({ onClose }) => {
  const offeringVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "100%", opacity: 0 }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 bg-white z-[60] p-5 overflow-y-auto"
      initial="closed"
      animate="open"
      exit="closed"
      variants={offeringVariants}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div 
          className="w-10 h-10 flex items-center cursor-pointer"
          onClick={onClose}
        >
          <IoIosArrowBack size={20} className="text-gray-600" />
        </div>
        <h1 className="text-xl font-bold">헌금 안내</h1>
        <div className="w-10"></div>
      </div>

      <motion.div
        className="mt-4 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 헌금 안내 메시지 */}
        <motion.div
          className="text-center space-y-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-gray-800">진우교회 헌금 안내</h2>
          <div className="mt-4 px-6 py-3 bg-yellow-50 rounded-lg italic text-gray-700 text-sm">
            &ldquo;각각 그 마음에 정한 대로 할 것이요 인색함으로나 억지로 하지 말지니 하나님은 즐겨 내는 자를 사랑하시느니라&rdquo; (고린도후서 9:7)
          </div>
        </motion.div>

        {/* 헌금 계좌 정보 */}
        <motion.div
          className="rounded-lg p-4 bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-bold mb-2 text-gray-800">헌금 계좌 안내</h3>
          <p className="text-gray-700 font-medium">{offeringData.bankAccount}</p>
        </motion.div>

        {/* 헌금 종류 */}
        <motion.div
          className="rounded-lg p-4 bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-bold mb-4 border-b pb-2">헌금 종류</h3>
          <div className="space-y-4">
            {offeringData.offeringTypes.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                <div className="w-8 h-8 flex items-center justify-center text-gray-600 mr-3 mt-0.5">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 온라인 헌금 안내 */}
        <motion.div
          className="rounded-lg p-4 bg-blue-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-lg font-bold mb-2 text-blue-700">온라인 헌금 안내</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {offeringData.onlineGuide}
          </p>
        </motion.div>

        {/* 오프라인 헌금 안내 */}
        <motion.div
          className="rounded-lg p-4 bg-green-50 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-lg font-bold mb-2 text-green-700">주일 헌금 안내</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {offeringData.offlineGuide}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OfferingGuide; 