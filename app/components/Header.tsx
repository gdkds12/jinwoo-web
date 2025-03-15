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
    <div className="desktop-header flex flex-col w-full items-center bg-white">
      <div className="max-w-5xl w-full relative z-20 md:py-4 header-container mx-auto">
        {/* PC에서 중앙 정렬을 위해 수정 */}
        <div className="flex items-center md:justify-center justify-between px-5 md:px-0">
          <Link href="/" className="md:absolute md:left-0">
            <Image
              src={jinwooLogo}
              alt="Jinwoo logo"
              width={121}
              height={68}
              className="object-cover"
            />
          </Link>

          {/* 데스크탑 메뉴를 위한 공간 확보 */}
          <div className="relative flex-grow md:flex-grow-0">
            <div className="md:relative md:transform-none md:left-auto md:top-auto md:translate-x-0 md:translate-y-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ComponentScreen />
            </div>
          </div>

          <div className="md:absolute md:right-0">
            <MobileMenu />
          </div>
        </div>
      </div>

      {/* PC와 모바일에서 다른 헤더 스타일 적용 */}
      <style jsx>{`
        .desktop-header {
          position: static;
          background-color: white;
          width: 100%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header-container {
          background-color: white;
        }
        @media (max-width: 767px) {
          .desktop-header {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 50;
            background-color: transparent;
            box-shadow: none;
          }
          .header-container {
            background-color: transparent;
          }
        }
      `}</style>
    </div>
  );
};