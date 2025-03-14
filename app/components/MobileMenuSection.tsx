import React from "react";
import Image from "next/image";
import Link from "next/link";

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

  return (
    <div className="w-full max-w-[413px] mx-auto">
      <div className="relative w-full bg-gray-50" style={{ height: "310px" }}>
        {/* 예배 안내 - 왼쪽 상단 큰 카드 */}
        <Link href={menuItems[0].link}>
          <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <div className="absolute top-[15px] left-[15px] font-semibold text-black text-lg tracking-[-0.32px] leading-normal">
              {menuItems[0].title}
            </div>
            <div className="absolute right-[10px] top-1/2 transform -translate-y-1/2">
              <Image
                src={`/images/menu/${menuItems[0].imageName}`}
                alt={menuItems[0].title}
                width={110}
                height={110}
                className="object-contain"
              />
            </div>
          </div>
        </Link>

        {/* 주보 - 오른쪽 상단 첫 번째 카드 */}
        <Link href={menuItems[1].link}>
          <div className="absolute top-0 left-[205px] w-[200px] h-[95px] bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <div className="absolute top-[15px] left-[15px] font-semibold text-black text-lg tracking-[-0.32px] leading-normal">
              {menuItems[1].title}
            </div>
            <div className="absolute right-[10px] top-1/2 transform -translate-y-1/2">
              <Image
                src={`/images/menu/${menuItems[1].imageName}`}
                alt={menuItems[1].title}
                width={75}
                height={75}
                className="object-contain"
              />
            </div>
          </div>
        </Link>

        {/* 교회 소식 - 오른쪽 상단 두 번째 카드 */}
        <Link href={menuItems[2].link}>
          <div className="absolute top-[100px] left-[205px] w-[200px] h-[95px] bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <div className="absolute top-[15px] left-[15px] font-semibold text-black text-lg tracking-[-0.32px] leading-normal">
              {menuItems[2].title}
            </div>
            <div className="absolute right-[10px] top-1/2 transform -translate-y-1/2">
              <Image
                src={`/images/menu/${menuItems[2].imageName}`}
                alt={menuItems[2].title}
                width={75}
                height={75}
                className="object-contain"
              />
            </div>
          </div>
        </Link>

        {/* 하단 3개 카드 */}
        {menuItems.slice(3).map((item, index) => (
          <Link href={item.link} key={index}>
            <div 
              className="absolute bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              style={{
                top: "215px",
                left: `${index * 135}px`,
                width: "130px",
                height: "95px"
              }}
            >
              <div className="absolute top-[10px] left-[15px] font-semibold text-black text-lg tracking-[-0.32px] leading-normal">
                {item.title}
              </div>
              <div className="absolute right-[10px] bottom-[5px]">
                <Image
                  src={`/images/menu/${item.imageName}`}
                  alt={item.title}
                  width={65}
                  height={65}
                  className="object-contain"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenuSection; 