// app/components/Header.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ComponentScreen } from "./ComponentScreen";
import { IoPersonOutline, IoSearchOutline } from "react-icons/io5";
import jinwooLogo from "@/public/images/jinwoo-logo.png";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
  const menuData = {
    예배: ["예배 LIVE", "설교", "예배안내"],
    성장: ["교회학교", "교육/훈련", "강좌"],
    교제: ["소그룹", "교회부서", "봉사/행사"],
    섬김: ["돌봄", "선교", "소망말씀나눔"],
    미디어: ["영상", "갤러리", "행정서비스"],
    소통: ["교회소식", "교우소식", "문의", "진우교회"],
    교회: [],
  };

  return (
    <div className="flex flex-col w-full items-center">
      {/* 메인 헤더 영역 */}
      <div className="max-w-[1400px] w-full relative z-20 py-6">
        {/* 로고, 모바일메뉴, 로그인/검색 버튼 컨테이너 */}
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link href="/">
            <Image
              src={jinwooLogo}
              alt="Jinwoo logo"
              width={121}
              height={68}
              className="object-cover"
            />
          </Link>

          {/* 모바일 메뉴 (햄버거 버튼) - 오른쪽 정렬 */}
          <div className="ml-auto">
            <MobileMenu menuData={menuData} />
          </div>
        </div>

        {/* 데스크탑 메뉴 (absolute 포지셔닝) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ComponentScreen />
        </div>
      </div>

      {/* 모바일 배경 - 투명 처리 */}
      <style jsx>{`
        @media (max-width: 767px) { /* 768px 이하에서 적용 (일반적인 모바일) */
          .max-w-\\[1400px\\] {
            background-color: transparent;
          }
        }
      `}</style>
    </div>
  );
};