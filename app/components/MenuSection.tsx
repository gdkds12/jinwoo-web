"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileMenuSection from "./MobileMenuSection";
import { motion } from "framer-motion";

// 메뉴 아이템 타입 정의
type MenuItem = {
  title: string;
  imageName: string;
  link: string;
};

const MenuSection = () => {
  // 가시성 상태 추가
  const [isVisible, setIsVisible] = useState(false);
  
  // 컴포넌트 마운트 시 즉시 보이도록 설정
  useEffect(() => {
    // 지연 시간을 더 줄여 즉시 표시 (초기 렌더링 성능 개선)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  // 메뉴 아이템 데이터
  const menuItems: MenuItem[] = [
    { title: "예배 안내", imageName: "WorshipInfo.png", link: "/worship" },
    { title: "주보", imageName: "Newsletter.png", link: "/newsletter" },
    { title: "교회 소식", imageName: "ChurchNews.png", link: "/news" },
    { title: "헌금 안내", imageName: "OfferingGuide.png", link: "/offering" },
    { title: "문의", imageName: "ContactUs.png", link: "/contact" },
    { title: "오시는 길", imageName: "Location.png", link: "/location" },
  ];

  // 애니메이션 변수 - 성능 최적화
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: 0.03 * i,
        duration: 0.2,
        ease: "easeOut"
      }
    })
  };

  // 메뉴 아이템 렌더링 함수
  const renderMenuItem = (item: MenuItem, index: number) => (
    <Link href={item.link} key={index}>
      <motion.div 
        className="relative aspect-[250/95] bg-white shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        variants={cardVariants}
        custom={index}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="absolute w-[100px] h-[38px] top-[29px] left-[30px] font-semibold text-black text-xl tracking-[-0.32px] leading-normal">
          {item.title}
        </div>
        <div className="absolute top-[10px] right-[10px] w-[75px] h-[75px]">
          <Image
            src={`/images/menu/${item.imageName}`}
            alt={item.title}
            width={75}
            height={75}
            className="object-contain"
          />
        </div>
      </motion.div>
    </Link>
  );

  return (
    <section id="menu-section" className="flex flex-col w-full items-center pt-20 md:pt-[400px] pb-16 md:pb-20 lg:pb-24 px-6 md:px-12 lg:px-60 bg-gray-50">
      <div className="max-w-[1440px] w-full flex flex-col items-center gap-6">
        <motion.div 
          className="w-full flex flex-col items-center"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={textVariants}
        >
          <h2 className="text-[#333333] text-[32px] md:text-[35px] text-center tracking-[-0.32px] leading-[48px] md:leading-[52.5px] font-semibold">
            복음의 생명으로 세상을<br /> 아름답게 하는 성령의 교회
          </h2>
        </motion.div>

        <motion.div 
          className="w-full flex flex-col items-center"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={textVariants}
        >
          <p className="hidden md:block text-[#666666] text-base text-center tracking-[-0.32px] leading-6">
            복음전파와 이웃사랑으로 죽어가는 생명을 살리고 세상을 아름답게
            변화시킵니다.
            <br />
            이러한 교회를 살아있는 생명의 유기체로 만드는 분이 바로
            성령이십니다.
          </p>
        </motion.div>

        {/* PC 메뉴 그리드 (md 이상에서만 표시) */}
        <div 
          className="hidden md:grid w-full max-w-[788px] grid-cols-3 gap-4 mt-4"
        >
          {menuItems.map(renderMenuItem)}
        </div>

        {/* 모바일 메뉴 그리드 (md 미만에서만 표시) */}
        <div className="md:hidden w-full mt-4">
          <MobileMenuSection />
        </div>
      </div>
    </section>
  );
};

export default MenuSection; 