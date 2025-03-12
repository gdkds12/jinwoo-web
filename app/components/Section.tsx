// app/components/Section.tsx
import React from "react";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import Image from 'next/image';

export const Section = () => {
  return (
    <div className="flex w-full items-center justify-center px-4 md:px-10 lg:px-14 py-4 md:py-6 lg:py-8 relative">
      {/* 카드 컨테이너 */}
      <div className="relative w-full max-w-[1500px] bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* 이미지 컨테이너 */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9]">
          <Image
            src="/images/main-home.jpg"
            alt="Main Image"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 95vw"
            priority
          />
        </div>

        {/* 그라데이션 배경 (모바일에만, 회색) */}
        <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-gray-600 to-transparent md:hidden"></div>

        {/* 텍스트 및 버튼 컨테이너 */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          <div className="w-full px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8
                        md:absolute md:top-[25%] md:left-[5%] md:w-auto"> {/* md:left-[5%] */}
            {/*
              모바일: absolute, bottom-[20%], font-bold
              PC: absolute, top-[25%], left-[5%], font-semibold,  ml-4 (또는 원하는 값) <- 추가
            */}

            {/* 텍스트: PC에서 ml-4 (또는 원하는 값) 추가*/}
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-semibold md:font-semibold leading-tight tracking-[-0.32px]
                           absolute bottom-[20%] w-full md:relative md:bottom-auto md:ml-4">
              진우교회에 오신<br />
              여러분을 환영합니다.
            </h1>

            {/* 버튼: PC에서 ml-4 (또는 원하는 값) 추가, md:mt-8 */}
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
    </div>
  );
};