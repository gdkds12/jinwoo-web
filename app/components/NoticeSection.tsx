"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowForward, IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion, AnimatePresence, usePresence, useInView } from "framer-motion";

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
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [expandedNotices, setExpandedNotices] = useState<number[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentHeights = useRef<Record<number, number>>({});
  
  // 인뷰 상태 확인
  const isTitleInView = useInView(titleRef, { once: true });
  
  // 각 카드의 참조 생성
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const cardRef3 = useRef<HTMLDivElement>(null);
  
  const isCard1InView = useInView(cardRef1, { once: true });
  const isCard2InView = useInView(cardRef2, { once: true });
  const isCard3InView = useInView(cardRef3, { once: true });
  
  // 컴포넌트 초기화 - 즉시 실행되도록 수정
  useEffect(() => {
    console.log('NoticeSection 컴포넌트 마운트됨');
    
    // 전역 인스턴스 설정
    noticeInstanceReady = true;
    noticeInstanceShowFn = () => {
      setScrollPosition(window.scrollY);
      setShowFullScreen(true);
    };

    // localStorage에 저장된 이벤트가 있다면 실행
    if (typeof window !== 'undefined') {
      const queuedEvent = localStorage.getItem('noticeEventQueued');
      if (queuedEvent === 'true') {
        console.log('마운트 시 큐에 저장된 이벤트 실행');
        localStorage.removeItem('noticeEventQueued');
        setScrollPosition(window.scrollY);
        setShowFullScreen(true);
      }
    }
    
    return () => {
      console.log('NoticeSection 컴포넌트 언마운트됨');
      noticeInstanceReady = false;
      noticeInstanceShowFn = null;
    };
  }, []); // 의존성 배열을 비워서 컴포넌트 마운트 시 한 번만 실행되도록 함
  
  // 이벤트 리스너 등록
  useEffect(() => {
    const handleOpenFullScreen = () => {
      console.log('openNoticeFullScreen 이벤트 감지됨');
      setScrollPosition(window.scrollY);
      setShowFullScreen(true);
      
      // 이벤트 처리 후 localStorage 제거
      if (typeof window !== 'undefined') {
        localStorage.removeItem('noticeEventQueued');
        localStorage.removeItem('noticeQueuedTime');
      }
    };
    
    console.log('이벤트 리스너 등록됨');
    document.addEventListener('openNoticeFullScreen', handleOpenFullScreen);
    
    return () => {
      console.log('이벤트 리스너 제거됨');
      document.removeEventListener('openNoticeFullScreen', handleOpenFullScreen);
    };
  }, []); // 의존성 배열을 비워서 컴포넌트 마운트 시 한 번만 실행되도록 함
  
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
    console.log('스크롤 제어 useEffect 실행됨, showFullScreen:', showFullScreen);
    
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
  }, [showFullScreen, scrollPosition]);
  
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
      if (!isPresent) {
        setTimeout(safeToRemove, 300);
      }
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
        className="overflow-hidden border-t mt-3 pt-3 border-gray-200 dark:border-gray-600"
      >
        <div ref={contentRef} className="content-inner pb-2">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
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
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      ref={containerRef}
    >
      {/* 제목 섹션 */}
      <motion.div 
        className="flex items-center justify-between px-4 mb-4"
        onClick={toggleFullScreen}
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold cursor-pointer dark:text-white">공지사항</h2>
        <IoIosArrowForward className="text-xl cursor-pointer dark:text-white" />
      </motion.div>

      {/* 카드 섹션 - 메인 페이지 */}
      <div className="space-y-2 px-3 md:px-4 mb-4">
        <motion.div 
          className="w-full aspect-[5/0.85] md:aspect-[5/0.6] bg-white dark:bg-dark-700 rounded-xl p-4 flex flex-col justify-between cursor-pointer"
          ref={cardRef1}
          initial={{ opacity: 0, y: 20 }}
          animate={isCard1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          onClick={toggleFullScreen}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="text-base md:text-lg font-medium dark:text-white">{noticeData[0].title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{noticeData[0].date}</span>
            <span className="text-xs md:text-sm text-blue-500">{noticeData[0].department}</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full aspect-[5/0.85] md:aspect-[5/0.6] bg-white dark:bg-dark-700 rounded-xl p-4 flex flex-col justify-between cursor-pointer"
          ref={cardRef2}
          initial={{ opacity: 0, y: 20 }}
          animate={isCard2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={toggleFullScreen}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="text-base md:text-lg font-medium dark:text-white">{noticeData[1].title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{noticeData[1].date}</span>
            <span className="text-xs md:text-sm text-blue-500">{noticeData[1].department}</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full aspect-[5/0.85] md:aspect-[5/0.6] bg-white dark:bg-dark-700 rounded-xl p-4 flex flex-col justify-between cursor-pointer"
          ref={cardRef3}
          initial={{ opacity: 0, y: 20 }}
          animate={isCard3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={toggleFullScreen}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h3 className="text-base md:text-lg font-medium dark:text-white">{noticeData[2].title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{noticeData[2].date}</span>
            <span className="text-xs md:text-sm text-blue-500">{noticeData[2].department}</span>
          </div>
        </motion.div>
      </div>
      
      {/* 전체 화면 모드 */}
      <AnimatePresence>
        {showFullScreen && (
          <motion.div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-white dark:bg-dark flex justify-center"
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
            <div className="w-full max-w-[550px] md:max-w-[720px] h-screen flex flex-col overflow-y-auto">
              {/* 헤더 */}
              <motion.div 
                variants={cardVariants}
                className="p-4 sticky top-0 bg-white dark:bg-dark z-10"
              >
                <div className="flex items-center justify-center">
                  <button onClick={toggleFullScreen} className="absolute left-2 p-2">
                    <IoIosArrowBack className="text-2xl dark:text-white" />
                  </button>
                  <h1 className="text-xl font-semibold dark:text-white">공지사항</h1>
                </div>
              </motion.div>
              
              {/* 공지사항 목록 */}
              <div className="flex-1 p-4 pb-24">
                {noticeData.map((notice) => (
                  <motion.div
                    key={notice.id}
                    className="mb-4 overflow-hidden"
                    variants={cardVariants}
                  >
                    <div 
                      className="w-full bg-white dark:bg-dark-700 rounded-xl p-4 cursor-pointer"
                      onClick={(e) => toggleNoticeExpand(notice.id, e)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-base font-semibold mb-1 dark:text-white">{notice.title}</h3>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500 dark:text-gray-300">{notice.date}</span>
                            <span className="text-blue-500">{notice.department}</span>
                          </div>
                        </div>
                        <button 
                          className="p-2 text-gray-500 dark:text-gray-300"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NoticeSection; 