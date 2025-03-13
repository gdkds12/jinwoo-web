"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";

export const Section = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // 모바일 여부 상태 추가


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.65]);

  // Border radius transformation
  const borderRadius = useTransform(scrollYProgress, [0, 0.3], [0, 50]); // Adjust the end value (50) as needed


  useEffect(() => {
    const handleResize = () => {
      if (cardRef.current) {
        setCardHeight(cardRef.current.offsetHeight);
        const imageContainer = cardRef.current.querySelector('.image-container');
        if (imageContainer) {
          setImageHeight(imageContainer.clientHeight);
        }
      }
      setIsMobile(window.innerWidth < 768); // 768px 미만이면 모바일로 간주
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const paddingTop = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, cardHeight * 0.35]
  );


  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        setIsSticky(containerRect.top <= 0 && containerRect.bottom >= imageHeight * 0.65);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [imageHeight]);



  return (
    <div
      ref={containerRef}
      className="flex w-full items-center justify-center relative"
    >
      <motion.div
        ref={cardRef}
        style={{
          transformOrigin: "top center",
          scale: isMobile ? 1 : scale, // 모바일에서는 스케일 1 (축소 없음)
          position: isSticky ? "sticky" : "relative",
          top: isSticky ? 0 : "auto",
          zIndex: isSticky ? 10 : 1,
          paddingTop: isMobile ? 0 : paddingTop, // 모바일에서는 paddingTop 제거 (선택 사항)
          borderRadius: isMobile ? 0 : `${borderRadius.get()}px`, // 모바일에서는 borderRadius 0
        }}
        className="relative w-full bg-white shadow-xl overflow-hidden"
      >
        <div className="relative w-full aspect-[3/4] md:aspect-[20/9] image-container">
          {/* 모바일: 3:5, 데스크톱: 20:9 */}
          <Image
            src="/images/main-home.jpg"
            alt="Main Image"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 95vw"
            priority
            quality={90}
          />
        </div>

        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <div className="w-full px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8
                        md:absolute md:top-[25%] md:left-[5%] md:w-auto">

            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-semibold md:font-semibold leading-tight tracking-[-0.32px]
                           absolute bottom-[20%] w-full md:relative md:bottom-auto md:ml-4">
              진우교회에 오신<br />
              여러분을 환영합니다.
            </h1>

            <Link
              href="/worship-info"
              className="hidden md:inline-flex items-center px-8 py-4 bg-white text-[#333333] text-lg font-medium tracking-[-0.32px] rounded-md
                         hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 md:mt-8 md:ml-4"
            >
              <span className="mr-2">예배 안내</span>
              <IoArrowForward className="text-2xl" />
            </Link>
          </div>
        </div>
      </motion.div>
      {!isSticky && !isMobile && ( // 모바일이 아닐때만 paddingTop div 추가.
        <motion.div style={{ height: paddingTop }}></motion.div>
      )}
    </div>
  );
};