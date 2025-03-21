"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { FaCross, FaPray, FaMusic, FaBookOpen, FaBullhorn } from "react-icons/fa";

type ChurchBulletinProps = {
  onClose: () => void;
};

// 주보 데이터
const bulletinData = {
  date: "2023년 6월 11일",
  title: "제 123호",
  churchName: "진우교회",
  mainVerse: "여호와는 나의 목자시니 내게 부족함이 없으리로다 (시편 23:1)",
  worshipOrder: [
    { icon: <FaCross />, title: "예배의 부름", content: "사회자" },
    { icon: <FaPray />, title: "기도", content: "김집사" },
    { icon: <FaMusic />, title: "찬송", content: "찬송가 478장 '참 아름다워라'" },
    { icon: <FaBookOpen />, title: "성경봉독", content: "로마서 8:28-39" },
    { icon: <FaMusic />, title: "찬양", content: "할렐루야 성가대 '주님의 은혜'" },
    { icon: <FaBookOpen />, title: "말씀", content: "하나님의 사랑 안에서" },
    { icon: <FaPray />, title: "축도", content: "담임목사" }
  ],
  announcements: [
    "다음 주일은 전교인 야외예배로 드립니다.",
    "수요 성경공부가 저녁 7시부터 진행됩니다.",
    "주일학교 여름캠프 신청을 받고 있습니다.",
    "새가족 환영회가 오늘 예배 후 친교실에서 있습니다."
  ],
  pastorMessage: "사랑하는 성도 여러분, 하나님의 은혜와 평강이 함께하시기를 기도합니다. 오늘 말씀을 통해 우리를 향한 하나님의 변함없는 사랑을 깊이 묵상하는 시간이 되시길 바랍니다."
};

export const ChurchBulletin: React.FC<ChurchBulletinProps> = ({ onClose }) => {
  const bulletinVariants = {
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
      className="fixed top-0 left-0 right-0 bottom-0 bg-white dark:bg-dark z-[60] overflow-hidden flex justify-center"
      initial="closed"
      animate="open"
      exit="closed"
      variants={bulletinVariants}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
    >
      <div className="w-full max-w-[550px] md:max-w-[720px] h-full flex flex-col">
        <div className="flex items-center justify-between p-5">
          <div 
            className="w-10 h-10 flex items-center cursor-pointer"
            onClick={onClose}
          >
            <IoIosArrowBack size={20} className="text-gray-600 dark:text-gray-300" />
          </div>
          <h1 className="text-xl font-bold dark:text-white">주보</h1>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-5">
          <motion.div
            className="mt-4 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 주보 헤더 */}
            <motion.div
              className="text-center space-y-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{bulletinData.churchName}</h2>
              <div className="text-sm text-gray-600 dark:text-gray-300">{bulletinData.date} {bulletinData.title}</div>
              <div className="mt-4 px-6 py-3 bg-gray-50 dark:bg-dark-700 rounded-lg italic text-gray-700 dark:text-gray-300 text-sm">
                &ldquo;{bulletinData.mainVerse}&rdquo;
              </div>
            </motion.div>

            {/* 예배 순서 */}
            <motion.div
              className="rounded-lg space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold mb-4 border-b pb-2">예배 순서</h3>
              <div className="space-y-4">
                {bulletinData.worshipOrder.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-8 h-8 flex items-center justify-center text-gray-600 mr-3">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.content}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 목회자 메시지 */}
            <motion.div
              className="rounded-lg p-4 bg-blue-50 my-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="text-lg font-bold mb-2 text-blue-700">목회자 메시지</h3>
              <p className="text-sm text-gray-700 leading-relaxed italic">
                {bulletinData.pastorMessage}
              </p>
            </motion.div>

            {/* 공지사항 */}
            <motion.div
              className="rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-lg font-bold mb-4 border-b pb-2 flex items-center">
                <FaBullhorn className="mr-2 text-gray-600" /> 공지사항
              </h3>
              <ul className="space-y-2 pl-2">
                {bulletinData.announcements.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChurchBulletin; 