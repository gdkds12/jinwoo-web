// app/components/GallerySection.tsx
"use client";
import React, { useRef, useState } from "react"; // useEffect 제거
import { motion } from "framer-motion";
import { IoChevronForward } from "react-icons/io5";

interface GalleryItemProps {
  title: string;
  date: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  title,
  date,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-w-[200px] md:min-w-[264px] shrink-0 px-2 cursor-pointer"
      style={{ margin: "0" }}
      whileHover={{ scale: 1.2 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative w-full aspect-[264/338] bg-gray-200"></div>

      <div className="flex flex-col items-center pt-4 pb-6">
        <motion.div
          className="text-center text-base leading-[25px] tracking-[-0.32px] whitespace-nowrap"
          style={{
            color: isHovered ? "#a28869" : "#333333",
            transition: "color 0.3s ease",
          }}
        >
          {title}
        </motion.div>
        <motion.div
          className="text-center text-sm tracking-[-0.32px] leading-[25px] whitespace-nowrap"
          style={{
            color: isHovered ? "#a28869" : "#777777",
            transition: "color 0.3s ease",
          }}
        >
          {date}
        </motion.div>
      </div>
    </motion.div>
  );
};

const GallerySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0); // 현재 스크롤 위치 상태


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

    const smoothScroll = (scrollTarget: number) => {
    if (!scrollRef.current) return;

    const start = scrollRef.current.scrollLeft;
    const change = scrollTarget - start;
    const duration = 500; // 이동 시간 (ms)
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const easedScroll = easeInOutQuad(timeElapsed, start, change, duration); // easing 함수 적용

      if(scrollRef.current){
        scrollRef.current.scrollLeft = easedScroll;
      }

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };
    // Easing 함수 (easeInOutQuad)
    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animateScroll);

  };

  const tempGalleryItems = Array.from({ length: 10 }).map((_, index) => ({
    title: `Title ${index + 1}`,
    date: `2025.0${index + 1}.01`,
  }));

  return (
    <div className="flex flex-col w-full items-center py-[130px] px-4 md:px-10 lg:px-60 relative">
      <div className="max-w-[1440px] w-full">
        <div className="flex flex-col w-full items-center mb-8">
          <p className="w-fit text-transparent text-[40px] md:text-[55px] text-center leading-[60px] md:leading-[82.5px] whitespace-nowrap tracking-[-0.32px]">
            <span className="font-extralight text-[#333333] tracking-[-0.18px]">
              진우{" "}
            </span>
            <span className="font-bold text-[#333333] tracking-[-0.18px]">
              갤러리
            </span>
          </p>
        </div>

        <div className="relative w-full">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-1 focus:outline-none"
            onClick={() => {
            if (scrollRef.current) {
                smoothScroll(scrollRef.current.scrollLeft - 300); // 부드러운 스크롤 적용
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
                smoothScroll(scrollRef.current.scrollLeft + 300); // 부드러운 스크롤 적용
              }
            }}
            aria-label="다음"
          >
            <IoChevronForward className="text-4xl text-gray-800" />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-scroll gap-4 md:gap-6 pb-5 scrollbar-hide select-none"
            style={{ scrollbarWidth: "none", cursor: "grab" }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
          >
            {tempGalleryItems.map((item, index) => (
              <GalleryItem
                key={index}
                title={item.title}
                date={item.date}
                isHovered={hoveredIndex === index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;