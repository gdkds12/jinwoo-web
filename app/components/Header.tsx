// components/Header.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ComponentScreen } from "./ComponentScreen";
import { FaYoutube } from "react-icons/fa"; // Font Awesome의 YouTube 아이콘
import { IoPersonOutline, IoSearchOutline } from "react-icons/io5"; // Ionicons 5의 아이콘
import jinwooLogo from "@/public/images/jinwoo-logo.png"; // 로고 이미지

export const Header = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col items-center w-full border-b border-[#0000001f]">
        <div className="flex max-w-[1400px] w-full h-[42px] items-center px-0 py-2">
          <div className="flex items-center gap-1.5 flex-1">
            <div className="relative w-[153px] h-[19px] flex items-center">
              <Link
                href="https://www.youtube.com/@jinwoochurch"
                className="font-medium text-[#00000066] text-[13px] tracking-[-0.32px] leading-[25px] whitespace-nowrap"
              >
                진우교회 유튜브
              </Link>
              <FaYoutube className="text-[#00000066] text-xl ml-1" />
              <span className="font-medium text-[#00000066] text-[13px] tracking-[-0.32px] leading-[25px] whitespace-nowrap ml-2">
                |
              </span>
            </div>
          </div>

          <div className="flex items-start justify-end gap-1 flex-1">
            <Link
              href="/prayer-request"
              className="font-medium text-[#00000066] text-[13px] tracking-[-0.32px] leading-[25px] whitespace-nowrap"
            >
              기도요청
            </Link>
            <span className="font-medium text-[#00000066] text-[13px] tracking-[-0.32px] leading-[25px] whitespace-nowrap">
              ·
            </span>
            <Link
              href="/send-sms"
              className="font-medium text-[#00000066] text-[13px] tracking-[-0.32px] leading-[25px] whitespace-nowrap"
            >
              문자발송
            </Link>
            <span className="font-medium text-[#00000066] text-[13px] tracking-[-0.32px] leading-[25px] whitespace-nowrap">
              ·
            </span>
            <Link
              href="/register"
              className="font-medium text-[#00000066] text-[13px] tracking-[-0.32px] leading-[25px] whitespace-nowrap"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>

      <div className="relative max-w-[1400px] w-full h-[115px]">
        <Image
          src={jinwooLogo}
          alt="Jinwoo logo"
          width={121}
          height={68}
          className="absolute top-6 left-0 object-cover"
        />

        <div className="absolute top-[42px] left-[1213px] flex items-center">
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
          <Link href="/some-path-2">
            {/*  어떤 아이콘을 결정하지 못해 일단 주석처리 */}
            {/* <SomeIcon className="text-2xl" /> */}
          </Link>
        </div>

        <div className="absolute top-0 left-[235px] w-full">
          <ComponentScreen />
        </div>
      </div>
    </div>
  );
};