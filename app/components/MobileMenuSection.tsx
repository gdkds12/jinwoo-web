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
      <div className="relative w-full bg-gray-50 pb-[75%]">
        {/* 예배 안내 - 왼쪽 상단 큰 카드 */}
        <Link href={menuItems[0].link}>
          <div className="absolute top-0 left-0 w-[48%] h-[64%] bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <div className="absolute top-[5%] left-[7%] font-semibold text-black tracking-[-0.32px] leading-normal text-[3.8vw] md:text-lg">
              {menuItems[0].title}
            </div>
            <div className="absolute right-[5%] top-1/2 transform -translate-y-1/2 w-[40%]">
              <Image
                src={`/images/menu/${menuItems[0].imageName}`}
                alt={menuItems[0].title}
                width={110}
                height={110}
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
        </Link>

        {/* 주보 & 교회 소식 - 오른쪽 상단 카드들 */}
        {menuItems.slice(1, 3).map((item, index) => (
          <Link href={item.link} key={index}>
            <div className="absolute w-[48%] h-[30%] bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                 style={{
                   top: `${index * 32}%`,
                   left: '50%',
                   marginLeft: '2%'
                 }}>
              <div className="absolute top-[15%] left-[7%] font-semibold text-black tracking-[-0.32px] leading-normal text-[3.5vw] md:text-lg">
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
            </div>
          </Link>
        ))}

        {/* 하단 3개 카드 */}
        {menuItems.slice(3).map((item, index) => (
          <Link href={item.link} key={index}>
            <div 
              className="absolute bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              style={{
                bottom: '0',
                left: `${index * 33.33}%`,
                width: '31%',
                height: '30%'
              }}
            >
              <div className="absolute top-[10%] left-[7%] font-semibold text-black tracking-[-0.32px] leading-normal text-[3.2vw] md:text-lg">
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenuSection; 