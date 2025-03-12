// components/Section.tsx
import React from "react";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

export const Section = () => {
  return (
    <div className="flex w-full h-[1200px] items-end justify-center px-14 py-0 relative overflow-hidden">
      <div
        className="absolute w-full h-full top-0 left-0 bg-cover bg-center"
        style={{ backgroundImage: "url(images/main-home.jpg)" }}
      />

       {/* 이 div에 z-index가 있는지 확인 */}
      <div className="max-w-[1440px] h-[1041px] gap-8 pt-0 pb-[150px] px-0 flex-1 flex flex-col items-start relative z-10">
        <div className="self-stretch w-full flex flex-col items-start">
          <div className="self-stretch text-white text-[65px] leading-[85px] font-medium tracking-[-0.32px]">
            진우교회에 오신
            <br />
            여러분을 환영합니다.
          </div>
        </div>

        <Link
          href="/worship-info"
          className="flex w-[250px] items-center px-8 py-0 bg-white relative"
        >
          <span className="text-[#333333] text-lg leading-[72px] whitespace-nowrap font-medium tracking-[-0.32px]">
            예배 안내
          </span>
          <IoArrowForward className="text-2xl ml-auto" />
        </Link>
      </div>
    </div>
  );
};