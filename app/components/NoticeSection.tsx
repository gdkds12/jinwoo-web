"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowForward, IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion, AnimatePresence, usePresence } from "framer-motion";

// 공지사항 인터페이스
interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
  department: string;
}

// 전역 상태 관리를 위한 이벤트 관리
export const openNoticeFullScreen = () => {
  const event = new CustomEvent('openNoticeFullScreen');
  document.dispatchEvent(event);
};

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
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [expandedNotices, setExpandedNotices] = useState<number[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentHeights = useRef<Record<number, number>>({});
  
  // 컴포넌트 초기화 확인
  useEffect(() => {
    setIsInitialized(true);
  }, []);
  
  // 이벤트 리스너 등록
  useEffect(() => {
    const handleOpenFullScreen = () => {
      if (!showFullScreen) {
        setScrollPosition(window.scrollY);
        setShowFullScreen(true);
      }
    };
    
    document.addEventListener('openNoticeFullScreen', handleOpenFullScreen);
    return () => {
      document.removeEventListener('openNoticeFullScreen', handleOpenFullScreen);
    };
  }, [showFullScreen]);
  
  // 전체 화면 모드 토글
  const toggleFullScreen = () => {
    if (!showFullScreen) {
      setScrollPosition(window.scrollY);
    }
    setShowFullScreen(!showFullScreen);
  };
  
  // 공지사항 확장 토글 (개선된 버전)
  const toggleNoticeExpand = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    
    // 이미 열려있는 공지가 있으면 닫고, 새 공지 열기
    if (expandedNotices.includes(id)) {
      // 이미 열려있는 공지를 닫는 경우
      setExpandedNotices(prev => prev.filter(noticeId => noticeId !== id));
    } else {
      // 새 공지를 여는 경우
      setExpandedNotices([id]); // 하나의 공지만 열도록 변경
    }
  };
  
  // 스크롤 제어
  useEffect(() => {
    if (!isInitialized) return;
    
    if (showFullScreen) {
      // 전체 화면 모드일 때 스크롤 방지 및 위치 저장
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
    } else {
      // 일반 모드일 때 스크롤 허용 및 위치 복원
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      if (showFullScreen) {
        window.scrollTo(0, scrollPosition);
      }
    };
  }, [showFullScreen, scrollPosition, isInitialized]);
  
  // 컨테이너 애니메이션
  const containerVariants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0,
      transition: {
        type: "tween",
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: { x: "100%" }
  };
  
  // 카드 애니메이션
  const cardVariants = {
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
  
  // ExpandableContent 컴포넌트 - 부드러운 확장 애니메이션을 위한 별도 컴포넌트
  const ExpandableContent = ({ notice }: { notice: Notice }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isPresent, safeToRemove] = usePresence();
    const [height, setHeight] = useState(0);
    
    useEffect(() => {
      if (contentRef.current) {
        // 실제 높이보다 약간 더 큰 값 설정 (마지막 줄이 잘리지 않도록)
        const measuredHeight = contentRef.current.offsetHeight;
        const newHeight = measuredHeight + 10; // 10px 추가 여백
        setHeight(newHeight);
        contentHeights.current[notice.id] = newHeight;
      }
    }, [notice.id]);
    
    useEffect(() => {
      !isPresent && setTimeout(safeToRemove, 300);
    }, [isPresent, safeToRemove]);

    return (
      <motion.div
        initial={{ height: 0, opacity: 0, marginTop: 0, paddingTop: 0, borderTopWidth: 0 }}
        animate={{ 
          height: height, 
          opacity: 1, 
          marginTop: 12, 
          paddingTop: 12, 
          borderTopWidth: 1,
          transition: { height: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }
        }}
        exit={{ 
          height: 0, 
          opacity: 0, 
          marginTop: 0, 
          paddingTop: 0, 
          borderTopWidth: 0,
          transition: { height: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } }
        }}
        className="overflow-hidden border-t mt-3 pt-3"
      >
        <div ref={contentRef} className="content-inner pb-2">
          <p className="text-sm text-gray-600 leading-relaxed">
            {notice.content}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div 
      id="notice-section"
      className="w-full mt-4 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      ref={containerRef}
    >
      {/* 제목 섹션 */}
      <div 
        className="flex items-center justify-between px-4 mb-4"
        onClick={toggleFullScreen}
      >
        <h2 className="text-2xl font-semibold cursor-pointer">공지사항</h2>
        <IoIosArrowForward className="text-xl cursor-pointer" />
      </div>

      {/* 카드 섹션 - 메인 페이지 */}
      <div className="flex flex-col gap-3 px-4">
        {noticeData.slice(0, 3).map((notice, index) => (
          <motion.div 
            key={notice.id}
            className="w-full aspect-[5/1] bg-white rounded-xl p-3 flex flex-col justify-between cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={toggleFullScreen}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="text-sm font-medium">{notice.title}</h3>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{notice.date}</span>
              <span className="text-xs text-blue-500">{notice.department}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* 전체 화면 모드 */}
      <AnimatePresence>
        {showFullScreen && (
          <motion.div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-white flex flex-col w-screen h-screen overflow-y-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ 
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y'
            }}
          >
            {/* 헤더 */}
            <motion.div 
              variants={cardVariants}
              className="p-4 sticky top-0 bg-white z-10"
            >
              <div className="flex items-center justify-center">
                <button onClick={toggleFullScreen} className="absolute left-2 p-2">
                  <IoIosArrowBack className="text-2xl" />
                </button>
                <h1 className="text-xl font-semibold">공지사항</h1>
              </div>
            </motion.div>
            
            {/* 공지사항 목록 */}
            <div className="flex-1 p-4 pb-24">
              {noticeData.map((notice, index) => (
                <motion.div
                  key={notice.id}
                  className="mb-4 overflow-hidden"
                  variants={cardVariants}
                >
                  <div 
                    className="w-full bg-white rounded-xl p-4 cursor-pointer"
                    onClick={(e) => toggleNoticeExpand(notice.id, e)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold mb-1">{notice.title}</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-500">{notice.date}</span>
                          <span className="text-blue-500">{notice.department}</span>
                        </div>
                      </div>
                      <button 
                        className="p-2 text-gray-500"
                        onClick={(e) => toggleNoticeExpand(notice.id, e)}
                      >
                        {expandedNotices.includes(notice.id) 
                          ? <IoIosArrowUp className="text-xl" /> 
                          : <IoIosArrowDown className="text-xl" />
                        }
                      </button>
                    </div>
                    
                    {/* 확장된 내용 */}
                    <AnimatePresence>
                      {expandedNotices.includes(notice.id) && (
                        <ExpandableContent notice={notice} key={`content-${notice.id}`} />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NoticeSection; 