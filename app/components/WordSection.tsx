"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosSunny } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

// 말씀 데이터 인터페이스
interface Scripture {
  id: number;
  title: string;
  reference: string;
  content: string;
  date: string;
}

// 예시 말씀 데이터
const scriptureData: Scripture[] = [
  {
    id: 1,
    title: "이번주 말씀",
    reference: "요한복음 1:1 KOERV",
    content: "맨 처음, 세상이 시작되기 전에 말씀이 계셨다. 그 말씀은 하나님과 함께 계셨고 말씀이 곧 하나님이셨다.",
    date: "06.09"
  },
  {
    id: 2,
    title: "오늘의 말씀",
    reference: "시편 46:1-2 KOERV",
    content: "하나님은 우리의 피난처시요 힘이시며 환난 중에 만나시는 도움이시라 그러므로 우리가 두려워하지 아니하리라",
    date: "06.02"
  },
  {
    id: 3,
    title: "주일 설교",
    reference: "로마서 8:28 KOERV",
    content: "우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라",
    date: "05.26"
  },
  {
    id: 4,
    title: "아침 경건",
    reference: "잠언 3:5-6 KOERV",
    content: "너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라 너는 범사에 그를 인정하라 그리하면 네 길을 지도하시리라",
    date: "05.19"
  },
];

export const WordSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandedText, setShowExpandedText] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollPos = useRef(0);

  // 통합된 스크롤 제어 useEffect
  useEffect(() => {
    const isModalOpen = isExpanded || showHistory;
    if (isModalOpen) {
      scrollPos.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPos.current}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPos.current);
    }

    // 텍스트 표시/숨김 처리
    if (isExpanded) {
      const timer = setTimeout(() => setShowExpandedText(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowExpandedText(false);
    }
  }, [isExpanded, showHistory]);

  const handleTouchMove = (e: React.TouchEvent) => {
    const menuElement = menuRef.current;
    if (!menuElement) return;

    const { scrollTop, scrollHeight, clientHeight } = menuElement;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    if ((isAtTop && e.touches[0].clientY > 0) || 
        (isAtBottom && e.touches[0].clientY < 0)) {
      e.preventDefault();
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
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

  // 페이지 전환 애니메이션
  const containerVariants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0,
      transition: {
        type: "tween",
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { x: "100%" }
  };

  // 아이템 진입 애니메이션
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // 본문 첫 줄 들여쓰기 처리
  const formatContent = (content: string) => {
    const sentences = content.split(". ");
    if (sentences.length <= 1) return content;
    
    return (
      <>
        <span className="inline-block pl-4">{sentences[0]}. </span>
        {sentences.slice(1).join(". ")}
      </>
    );
  };

  return (
    <motion.div 
      className="w-full mt-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="relative w-full bg-white rounded-xl overflow-hidden cursor-pointer group"
        onClick={toggleExpand}
      >
        <div className="relative w-full h-64">
          <Image
            src="/images/background/image1.jpg"
            alt="Main"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        <div className="w-full p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{scriptureData[0].title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{scriptureData[0].content}</p>
          <p className="text-sm text-gray-500">{scriptureData[0].reference}</p>
        </div>
      </div>

      {/* AnimatePresence for expanded view */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="fixed inset-0 z-[9999] flex justify-center"
            initial={{ borderRadius: "0.75rem", opacity: 0, scale: 0.9 }}
            animate={{ borderRadius: 0, opacity: 1, scale: 1 }}
            exit={{ borderRadius: "0.75rem", opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={(e) => e.target === e.currentTarget && toggleExpand()}
          >
            <div className="w-full max-w-[550px] h-screen flex flex-col">
              <div className="absolute inset-0 z-0">
                <Image 
                  src="/images/background/image1.jpg" 
                  alt="배경 이미지" 
                  className="w-full h-full object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/60 z-10"></div>
              </div>
              <div className="flex justify-end w-full p-4 mb-6 relative z-10">
                <IoMdClose 
                  className="text-3xl text-white cursor-pointer" 
                  onClick={toggleExpand}
                />
              </div>
              
              <AnimatePresence>
                {showExpandedText && (
                  <motion.div 
                    className="flex-1 flex flex-col items-end justify-center p-4 relative z-10"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AnimatePresence for history view */}
      <AnimatePresence>
        {showHistory && (
          <motion.div 
            ref={menuRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[9999] bg-white dark:bg-dark flex justify-center"
            style={{ 
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y'
            }}
            onTouchMove={handleTouchMove}
          >
            <div className="w-full max-w-[550px] h-screen flex flex-col overflow-y-auto">
              {/* 헤더 */}
              <motion.div 
                variants={itemVariants}
                className="p-4 sticky top-0 bg-white dark:bg-dark z-10 relative"
              >
                <div className="flex items-center justify-center">
                  <button onClick={toggleHistory} className="absolute left-2 p-2">
                    <IoIosArrowBack className="text-2xl dark:text-gray-300" />
                  </button>
                  <h1 className="text-xl font-semibold dark:text-white">말씀</h1>
                </div>
              </motion.div>

              {/* 말씀 목록 */}
              <div className="flex-1 p-4 pb-24">
                {scriptureData.map((scripture) => (
                  <motion.div 
                    key={scripture.id} 
                    className="mb-10 pb-6 border-b border-gray-100 dark:border-gray-700"
                    variants={itemVariants}
                  >
                    <div className="flex justify-between items-baseline mb-2">
                      <div className="flex items-center gap-2">
                        <IoIosSunny className="text-yellow-500 text-lg" />
                        <h3 className="text-lg font-semibold dark:text-white">{scripture.reference}</h3>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{scripture.date}</span>
                    </div>
                    <p className="text-base leading-relaxed mt-3 dark:text-gray-300">
                      {formatContent(scripture.content)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WordSection;