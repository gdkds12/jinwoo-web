// components/MobileMenu.tsx
"use client";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image"; // next/image import
import jinwooLogo from "@/public/images/jinwoo-logo.png"; // 로고 이미지 import
import React from "react";

interface MobileMenuProps {
  menuData: { [key: string]: string[] };
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ menuData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = Object.keys(menuData);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // CSS 클래스 변수
  const menuItemClasses = "py-3 border-b border-gray-200";
  const subMenuItemClasses = "py-1";
  const linkClasses = "text-foreground";
  const closeButtonClasses = "absolute top-4 right-4 p-2";

  return (
    <div className="lg:hidden">
      {/* 햄버거 메뉴 버튼 */}
      <button
        onClick={toggleMenu}
        className="p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isOpen ? (
          <IoClose className="text-2xl" />
        ) : (
          <IoMenu className="text-2xl" />
        )}
      </button>

      {/* 메뉴 목록 (isOpen 상태에 따라 표시/숨김) */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-white z-[50] overflow-y-auto" // z-[50] 사용
        >
          <div className="p-4">
            {/* 닫기 버튼 */}
            <button onClick={closeMenu} className={closeButtonClasses}>
              <IoClose className="text-2xl" />
            </button>

            {/* 로고 */}
            <Link href="/">
                <div className="flex items-center justify-center mb-4" onClick={closeMenu}>
                    <Image src={jinwooLogo} alt="Jinwoo logo"  />
                </div>
            </Link>

            {/* 메뉴 목록 */}
            <ul>
              {menuItems.map((item) => (
                <React.Fragment key={item}>
                  <li className={menuItemClasses}>
                    <Link href={`#`} onClick={closeMenu}>
                        <div className="font-bold text-lg text-foreground">{item}</div>
                    </Link>

                    {/* 서브메뉴 */}
                    {menuData[item] && menuData[item].length > 0 && (
                      <ul className="mt-2 ml-4">
                        {menuData[item].map((subItem) => (
                          <li key={subItem} className={subMenuItemClasses}>
                            <Link href={`#`} onClick={closeMenu}>
                                <div className="text-foreground">{subItem}</div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                </React.Fragment>
              ))}
              {/* 로그인, 회원가입 버튼 */}
              <li className="py-3">
                <Link href="/login" onClick={closeMenu}>
                    <div className={linkClasses}>로그인</div>
                </Link>
              </li>
              <li className="py-3">
                <Link href="/register"  onClick={closeMenu}>
                    <div className={linkClasses}>회원가입</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};