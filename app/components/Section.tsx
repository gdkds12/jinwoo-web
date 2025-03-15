"use client";
import React, { useState, useRef, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(true); // 기본값을 모바일로 설정하여 초기 로딩에 최적화
  const [initialCardTop, setInitialCardTop] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [paddingTop, setPaddingTop] = useState("0px");
  const [containerHeight, setContainerHeight] = useState("100vh");

  // 스크롤 관련 설정
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    // @ts-expect-error - framer-motion의 타입 정의에 enabled가 없지만 실제로는 지원됨
    enabled: !isMobile && isInitialized
  });

  const scale = useTransform(scrollYProgress, 
    [0, 0.16, 0.33, 0.5], 
    [1, 0.95, 0.8, 0.65]
  );

  const borderRadius = useTransform(
    scrollYProgress, 
    [0, 0.001, 0.16, 0.33, 0.5], 
    [0, 50, 50, 50, 50]
  );

  const paddingTopValue = useTransform(scale, (currentScale) => {
    if (isMobile || initialCardTop === null) return 0;
    
    const originalHeight = cardHeight;
    const scaledHeight = cardHeight * currentScale;
    const heightDifference = originalHeight - scaledHeight;
    
    let padding = heightDifference * 6;
    
    const minScale = 0.65;
    const threshold = 0.73;
    
    if (currentScale <= threshold) {
      const transitionFactor = (threshold - currentScale) / (threshold - minScale);
      const additionalPadding = 1280 * transitionFactor;
      padding += additionalPadding;
    }
    
    return padding;
  });

  const containerHeightValue = useTransform(scale, (currentScale) => {
    if (isMobile) return '100vh';
    return `${cardHeight * currentScale}px`;
  });

  useEffect(() => {
    // 초기화 플래그 설정 - 컴포넌트가 마운트된 후에만 애니메이션 계산 활성화
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (cardRef.current) {
        setCardHeight(cardRef.current.offsetHeight);
        const imageContainer = cardRef.current.querySelector('.image-container');
        if (imageContainer) {
          setImageHeight(imageContainer.clientHeight);
        }
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setInitialCardTop(rect.top + window.scrollY);
        }
      }
      
      // PC 해상도 기준을 1024px로 설정 (lg 브레이크포인트)
      const newIsMobile = window.innerWidth < 1024;
      setIsMobile(newIsMobile);
      
      // 모바일 모드에서는 스크롤을 허용하도록 처리
      if (newIsMobile) {
        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
      }
      
      // 브라우저 크기에 따라 모바일 여부 결정
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // 모바일/데스크탑에 따른 레이아웃 조정
      if (mobile) {
        setPaddingTop("0px");
        setContainerHeight("100vh");
      } else {
        setPaddingTop("0px");
        setContainerHeight("100vh");
      }
    };

    handleResize();
    
    // 즉시 한 번 더 실행하여 값을 확실히 설정
    setTimeout(handleResize, 0);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    if (containerRef.current && initialCardTop === null) {
      const rect = containerRef.current.getBoundingClientRect();
      setInitialCardTop(rect.top + window.scrollY);
    }
    
    const handleScroll = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        setIsSticky(containerRect.top <= 0 && containerRect.bottom >= imageHeight * scale.get());
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [imageHeight, initialCardTop, cardHeight, scale, isMobile]);

  const scrollToMenu = () => {
    // 스크롤 화살표를 탭하면 메뉴 섹션으로 스크롤
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
        minHeight: '100vh', // 최소 높이 설정으로 스크롤 가능하게 함
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
        }}
        className="relative w-full bg-white overflow-hidden"
      >
        <motion.div 
          className={`relative w-full ${isMobile ? 'h-screen' : 'aspect-[20/9]'} image-container overflow-hidden`}
          style={{
            height: isMobile ? '100vh' : '100%', // 모바일에서는 뷰포트 높이로 설정
            borderRadius: isMobile ? 0 : borderRadius // 이미지 컨테이너에도 borderRadius 적용
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
              onClick={() => {
                // 스크롤 화살표를 탭하면 메뉴 섹션으로 스크롤
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: 'smooth'
                });
              }}
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