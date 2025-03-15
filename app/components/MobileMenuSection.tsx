"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const MobileMenuSection = () => {
  // 메뉴 아이템 데이터
  const menuItems = [
    { title: "예배 안내", imageName: "WorshipInfo.png", link: "/worship" },
    { title: "주보", imageName: "Newsletter.png", link: "/newsletter" },
    { title: "교회 소식", imageName: "ChurchNews.png", link: "/news" },
    { title: "헌금 안내", imageName: "OfferingGuide.png", link: "/offering" },
    { title: "문의", imageName: "ContactUs.png", link: "/contact" },
    { title: "오시는 길", imageName: "Location.png", link: "/location" },
  ];

  // 균일한 간격을 위한 상수 정의
  const GAP = 2; // 카드 사이 간격(%)
  const TOP_CARD_WIDTH = 48.5; // 상단 카드 너비(%)
  const TOP_CARD_HEIGHT = 62; // 예배 안내 카드 높이(%)
  const MID_CARD_HEIGHT = 30; // 중간 카드 높이(%)
  const BOTTOM_CARD_WIDTH = 31.67; // 하단 카드 너비(%)
  const BOTTOM_CARD_HEIGHT = 30; // 하단 카드 높이(%)
  const VERTICAL_GAP = 3; // 상하 카드 사이 간격(%)
  const BOTTOM_CARDS_OFFSET = 4.5; // 하단 카드 상향 이동 값(%)

  // 애니메이션 변수 - 최적화
  const cardVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: 0.05 * i,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  // 각 카드 유형별 렌더링 함수
  const renderTopCard = () => (
    <Link href={menuItems[0].link}>
      <motion.div 
        className="absolute bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        style={{
          top: 0,
          left: 0,
          width: `${TOP_CARD_WIDTH}%`,
          height: `${TOP_CARD_HEIGHT}%`
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={cardVariants}
        custom={0}
      >
        <div className="absolute top-[5%] left-[7%] font-semibold text-black tracking-[-0.32px] leading-normal text-[4.2vw] md:text-lg">
          {menuItems[0].title}
        </div>
        <div className="absolute right-[10%] bottom-[15%] w-[55%]">
          <Image
            src={`/images/menu/${menuItems[0].imageName}`}
            alt={menuItems[0].title}
            width={150}
            height={150}
            className="object-contain w-full h-auto"
          />
        </div>
      </motion.div>
    </Link>
  );

  const renderMidCards = () => (
    menuItems.slice(1, 3).map((item, index) => (
      <Link href={item.link} key={index}>
        <motion.div 
          className="absolute bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          style={{
            top: `${index * (MID_CARD_HEIGHT + GAP)}%`,
            left: `${TOP_CARD_WIDTH + GAP}%`,
            width: `${TOP_CARD_WIDTH}%`,
            height: `${MID_CARD_HEIGHT}%`
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={cardVariants}
          custom={index + 1}
        >
          <div className="absolute top-[15%] left-[7%] font-semibold text-black tracking-[-0.32px] leading-normal text-[3.8vw] md:text-lg">
            {item.title}
          </div>
          <div className="absolute right-[5%] top-1/2 transform -translate-y-1/2 w-[35%]">
            <Image
              src={`/images/menu/${item.imageName}`}
              alt={item.title}
              width={75}
              height={75}
              className="object-contain w-full h-auto"
            />
          </div>
        </motion.div>
      </Link>
    ))
  );

  const renderBottomCards = () => (
    menuItems.slice(3).map((item, index) => {
      const leftPosition = index * (BOTTOM_CARD_WIDTH + GAP);
      
      return (
        <Link href={item.link} key={index}>
          <motion.div 
            className="absolute bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            style={{
              bottom: `${BOTTOM_CARDS_OFFSET}%`,
              left: `${leftPosition}%`,
              width: `${BOTTOM_CARD_WIDTH}%`,
              height: `${BOTTOM_CARD_HEIGHT}%`
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={cardVariants}
            custom={index + 3}
          >
            <div className="absolute top-[10%] left-[7%] font-semibold text-black tracking-[-0.32px] leading-normal text-[4.0vw] md:text-lg">
              {item.title}
            </div>
            <div className="absolute right-[5%] bottom-[5%] w-[35%]">
              <Image
                src={`/images/menu/${item.imageName}`}
                alt={item.title}
                width={65}
                height={65}
                className="object-contain w-full h-auto"
              />
            </div>
          </motion.div>
        </Link>
      );
    })
  );

  return (
    <div className="w-full max-w-[413px] mx-auto relative z-10">
      <div className="relative w-full bg-gray-50 pb-[75%]">
        {/* 예배 안내 - 왼쪽 상단 큰 카드 */}
        {renderTopCard()}

        {/* 주보 & 교회 소식 - 오른쪽 상단 카드들 */}
        {renderMidCards()}

        {/* 하단 3개 카드 */}
        {renderBottomCards()}
      </div>
    </div>
  );
};

export default MobileMenuSection; 