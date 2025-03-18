"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowForward, IoIosArrowBack, IoIosSunny } from "react-icons/io";
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
  const [showHistory, setShowHistory] = useState(false); // 말씀 기록 표시 상태
  const menuRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // 확장 상태가 변경될 때 body 스크롤 제어 및 텍스트 표시 관리
  useEffect(() => {
    if (isExpanded) {
      // 확장 상태일 때 스크롤 방지 및 위치 저장
      setScrollPosition(window.scrollY);
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
      
      // 약간의 지연 후 확장된 텍스트 표시
      const timer = setTimeout(() => {
        setShowExpandedText(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // 일반 상태일 때 스크롤 허용 및 위치 복원
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
      
      setShowExpandedText(false);
    }
  }, [isExpanded, scrollPosition]);

  // 말씀 기록 화면 표시 시에도 스크롤 방지
  useEffect(() => {
    if (showHistory) {
      // 현재 스크롤 위치 저장
      setScrollPosition(window.scrollY);
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // 스크롤 위치 복원
      window.scrollTo(0, scrollPosition);
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // 컴포넌트 언마운트시 스크롤 위치 복원
      if (showHistory) {
        window.scrollTo(0, scrollPosition);
      }
    };
  }, [showHistory, scrollPosition]);

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
    if (!isExpanded) {
      // 확장 전에 현재 스크롤 위치 저장
      setScrollPosition(window.scrollY);
    }
    setIsExpanded(!isExpanded);
  };

  const toggleHistory = () => {
    if (!showHistory) {
      // 토글 전에 현재 스크롤 위치 저장
      setScrollPosition(window.scrollY);
    }
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
      className="w-full mt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* 제목 섹션 */}
      <div 
        className="flex items-center justify-between px-4 mb-4"
        onClick={toggleHistory}
      >
        <h2 className="text-2xl font-semibold cursor-pointer">말씀</h2>
        <IoIosArrowForward className="text-xl cursor-pointer" />
      </div>

      {/* 카드 섹션 */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 px-4">
          {/* 일반 카드 - 항상 표시됨 */}
          <motion.div 
            className="flex-none w-[85%] aspect-square rounded-xl p-4 flex flex-col cursor-pointer relative overflow-hidden"
            animate={{ opacity: isExpanded ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            onClick={toggleExpand}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <Image 
                src="/images/background/image1.jpg" 
                alt="배경 이미지" 
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col items-end mb-2 relative z-10">
              <h3 className="text-white text-lg font-medium">이번주 말씀</h3>
              <p className="text-white/80 text-sm">요한복음 1:1 KOERV</p>
            </div>
            <div className="flex-1 flex items-center justify-end text-right relative z-10">
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
                className="fixed inset-0 z-[9999] flex flex-col w-screen h-screen"
                initial={{ borderRadius: "0.75rem", opacity: 0, scale: 0.9 }}
                animate={{ borderRadius: 0, opacity: 1, scale: 1 }}
                exit={{ borderRadius: "0.75rem", opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-black opacity-70"></div>
                  <Image 
                    src="/images/background/image1.jpg" 
                    alt="배경 이미지" 
                    className="w-full h-full object-cover"
                  />
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 말씀 기록 컴포넌트 */}
      <AnimatePresence>
        {showHistory && (
          <motion.div 
            ref={menuRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[9999] bg-white flex flex-col w-screen h-screen overflow-y-auto overscroll-none"
            style={{ 
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y'
            }}
            onTouchMove={handleTouchMove}
          >
            {/* 헤더 */}
            <motion.div 
              variants={itemVariants}
              className="p-4 sticky top-0 bg-white z-10 relative"
            >
              <div className="flex items-center justify-center">
                <button onClick={toggleHistory} className="absolute left-2 p-2">
                  <IoIosArrowBack className="text-2xl" />
                </button>
                <h1 className="text-xl font-semibold">말씀</h1>
              </div>
            </motion.div>

            {/* 말씀 목록 */}
            <div className="flex-1 p-4 pb-24">
              {scriptureData.map((scripture) => (
                <motion.div 
                  key={scripture.id} 
                  className="mb-10 pb-6 border-b border-gray-100"
                  variants={itemVariants}
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <div className="flex items-center gap-2">
                      <IoIosSunny className="text-yellow-500 text-lg" />
                      <h3 className="text-lg font-semibold">{scripture.reference}</h3>
                    </div>
                    <span className="text-sm text-gray-500">{scripture.date}</span>
                  </div>
                  <p className="text-base leading-relaxed mt-3">
                    {formatContent(scripture.content)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WordSection; 