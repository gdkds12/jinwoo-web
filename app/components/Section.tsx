"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

export const Section = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [initialCardTop, setInitialCardTop] = useState<number | null>(null);
  const paddingMultiplier = useMotionValue(2);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.65]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.001, 0.3], [0, 50, 50]);

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
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
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
  }, [imageHeight, initialCardTop, cardHeight]);

  const clampedScale = useMemo(() => {
    return Math.max(0.65, scale.get());
  }, [scale]);

  const paddingTop = useTransform(scale, (currentScale) => {
    if (isMobile || initialCardTop === null) return 0;
    const scaledHeight = cardHeight * currentScale;
    const unscaledTop = initialCardTop - window.scrollY;
    const scaledTop = unscaledTop;
    let calculatedPadding = (cardHeight - scaledHeight) * paddingMultiplier.get();
    return Math.max(0, calculatedPadding);
  });


  return (
    <div
      ref={containerRef}
      className="flex w-full items-center justify-center relative"
    >
      <motion.div
        ref={cardRef}
        style={{
          transformOrigin: "top center",
          scale: isMobile ? 1 : scale,
          position: isSticky ? "sticky" : "relative",
          top: isSticky ? 0 : "auto",
          zIndex: isSticky ? 10 : 1,
          paddingTop: isMobile ? 0 : paddingTop,
        }}
        className="relative w-full bg-white overflow-hidden"
      >
        <div className="relative w-full aspect-[3/4] md:aspect-[20/9] image-container">
          <Image
            src="/images/main-home.jpg"
            alt="Main Image"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 95vw"
            priority
            quality={90}
            style={{
                borderRadius: isMobile ? 0 : `${borderRadius.get()}px`,
            }}
          />
        </div>

        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <div className="w-full px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 md:absolute md:top-[25%] md:left-[5%] md:w-auto">
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-semibold md:font-semibold leading-tight tracking-[-0.32px] absolute bottom-[20%] w-full md:relative md:bottom-auto md:ml-4">
              진우교회에 오신<br />
              여러분을 환영합니다.
            </h1>

            <Link
              href="/worship-info"
              className="hidden md:inline-flex items-center px-8 py-4 bg-white text-[#333333] text-lg font-medium tracking-[-0.32px] rounded-md hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 md:mt-8 md:ml-4"
            >
              <span className="mr-2">예배 안내</span>
              <IoArrowForward className="text-2xl" />
            </Link>
          </div>
        </div>
      </motion.div>
      {!isSticky && !isMobile && (
        <motion.div style={{ height: paddingTop }}></motion.div>
      )}

      {!isMobile && (
        <div className="fixed bottom-10 right-10 bg-white p-4 rounded-md shadow-md">
          <label htmlFor="paddingMultiplier" className="mr-2">패딩 배율:</label>
          <input
            type="range"
            id="paddingMultiplier"
            min="1"
            max="5"
            step="0.1"
            defaultValue={1}
            onInput={(e) => paddingMultiplier.set(parseFloat(e.currentTarget.value))}
            className="w-32"
          />
          <span className="ml-2">{paddingMultiplier.get()}</span>
        </div>
      )}
    </div>
  );
};