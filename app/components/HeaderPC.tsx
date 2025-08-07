"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import jinwooLogo from "@/public/images/jinwoo-logo.png";
import { openNoticeFullScreen } from "./NoticeSection";

export const HeaderPC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNoticeClick = () => {
    openNoticeFullScreen();
  };

  const NavItem = ({ text, dropdownItems }: { text: string, dropdownItems?: string[] }) => (
    <div className="relative group">
      <div className="flex items-center gap-1 cursor-pointer">
        <span>{text}</span>
        {dropdownItems && <IoIosArrowDown className="transition-transform duration-200 group-hover:rotate-180" />}
      </div>
      {dropdownItems && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          {dropdownItems.map(item => (
            <Link key={item} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{item}</Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className={`hidden md:block fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="w-full max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/">
              <Image
                src={jinwooLogo}
                alt="Jinwoo logo"
                width={120}
                height={40}
                className={`object-contain ${!isScrolled && 'invert'}`}
              />
            </Link>
            <nav className={`flex gap-8 font-semibold ${isScrolled ? 'text-black' : 'text-white'}`}>
              <NavItem text="교회소개" dropdownItems={["인사말", "연혁", "섬기는 사람들"]} />
              <NavItem text="설교·찬양" dropdownItems={["주일설교", "찬양대", "특별찬양"]} />
              <NavItem text="목양·사역" dropdownItems={["국내선교", "해외선교", "새가족"]} />
              <NavItem text="교육·훈련" dropdownItems={["주일학교", "청년부", "제자훈련"]} />
            </nav>
          </div>
          
          <div className="flex items-center gap-6">
            <FaBell className={`text-xl cursor-pointer ${isScrolled ? 'text-gray-600' : 'text-white'}`} onClick={handleNoticeClick} />
            <Link href="#" className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-colors ${isScrolled ? 'bg-gray-100 text-black' : 'bg-white/20 text-white hover:bg-white/30'}`}>
              <FaUserCircle />
              <span>로그인</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderPC;
