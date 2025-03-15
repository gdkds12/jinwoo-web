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
  const [isMobile, setIsMobile] = useState(false);
  const [initialCardTop, setInitialCardTop] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    // @ts-expect-error - framer-motion의 타입 정의에 enabled가 없지만 실제로는 지원됨
    enabled: !isMobile
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

  const paddingTop = useTransform(scale, (currentScale) => {
    if (isMobile || initialCardTop === null) return 0;
    // 원본 높이와 축소된 높이의 차이를 직접 계산
    const originalHeight = cardHeight;
    const scaledHeight = cardHeight * currentScale;
    const heightDifference = originalHeight - scaledHeight;
    
    // 기본 패딩 계산
    let padding = heightDifference * 6;
    
    // 스케일이 최소값(0.65)에 도달했을 때 추가 패딩 적용
    const minScale = 0.65;
    const threshold = 0.73; // 부드러운 전환을 위한 임계값
    
    if (currentScale <= threshold) {
      // 임계값에서 최소 스케일까지 추가 패딩을 점진적으로 적용
      const transitionFactor = (threshold - currentScale) / (threshold - minScale);
      const additionalPadding = 1280 * transitionFactor; // 추가 패딩 1250px로 변경
      padding += additionalPadding; // 기존 패딩에 추가
    }
    
    return padding;
  });

  const containerHeight = useTransform(scale, (currentScale) => {
    if (isMobile) return '100vh'; // 모바일에서 전체 화면 높이
    return `${cardHeight * currentScale}px`;
  });

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
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();

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

  return (
    <motion.div
      ref={containerRef}
      className="flex w-full items-center justify-center relative"
      style={{ height: isMobile ? '100vh' : containerHeight }} // 모바일에서 전체 화면 높이로 설정
    >
      <motion.div
        ref={cardRef}
        style={{
          transformOrigin: "top center",
          scale: isMobile ? 1 : scale,
          position: isMobile ? "relative" : (isSticky ? "sticky" : "relative"),
          top: isMobile ? "auto" : (isSticky ? 0 : "auto"),
          zIndex: isMobile ? 1 : (isSticky ? 10 : 1),
          paddingTop: isMobile ? 0 : paddingTop,
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
            sizes="100vw" // 모바일에서 항상 전체 화면 너비 사용
            priority
            quality={100}
            placeholder="blur"
            blurDataURL="/images/main-home.jpg"
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
          
          {/* 스크롤 유도 화살표 */}
          <div className="scroll-arrow absolute bottom-28 left-1/2 transform -translate-x-1/2 text-white hidden md:hidden">
            <motion.div
              animate={{
                y: [0, 10, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
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