"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { motion, AnimatePresence, useInView } from "framer-motion";

// 공지사항 인터페이스
interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
  department: string;
}

// 전역 변수로 상태 관리
let noticeInstanceReady = false;
let noticeInstanceShowFn: (() => void) | null = null;

// 전역 상태 관리를 위한 이벤트 관리
export const openNoticeFullScreen = () => {
  // 이미 인스턴스가 준비되었으면 바로 함수 호출
  if (noticeInstanceReady && noticeInstanceShowFn) {
    console.log('인스턴스가 준비됨, 공지사항 표시');
    noticeInstanceShowFn();
    return;
  }
  
  console.log('인스턴스가 준비되지 않음, 상태 저장 및 이벤트 발생');
  
  // 인스턴스가 준비되지 않았으면 localStorage에 상태 저장
  if (typeof window !== 'undefined') {
    localStorage.setItem('noticeEventQueued', 'true');
    localStorage.setItem('noticeQueuedTime', Date.now().toString());
    
    // 이벤트 발생 - 문서 상태와 무관하게 항상 이벤트 발생
    const event = new CustomEvent('openNoticeFullScreen');
    document.dispatchEvent(event);
  }
};

// 문서 로드 완료 감지 - 모든 경우에 이벤트 체크
if (typeof window !== 'undefined') {
  // 페이지가 이미 로드되었는지 확인
  if (document.readyState === 'complete') {
    // 이미 로드된 경우 즉시 확인
    const queuedEvent = localStorage.getItem('noticeEventQueued');
    if (queuedEvent === 'true') {
      console.log('즉시 이벤트 발생 (페이지 이미 로드됨)');
      // 약간의 지연을 두고 이벤트 발생 (DOM이 완전히 로드된 후)
      setTimeout(() => {
        const event = new CustomEvent('openNoticeFullScreen');
        document.dispatchEvent(event);
      }, 100);
    }
  }
  
  // DOMContentLoaded와 load 이벤트 모두 사용
  ['DOMContentLoaded', 'load'].forEach(eventType => {
    window.addEventListener(eventType, () => {
      // localStorage 확인
      const queuedEvent = localStorage.getItem('noticeEventQueued');
      if (queuedEvent === 'true') {
        console.log(`이벤트 발생 (${eventType})`);
        // 약간의 지연을 두고 이벤트 발생 (DOM이 완전히 로드된 후)
        setTimeout(() => {
          const event = new CustomEvent('openNoticeFullScreen');
          document.dispatchEvent(event);
        }, 100);
      }
    });
  });
}

// 예시 공지사항 데이터
const noticeData: Notice[] = [
  {
    id: 1,
    title: "부활절 감사예배 안내",
    date: "2024.03.24",
    content: "오는 3월 31일 주일은 부활절 감사예배로 드립니다. 예배 시간은 평소와 같이 11시이며, 예배 후 친교실에서 점심 식사가 준비되어 있습니다. 부활의 기쁨을 함께 나누는 시간이 되길 바랍니다. 성도님들의 많은 참여 부탁드립니다.",
    department: "예배부"
  },
  {
    id: 2,
    title: "사순절 두 번째 주일",
    date: "2024.03.17",
    content: "오늘은 사순절 두 번째 주일입니다. 사순절은 부활절을 준비하는 40일의 기간으로, 예수님의 십자가 고난과 부활을 묵상하며 영적으로 준비하는 시간입니다. 이 기간 동안 개인 경건 생활과 기도에 더욱 힘쓰시기 바랍니다. 교회에서는 매일 새벽기도회를 통해 함께 기도하고 있으니 많은 참여 바랍니다.",
    department: "예배부"
  },
  {
    id: 3,
    title: "재직회 부서 정기 회의",
    date: "2024.03.10",
    content: "다음 주일(3월 17일) 오후 1시 30분부터 각 부서별 재직회 정기 회의가 있습니다. 예배부는 본당, 교육부는 교육관 2층, 봉사부는 친교실, 선교부는 회의실에서 모임을 가집니다. 재직 중인 모든 성도님들은 반드시 참석해 주시기 바랍니다. 회의 안건이 있으신 분들은 각 부서장에게 미리 알려주시기 바랍니다.",
    department: "총무부"
  },
  {
    id: 4,
    title: "3월 공동 의회 주제",
    date: "2024.03.03",
    content: "3월 17일 오후 3시에 있을 공동 의회의 주요 안건은 다음과 같습니다: 1) 교회 리모델링 계획 논의, 2) 상반기 예산 집행 중간 보고, 3) 여름 단기 선교 계획 논의. 모든 성도님들의 적극적인 참여와 의견 개진을 부탁드립니다. 공동 의회는 본당에서 진행되며, 회의 자료는 당일 배부됩니다.",
    department: "당회"
  },
  {
    id: 5,
    title: "교회학교 교사 모집",
    date: "2024.02.25",
    content: "교회학교에서 어린이부, 청소년부 교사를 모집합니다. 다음 세대를 위해 헌신하실 분들의 많은 지원 바랍니다. 지원 자격은 세례교인으로 본 교회 등록 후 1년 이상 되신 분들이며, 매주 토요일 교사 기도회와 교육에 참여 가능하셔야 합니다. 지원을 원하시는 분들은 교육부 박민수 집사님께 문의해 주세요.",
    department: "교육부"
  }
];

export const NoticeSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    noticeInstanceReady = true;
    noticeInstanceShowFn = () => {
      setIsFullScreen(true);
    };

    const handleOpenNotice = () => {
      if (localStorage.getItem('noticeEventQueued') === 'true') {
        localStorage.removeItem('noticeEventQueued');
        localStorage.removeItem('noticeQueuedTime');
        setTimeout(() => setIsFullScreen(true), 100);
      }
    };

    document.addEventListener('openNoticeFullScreen', handleOpenNotice);

    return () => {
      noticeInstanceReady = false;
      noticeInstanceShowFn = null;
      document.removeEventListener('openNoticeFullScreen', handleOpenNotice);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? noticeData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === noticeData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsFullScreen(true);
  };

  const variants = {
    enter: { y: 50, opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className="w-full mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold dark:text-white">교회 소식</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-full bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 transition-colors"
            >
              <IoIosArrowBack className="dark:text-white" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-full bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 transition-colors"
            >
              <IoIosArrowForward className="dark:text-white" />
            </button>
          </div>
        </div>
        <div className="relative h-48 md:h-64 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              className="absolute w-full h-full cursor-pointer"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                y: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.1}
              onDragEnd={(e, { offset }) => {
                if (offset.y > 100) handlePrev();
                else if (offset.y < -100) handleNext();
              }}
              onClick={() => handleNoticeClick(noticeData[currentIndex])}
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {noticeData[currentIndex].department}
                  </p>
                  <h3 className="text-md md:text-lg font-semibold mb-2 dark:text-white truncate">
                    {noticeData[currentIndex].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {noticeData[currentIndex].content}
                  </p>
                </div>
                <p className="text-xs text-right text-gray-400 dark:text-gray-500">
                  {noticeData[currentIndex].date}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isFullScreen && selectedNotice && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-neutral-800 rounded-2xl w-11/12 max-w-2xl max-h-[80vh] overflow-y-auto p-6 md:p-8 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {selectedNotice.department}
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold dark:text-white">
                    {selectedNotice.title}
                  </h2>
                </div>
                <button
                  onClick={() => setIsFullScreen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600 dark:text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {selectedNotice.date}
              </p>
              <div className="prose dark:prose-invert max-w-none text-base text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                {selectedNotice.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NoticeSection;