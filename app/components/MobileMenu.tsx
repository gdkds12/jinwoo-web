// components/MobileMenu.tsx
"use client";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";

interface MobileMenuProps {
  menuData: { [key: string]: string[] };
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ menuData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = Object.keys(menuData);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 닫기 버튼을 눌렀을 때도 메뉴를 닫도록
  const closeMenu = () => {
      setIsOpen(false);
  }

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
          className="fixed top-0 left-0 w-screen h-screen bg-white z-50 overflow-y-auto" // Fixed positioning, full screen
        >
          <div className="p-4">
            {/* 닫기 버튼 */}
            <button onClick={closeMenu} className="absolute top-4 right-4 p-2">
              <IoClose className="text-2xl" />
            </button>

            {/* 로고 */}
             <Link href="/" passHref>
                <div className="flex items-center justify-center mb-4" onClick={closeMenu}>
                    <img src="/images/jinwoo-logo.png" alt="Jinwoo logo" className="h-12 w-auto"  />
                </div>
             </Link>

            {/* 메뉴 목록 */}
            <ul>
              {menuItems.map((item) => (
                <li key={item} className="py-3 border-b border-gray-200">
                  <Link href={`#`} onClick={closeMenu}>
                    <div className="font-bold text-lg text-foreground">{item}</div>
                  </Link>

                  {/* 서브메뉴 */}
                  {menuData[item] && menuData[item].length > 0 && (
                    <ul className="mt-2 ml-4">
                      {menuData[item].map((subItem) => (
                        <li key={subItem} className="py-1">
                          <Link href={`#`} onClick={closeMenu}>
                            <div className="text-foreground">{subItem}</div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              {/* 로그인, 회원가입 버튼 */}
                 <li className="py-3">
                    <Link href="/login" passHref>
                        <div className="text-foreground" onClick={closeMenu}>로그인</div>
                    </Link>
                </li>
                <li className="py-3">
                    <Link href="/register" passHref>
                        <div className="text-foreground" onClick={closeMenu}>회원가입</div>
                    </Link>
                </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};