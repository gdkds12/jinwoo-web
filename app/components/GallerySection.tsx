// app/components/GallerySection.tsx
import React from "react";
// import { IoArrowForward } from "react-icons/io5"; // 아이콘 필요하면 주석 해제

interface GalleryItemProps {
  title: string;
  date: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ title, date }) => {
  return (
    <div className="flex flex-col w-[264px] items-start justify-center pt-0 pb-[5px] px-0 relative self-stretch">
      <div className="flex flex-col h-[404.52px] items-start relative self-stretch w-full">
        <div className="flex flex-col self-stretch w-full items-start relative flex-[0_0_auto]">
          {/* 이미지 대신 빈 박스 */}
          <div className="relative self-stretch w-full h-[338.52px] bg-gray-200"></div>

          <div className="flex flex-col items-start pt-4 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
            <div className="self-stretch text-[#333333] text-base leading-[25px] relative mt-[-1.00px] tracking-[-0.32px]">
              {title}
            </div>
          </div>

          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative self-stretch mt-[-1.00px] text-[#777777] text-sm tracking-[-0.32px] leading-[25px]">
              {date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const GallerySection = () => {  // export 제거.
  return (
    <div className="flex flex-col w-full items-center py-[130px] px-4 md:px-10 lg:px-60 relative">
      {/* px-4는 모바일, md:px-10은 태블릿, lg:px-60은 데스크탑 뷰 */}
      <div className="relative max-w-[1440px] w-full">
        <div className="flex flex-col w-full items-center px-[591.81px] py-0">
          {/* px를 제거하고 max-w-full을 추가하여 화면 너비에 맞게 조정 */}
          <p className="w-fit text-transparent text-[40px] md:text-[55px] text-center leading-[60px] md:leading-[82.5px] whitespace-nowrap relative mt-[-1.00px] tracking-[-0.32px]">
          {/*  text-[40px]는 모바일 뷰에서 텍스트 크기, md:text-[55px]는 태블릿 뷰 이상에서 텍스트 크기 */}
            <span className="font-extralight text-[#333333] tracking-[-0.18px]">
              진우{" "}
            </span>
            <span className="font-bold text-[#a28869] tracking-[-0.18px]">
              갤러리
            </span>
          </p>
        </div>

        {/* 전체보기 버튼 */}
        <div className="flex flex-col w-full items-end mt-8 md:mt-10"> {/* mt-8은 모바일 뷰에서 상단 여백, md:mt-10은 태블릿 뷰 이상에서 상단 여백 */}
          <div className="inline-flex justify-end items-center relative">
            {/* 아이콘 사용 시 주석 해제 */}
            {/* <IoArrowForward className="text-[#666666] text-xl" /> */}

            <div className="text-[#666666] text-sm md:text-base text-right leading-[25px] whitespace-nowrap relative mt-[-1.00px] tracking-[-0.32px]">
            {/* text-sm은 모바일 뷰에서 텍스트 크기, md:text-base는 태블릿 뷰 이상에서 텍스트 크기 */}
              전체보기
            </div>
          </div>
        </div>

        {/* 갤러리 아이템들 */}
        <div className="flex flex-col md:flex-row w-full items-start justify-between mt-[40px] md:mt-[50px] lg:mt-[60px] gap-4 md:gap-6 lg:gap-8">
           {/* mt-[40px]는 모바일 뷰에서 상단 여백, md:mt-[50px]는 태블릿 뷰에서, lg:mt-[60px]는 데스크탑 뷰에서 상단 여백 */}
          {/* gap-4는 모바일 뷰에서 아이템 간 간격, md:gap-6은 태블릿 뷰에서, lg:gap-8은 데스크탑 뷰에서 간격 */}
          <GalleryItem title="수여예배" date="2025.03.02" />
          <GalleryItem title="대학부 겨울 수련회" date="2025.02.27" />
          <GalleryItem title="부르심 캠프" date="2025.02.23" />
          <GalleryItem title="2025년 치유를 위한 성찬 예배" date="2025.02.20" />
          <GalleryItem title="청년부 태국 해외선교" date="2025.02.19" />
        </div>
      </div>
    </div>
  );
};

export default GallerySection; // default로 export