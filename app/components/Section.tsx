"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { IoArrowForward, IoChevronDown } from "react-icons/io5";
import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";

export const Section = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [initialCardTop, setInitialCardTop] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [containerHeight, setContainerHeight] = useState("100vh");

  // 스크롤 관련 설정 - 성능 최적화를 위한 옵션 추가
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    // @ts-expect-error - framer-motion의 타입 정의에 enabled가 없지만 실제로는 지원됨
    enabled: !isMobile && isInitialized,
    // 스크롤 이벤트 최적화 옵션 추가
    smooth: 0.1,
  });

  // 스케일 변환 최적화 - 키프레임 개수 축소
  const scale = useTransform(scrollYProgress, 
    [0, 0.3, 0.6], 
    [1, 0.8, 0.6]
  );

  // 경계 반경 변환 최적화
  const borderRadius = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.6], 
    [0, 30, 30]
  );

  // paddingTopValue 계산 최적화 - 불필요한 계산 제거
  const paddingTopValue = useTransform(scale, (currentScale) => {
    if (isMobile || initialCardTop === null) return 0;
    
    const heightDifference = cardHeight * (1 - currentScale);
    let padding = heightDifference * 4;
    
    const threshold = 0.8;
    
    if (currentScale <= threshold) {
      const transitionFactor = (threshold - currentScale) / (threshold - 0.6);
      const additionalPadding = 800 * transitionFactor;
      padding += additionalPadding;
    }
    
    return padding;
  });

  // 윈도우 리사이즈 핸들러 최적화 - useCallback 적용
  const handleResize = useCallback(() => {
    if (cardRef.current) {
      const cardElement = cardRef.current;
      setCardHeight(cardElement.offsetHeight);
      
      const imageContainer = cardElement.querySelector('.image-container');
      if (imageContainer) {
        setImageHeight(imageContainer.clientHeight);
      }
      
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setInitialCardTop(rect.top + window.scrollY);
      }
    }
    
    // 모바일 여부 판단 - 1번만 계산
    const newIsMobile = window.innerWidth < 1024;
    setIsMobile(newIsMobile);
    
    // 레이아웃 설정 통합
    if (newIsMobile) {
      setContainerHeight("100vh");
      
      // 모바일에서 기본 스크롤 허용
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    } else {
      setContainerHeight("100vh");
    }
  }, []);

  // 스크롤 핸들러 최적화 - useCallback 적용
  const handleScroll = useCallback(() => {
    if (isMobile || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const currentScale = scale.get();
    const newIsSticky = containerRect.top <= 0 && containerRect.bottom >= imageHeight * currentScale;
    
    // 상태 변경이 필요할 때만 업데이트
    if (isSticky !== newIsSticky) {
      setIsSticky(newIsSticky);
    }
  }, [isMobile, scale, imageHeight, isSticky]);

  useEffect(() => {
    // 페이지 로드 시 스크롤 위치를 최상단으로 강제 설정
    window.scrollTo(0, 0);
    
    // 모바일 환경인 경우 추가 설정
    if (window.innerWidth < 1024) {
      // 모바일에서 기본 스크롤 허용
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      
      // 100ms 후에 스크롤 위치 최상단으로 다시 설정
      setTimeout(() => {
        window.scrollTo({top: 0, behavior: 'auto'});
      }, 100);
    }
    
    // 초기화 플래그 설정 - 컴포넌트가 마운트된 후에만 애니메이션 계산 활성화
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    handleResize();
    
    // 즉시 한 번 더 실행하되, 레이아웃 계산에 필요한 최소 시간 부여
    const resizeTimer = setTimeout(handleResize, 50);

    // 리사이즈 이벤트 리스너에 쓰로틀링 적용
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    const throttledResize = () => {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          handleResize();
        }, 100);
      }
    };

    window.addEventListener('resize', throttledResize);
    return () => {
      window.removeEventListener('resize', throttledResize);
      clearTimeout(resizeTimer);
    };
  }, [handleResize]);

  useEffect(() => {
    if (isMobile) return;
    
    if (containerRef.current && initialCardTop === null) {
      const rect = containerRef.current.getBoundingClientRect();
      setInitialCardTop(rect.top + window.scrollY);
    }
    
    // 스크롤 이벤트 리스너에 쓰로틀링 적용
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          scrollTimeout = null;
          handleScroll();
        }, 16); // 약 60fps에 맞춤
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll, imageHeight, initialCardTop, isMobile]);

  const scrollToMenu = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      ref={containerRef}
      className="flex w-full items-center justify-center relative"
      style={{ 
        height: isMobile ? '100vh' : containerHeight,
        minHeight: '100vh',
        marginTop: '0', // 헤더 바로 아래에서 시작하도록 변경
      }}
    >
      <motion.div
        ref={cardRef}
        style={{
          transformOrigin: "top center",
          scale: isMobile ? 1 : scale,
          position: isMobile ? "relative" : (isSticky ? "fixed" : "relative"),
          top: isMobile ? "auto" : (isSticky ? 0 : "auto"),
          zIndex: isMobile ? 1 : (isSticky ? 10 : 1),
          paddingTop: isMobile ? 0 : paddingTopValue,
          // 하드웨어 가속 활성화로 애니메이션 성능 향상
          willChange: "transform, padding-top",
          marginTop: '0', // 상단 여백 제거
        }}
        className="relative w-full bg-white overflow-hidden"
      >
        <motion.div 
          className={`relative w-full ${isMobile ? 'h-screen' : 'aspect-[20/9]'} image-container overflow-hidden`}
          style={{
            height: isMobile ? '100vh' : '100%',
            borderRadius: isMobile ? 0 : borderRadius,
            // 하드웨어 가속 활성화로 애니메이션 성능 향상
            willChange: "border-radius",
            marginTop: '0', // 상단 여백 제거
          }}
        >
          <Image
            src="/images/main-home.jpg"
            alt="Main Image"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            quality={80}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 md:flex md:justify-start md:items-start">
            <div className="welcome-message absolute left-0 right-0 top-[20%] md:static md:w-full px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 md:mt-[10%]">
              <div className="md:ml-[15%] lg:ml-[20%]">
                <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold md:font-bold leading-tight tracking-[-0.32px]">
                  진우교회에 오신<br />
                  여러분을 환영합니다.
                </h1>

                <Link
                  href="/worship-info"
                  className="hidden md:inline-flex items-center px-8 py-4 bg-white text-[#333333] text-lg font-medium tracking-[-0.32px] rounded-md hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-8"
                >
                  <span className="mr-2">예배 안내</span>
                  <IoArrowForward className="text-2xl" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* 스크롤 유도 화살표 - 스크롤을 유도하는 역할 강화 */}
          <div className="scroll-arrow absolute bottom-28 left-1/2 transform -translate-x-1/2 text-white hidden md:hidden z-10">
            <motion.div
              animate={{
                y: [0, 10, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
              whileTap={{ scale: 1.2 }}
              onClick={scrollToMenu}
            >
              <IoChevronDown className="text-4xl" />
            </motion.div>
          </div>
          
          {/* 화면 크기별 환영 메시지 위치 조정을 위한 스타일 */}
          <style jsx>{`
            @media (max-width: 767px) {
              :global(.scroll-arrow) {
                display: block;
              }
            }
          `}</style>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};