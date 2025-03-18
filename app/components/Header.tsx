// app/components/Header.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBell } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import jinwooLogo from "@/public/images/jinwoo-logo.png";
import { MenuDrawer } from "./MenuDrawer";
import { openNoticeFullScreen } from "./NoticeSection";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNoticeClick = () => {
    // 바로 공지사항 이벤트 발생
    openNoticeFullScreen();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full bg-[#F2F2F2] z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* 왼쪽: 알림 아이콘 */}
            <div className="w-10">
              <FaBell className="text-xl cursor-pointer" onClick={handleNoticeClick} />
            </div>
            
            {/* 중앙: 로고 */}
            <div className="flex justify-center">
              <Link href="/">
                <Image
                  src={jinwooLogo}
                  alt="Jinwoo logo"
                  width={90}
                  height={50}
                  className="object-contain"
                />
              </Link>
            </div>
            
            {/* 오른쪽: 메뉴 아이콘 */}
            <div className="w-10 flex justify-end">
              <CiMenuFries 
                className="text-2xl cursor-pointer" 
                onClick={toggleMenu}
              />
            </div>
          </div>
        </div>
      </header>

      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;