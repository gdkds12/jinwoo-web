// app/components/Header.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ComponentScreen } from "./ComponentScreen";
import { FaYoutube } from "react-icons/fa";
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
  // const menuItems = Object.keys(menuData); // 사용하지 않으면 주석 처리 또는 삭제

  return (
    <div className="flex flex-col w-full items-center">
      {/* 상단 바 */}
      <div className="flex flex-col items-center w-full border-b border-[#0000001f]">
        {/* ... (상단 바 코드, 변경 없음) */}
        <div className="flex max-w-[1400px] w-full h-[42px] items-center px-0 py-2">
          <div className="flex items-center gap-1.5 flex-1">
            <div className="relative w-[153px] h-[19px] flex items-center">
              <Link
                href="https://www.youtube.com/@jinwoochurch"
                className="font-medium text-[#00000066]  text-[13px] tracking-[-0.32px] leading-[25px] whitespace-nowrap"
              >
                진우교회 유튜브
              </Link>
              <FaYoutube className="text-[#00000066]  text-xl ml-1" />
              <span className="font-medium text-[#00000066]  text-[13px] tracking-[-0.32px] leading-[25px] whitespace-nowrap ml-2">
                |
              </span>
            </div>
          </div>

          <div className="flex items-start justify-end gap-1 flex-1">
            <Link
              href="/prayer-request"
              className="font-medium text-[#00000066]  text-[13px] tracking-[-0.32px] leading-[25px] whitespace-nowrap"
            >
              기도요청
            </Link>
            <span className="font-medium text-[#00000066]  text-[13px] tracking-[-0.32px] leading-[25px] whitespace-nowrap">
              ·
            </span>
            <Link
              href="/send-sms"
              className="font-medium text-[#00000066]  text-[13px] tracking-[-0.32px] leading-[25px] whitespace-nowrap"
            >
              문자발송
            </Link>
            <span className="font-medium text-[#00000066]  text-[13px] tracking-[-0.32px] leading-[25px] whitespace-nowrap">
              ·
            </span>
            <Link
              href="/register"
              className="font-medium text-[#00000066]  text-[13px] tracking-[-0.32px] leading-[25px] whitespace-nowrap"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>

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

          {/* 모바일 메뉴 (햄버거 버튼) */}
          <MobileMenu menuData={menuData} />

          {/* 로그인/검색 버튼 */}
          <div className="flex items-center ml-7.5">
            <Link href="/login" className="mr-7.5">
              <div className="flex items-center">
                <IoPersonOutline className="text-2xl mr-1" />
                <span className="font-medium text-[#333333] text-sm tracking-[-0.32px] leading-[25px] whitespace-nowrap">
                  로그인
                </span>
              </div>
            </Link>
            <Link href="/some-path-1" className="mr-7.5">
              <IoSearchOutline className="text-2xl" />
            </Link>
            <Link href="/some-path-2">{/* 아이콘 */}</Link>
          </div>
        </div>
        {/* 데스크탑 메뉴 (absolute 포지셔닝) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ComponentScreen />
        </div>
      </div>
    </div>
  );
};