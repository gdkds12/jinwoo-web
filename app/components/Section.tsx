// app/components/Section.tsx
"use client";
import React from "react";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import Image from 'next/image';
import { motion, useScroll, useTransform } from "framer-motion";

export const Section = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <motion.div
      style={{ scale, y }}
      className="flex w-full items-center justify-center pt-0 min-h-screen" // px-4 제거
    >
      {/* 카드 컨테이너 - max-w-[1500px] 제거 또는 max-w-full, max-w-screen-2xl 등으로 변경 */}
      <div className="relative w-full bg-white shadow-xl overflow-hidden">
        {/* 이미지 컨테이너 */}
        <div className="relative w-full aspect-[19/9]">
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

        {/* 텍스트 및 버튼 컨테이너 */}
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
      </div>
    </motion.div>
  );
};