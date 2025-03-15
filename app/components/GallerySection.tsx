// app/components/GallerySection.tsx
"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { IoChevronForward, IoArrowForward } from "react-icons/io5";
import { motion } from "framer-motion";

// 갤러리 더미 데이터
const galleryItems = [
  {
    id: 1,
    title: "오직 믿음으로",
    link: "/gallery/1",
    color: "bg-gray-200"
  },
  {
    id: 2,
    title: "하나님을 만나다",
    link: "/gallery/2",
    color: "bg-gray-300"
  },
  {
    id: 3,
    title: "가을 수련회",
    link: "/gallery/3",
    color: "bg-gray-200"
  },
  {
    id: 4,
    title: "2023 크리스마스",
    link: "/gallery/4",
    color: "bg-gray-300"
  },
  {
    id: 5,
    title: "청년부 캠프",
    link: "/gallery/5",
    color: "bg-gray-200"
  },
  {
    id: 6,
    title: "전교인 체육대회",
    link: "/gallery/6",
    color: "bg-gray-300"
  },
];

const GallerySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 애니메이션 변수 - 성능 최적화를 위해 간소화
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  };

  const galleryCardVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: 0.05 * i,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    if (scrollRef.current) {
      setScrollLeft(scrollRef.current.scrollLeft)
      scrollRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;

    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // 부드러운 스크롤 함수
  const smoothScroll = (targetPosition: number) => {
    if (!scrollRef.current) return;
    
    const startPosition = scrollRef.current.scrollLeft;
    const distance = targetPosition - startPosition;
    const duration = 500; 
    let startTime: number | null = null;
    
    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = startPosition + distance * ease;
      }
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  };
  
  // 이징 함수
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  // 갤러리 카드 렌더링 함수 - 더미 박스 버전
  const renderGalleryCard = (item: typeof galleryItems[0], index: number) => (
    <motion.div
      key={item.id}
      className={`relative flex-shrink-0 w-[82vw] h-[53vw] md:w-[300px] md:h-[200px] lg:w-[350px] lg:h-[233px] overflow-hidden rounded-xl ${item.color} shadow-md`}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      variants={galleryCardVariants}
      custom={index}
    >
      <Link href={item.link}>
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              hoveredIndex === index ? "opacity-40" : "opacity-0"
            }`}
          />
          <div className="relative z-10 text-center p-4">
            <p className={`font-bold text-xl tracking-[-0.32px] ${hoveredIndex === index ? 'text-white' : 'text-gray-700'}`}>
              {item.title}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <div className="flex flex-col w-full items-center py-[100px] px-4 md:px-10 lg:px-60 relative">
      <div className="max-w-[1440px] w-full">
        <motion.div 
          className="flex flex-col w-full items-center mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={titleVariants}
        >
          <p className="w-fit text-transparent text-[40px] md:text-[55px] text-center leading-[60px] md:leading-[82.5px] whitespace-nowrap tracking-[-0.32px]">
            <span className="font-extralight text-[#333333] tracking-[-0.18px]">
              진우{" "}
            </span>
            <span className="font-bold text-[#333333] tracking-[-0.18px]">
              갤러리
            </span>
          </p>
        </motion.div>

        <div className="relative w-full">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-1 focus:outline-none"
            onClick={() => {
              if (scrollRef.current) {
                smoothScroll(scrollRef.current.scrollLeft - 300);
              }
            }}
            aria-label="이전"
          >
            <IoChevronForward
              className="text-4xl text-gray-800 rotate-180"
            />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-1 focus:outline-none"
            onClick={() => {
              if (scrollRef.current) {
                smoothScroll(scrollRef.current.scrollLeft + 300);
              }
            }}
            aria-label="다음"
          >
            <IoChevronForward className="text-4xl text-gray-800" />
          </button>

          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto hide-scrollbar py-2"
            style={{ cursor: "grab" }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <motion.div 
              className="flex gap-5 pl-1 pr-12" 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {galleryItems.map((item, index) => renderGalleryCard(item, index))}
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end mt-8">
          <Link href="/gallery">
            <motion.div 
              className="flex items-center gap-2 text-[#333333] hover:text-black"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-base font-medium tracking-[-0.32px]">
                더 보기
              </p>
              <IoArrowForward className="text-xl" />
            </motion.div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default GallerySection;