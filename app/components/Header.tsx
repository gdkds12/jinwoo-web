// app/components/Header.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ComponentScreen } from "./ComponentScreen";
import jinwooLogo from "@/public/images/jinwoo-logo.png";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="max-w-5xl w-full relative z-20 md:py-0 header-container mx-auto">
        {/* justify-between 제거, flex items-center 유지, gap-4 추가 (또는 원하는 값) */}
        <div className="flex items-center gap-0">
          <Link href="/">
            <Image
              src={jinwooLogo}
              alt="Jinwoo logo"
              width={121}
              height={68}
              className="object-cover"
            />
          </Link>

          {/* 데스크탑 메뉴를 위한 공간 확보, relative position 추가 */}
          <div className="relative flex-grow">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ComponentScreen />
            </div>
          </div>

          <div>
            <MobileMenu />
          </div>
        </div>
      </div>

      {/* 모바일에서 position: absolute 적용 */}
      <style jsx>{`
        @media (max-width: 767px) {
          .header-container {
            background-color: transparent;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 50;
          }
        }
      `}</style>
    </div>
  );
};