import React from "react";
import Image from "next/image";
import Link from "next/link";
import MobileMenuSection from "./MobileMenuSection";

// 메뉴 아이템 타입 정의
type MenuItem = {
  title: string;
  imageName: string;
  link: string;
};

const MenuSection = () => {
  // 메뉴 아이템 데이터
  const menuItems: MenuItem[] = [
    { title: "예배 안내", imageName: "WorshipInfo.png", link: "/worship" },
    { title: "주보", imageName: "Newsletter.png", link: "/newsletter" },
    { title: "교회 소식", imageName: "ChurchNews.png", link: "/news" },
    { title: "헌금 안내", imageName: "OfferingGuide.png", link: "/offering" },
    { title: "문의", imageName: "ContactUs.png", link: "/contact" },
    { title: "오시는 길", imageName: "Location.png", link: "/location" },
  ];

  // 메뉴 아이템 렌더링 함수
  const renderMenuItem = (item: MenuItem, index: number) => (
    <Link href={item.link} key={index}>
      <div className="relative aspect-[250/95] bg-white shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-300 cursor-pointer">
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
      </div>
    </Link>
  );

  return (
    <section className="flex flex-col w-full items-center pt-[400px] pb-16 md:pb-20 lg:pb-24 px-6 md:px-12 lg:px-60 bg-white">
      <div className="max-w-[1440px] w-full flex flex-col items-center gap-6">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-[#333333] text-[35px] md:text-[35px] text-center tracking-[-0.32px] leading-[52.5px] font-semibold">
            복음의 생명으로 세상을 아름답게 하는 성령의 교회
          </h2>
        </div>

        <div className="w-full flex flex-col items-center">
          <p className="text-[#666666] text-base text-center tracking-[-0.32px] leading-6">
            복음전파와 이웃사랑으로 죽어가는 생명을 살리고 세상을 아름답게
            변화시킵니다.
            <br />
            이러한 교회를 살아있는 생명의 유기체로 만드는 분이 바로
            성령이십니다.
          </p>
        </div>

        {/* PC 메뉴 그리드 (md 이상에서만 표시) */}
        <div className="hidden md:grid w-full max-w-[788px] grid-cols-3 gap-4 mt-4">
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