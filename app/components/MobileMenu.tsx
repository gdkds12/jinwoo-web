// app/components/MobileMenu.tsx
"use client";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import jinwooLogo from "@/public/images/jinwoo-logo.png";
import { menuData, MenuDataKey } from "./constants/menu"; // MenuDataKey import
import React from "react";

interface MobileMenuProps {
  // menuData prop 제거됨
}

export const MobileMenu: React.FC<MobileMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  // menuItems를 MenuDataKey[] 타입으로 명시
  const menuItems: MenuDataKey[] = Object.keys(menuData) as MenuDataKey[];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuItemClasses = "py-3 border-b border-gray-200";
  const subMenuItemClasses = "py-1";
  const linkClasses = "text-foreground";
  const closeButtonClasses = "absolute top-4 right-4 p-2";

  return (
    <div className="">
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

      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-white z-[50] overflow-y-auto">
          <div className="p-4">
            <button onClick={closeMenu} className={closeButtonClasses}>
              <IoClose className="text-2xl" />
            </button>

            <Link href="/" onClick={closeMenu}>
              <div className="flex items-center justify-center mb-4">
                <Image src={jinwooLogo} alt="Jinwoo logo" width={121} height={68} />
              </div>
            </Link>

            <ul>
              {menuItems.map((item) => (
                <li key={item} className={menuItemClasses}>
                  <Link href={`#`} onClick={closeMenu}>
                    <div className="font-bold text-lg text-foreground">{item}</div>
                  </Link>

                  {/* menuData[item] 접근 시 타입 안전성 확보 */}
                  {menuData[item] && menuData[item].length > 0 && (
                    <ul className="mt-2 ml-4">
                      {menuData[item].map((subItem: string) => ( // subItem 타입 명시
                        <li key={subItem} className={subMenuItemClasses}>
                          <Link href={`#`} onClick={closeMenu}>
                            <div className="text-foreground">{subItem}</div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
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
       <style jsx>{`
        @media (max-width: 767px) {

          :global(.header-container) {
            background-color: transparent;
          }
        }
      `}</style>
    </div>
  );
};