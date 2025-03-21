"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { IoLocationOutline, IoCallOutline, IoMailOutline, IoTimeOutline, IoChevronBackOutline } from "react-icons/io5";
import { FaMusic, FaChalkboardTeacher, FaHandsHelping, FaPeopleCarry } from "react-icons/fa";

// 클라이언트 컴포넌트로 분리
function InfoContent() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  // 섹션으로 스크롤하는 함수
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // URL 파라미터에 따라 자동 스크롤
  React.useEffect(() => {
    if (section) {
      scrollToSection(section);
    }
  }, [section]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-6 dark:text-white">교회 정보</h1>
      
      {/* 교회 소개 섹션 */}
      <section id="introduction" className="py-6">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">교회 소개</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-dark-700 p-6 rounded-lg dark:bg-dark-700">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">우리 교회</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              우리 교회는 1990년에 설립되어 하나님의 말씀과 은혜로 성장해 온 교회입니다. 
              예배와 말씀, 기도와 교제를 통해 그리스도의 사랑을 실천하며, 
              복음을 전하고 세상을 변화시키는 것을 사명으로 삼고 있습니다.
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-dark-700 p-6 rounded-lg dark:bg-dark-700">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">교회 활동</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              매주 주일 예배와 수요 예배를 통해 말씀을 듣고, 
              다양한 소그룹 모임을 통해 서로를 섬기며 교제하고 있습니다. 
              또한 지역 사회를 섬기고 선교지를 지원하는 등 
              그리스도의 사랑을 실천하는 다양한 활동을 펼치고 있습니다.
            </p>
          </div>
        </div>
        
        <div className="w-full h-px bg-gray-200 dark:bg-dark-700 my-6"></div>
      </section>

      {/* 연락처 정보 섹션 */}
      <section id="contact" className="py-6">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">연락처 정보</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <IoLocationOutline className="text-2xl text-blue-500" />
              <div>
                <p className="font-medium dark:text-white">주소</p>
                <p className="text-gray-600 dark:text-gray-300">서울특별시 강남구 테스트로 123</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <IoCallOutline className="text-2xl text-blue-500" />
              <div>
                <p className="font-medium dark:text-white">전화</p>
                <p className="text-gray-600 dark:text-gray-300">02-1234-5678</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <IoMailOutline className="text-2xl text-blue-500" />
              <div>
                <p className="font-medium dark:text-white">이메일</p>
                <p className="text-gray-600 dark:text-gray-300">church@example.com</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <IoTimeOutline className="text-2xl text-blue-500" />
              <div>
                <p className="font-medium dark:text-white">예배 시간</p>
                <p className="text-gray-600 dark:text-gray-300">주일 오전 11시</p>
                <p className="text-gray-600 dark:text-gray-300">수요일 오후 7시 30분</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full h-px bg-gray-200 dark:bg-dark-700 my-6"></div>
      </section>
      
      {/* 교회 부서 섹션 */}
      <section id="departments" className="py-6">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">교회 부서</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 dark:border-dark-700 p-4 rounded-lg dark:bg-dark-700">
            <div className="flex items-center mb-3">
              <FaMusic className="text-2xl text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold dark:text-white">예배부</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              찬양팀, 성가대, 미디어팀 등 예배를 섬기는 부서
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-dark-700 p-4 rounded-lg dark:bg-dark-700">
            <div className="flex items-center mb-3">
              <FaChalkboardTeacher className="text-2xl text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold dark:text-white">교육부</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              주일학교, 청년부, 장년부 등 성경 교육을 담당
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-dark-700 p-4 rounded-lg dark:bg-dark-700">
            <div className="flex items-center mb-3">
              <FaHandsHelping className="text-2xl text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold dark:text-white">봉사부</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              주방, 주차, 환경미화 등 교회 관리와 봉사를 담당
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-dark-700 p-4 rounded-lg dark:bg-dark-700">
            <div className="flex items-center mb-3">
              <FaPeopleCarry className="text-2xl text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold dark:text-white">선교부</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              국내외 선교활동과 전도사역을 담당
            </p>
          </div>
        </div>
        
        <div className="w-full h-px bg-gray-200 dark:bg-dark-700 my-6"></div>
      </section>
      
      {/* 교회 시설 섹션 */}
      <section id="facilities" className="py-6">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">교회 시설</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 dark:border-dark-700 p-4 rounded-lg dark:bg-dark-700">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">본당</h3>
            <p className="text-gray-700 dark:text-gray-300">300명을 수용할 수 있는 주 예배 공간</p>
          </div>
          
          <div className="border border-gray-200 dark:border-dark-700 p-4 rounded-lg dark:bg-dark-700">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">교육관</h3>
            <p className="text-gray-700 dark:text-gray-300">주일학교와 교육 프로그램을 위한 공간</p>
          </div>
          
          <div className="border border-gray-200 dark:border-dark-700 p-4 rounded-lg dark:bg-dark-700">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">친교실</h3>
            <p className="text-gray-700 dark:text-gray-300">교제와 식사를 위한 공간</p>
          </div>
          
          <div className="border border-gray-200 dark:border-dark-700 p-4 rounded-lg dark:bg-dark-700">
            <h3 className="text-lg font-semibold mb-2 dark:text-white">주차장</h3>
            <p className="text-gray-700 dark:text-gray-300">50대 이상의 차량을 주차할 수 있는 공간</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark">
      <div className="flex justify-center">
        <div className="w-full max-w-[720px] p-4">
          <div className="flex items-center mb-4">
            <Link href="/" className="inline-flex items-center">
              <IoChevronBackOutline className="text-2xl text-gray-700 dark:text-white" />
              <span className="ml-1 text-gray-700 dark:text-white">홈으로</span>
            </Link>
          </div>
          
          <Suspense fallback={<div className="text-center my-10 dark:text-white">로딩 중...</div>}>
            <InfoContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
} 