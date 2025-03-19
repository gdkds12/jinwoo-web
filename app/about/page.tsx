"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

// 클라이언트 컴포넌트로 분리
function AboutContent() {
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
      <h1 className="text-3xl font-bold text-center my-6">교회 안내</h1>
      
      {/* 역사 섹션 */}
      <section id="history" className="py-6">
        <h2 className="text-2xl font-bold mb-6">교회 역사</h2>
        
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-xl font-semibold mb-2">1990년</h3>
            <p className="text-gray-700">교회 설립</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-xl font-semibold mb-2">1995년</h3>
            <p className="text-gray-700">현재 위치로 교회 이전</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-xl font-semibold mb-2">2000년</h3>
            <p className="text-gray-700">교육관 신축</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-xl font-semibold mb-2">2010년</h3>
            <p className="text-gray-700">성전 증축</p>
          </div>
        </div>
        
        <div className="w-full h-px bg-gray-200 my-6"></div>
      </section>

      {/* 비전 섹션 */}
      <section id="vision" className="py-6">
        <h2 className="text-2xl font-bold mb-6">교회 비전</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">우리의 비전</h3>
            <p className="text-gray-700 leading-relaxed">
              &ldquo;하나님의 말씀으로 세워지는 믿음의 공동체, 
              그리스도의 사랑으로 섬기는 교회&rdquo;
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">말씀 중심</h4>
              <p className="text-gray-700">
                하나님의 말씀을 중심으로 한 예배와 교제
              </p>
            </div>
            <div className="border border-gray-200 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">기도하는 교회</h4>
              <p className="text-gray-700">
                끊임없는 기도로 하나님과 교통하는 교회
              </p>
            </div>
            <div className="border border-gray-200 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">섬김의 교회</h4>
              <p className="text-gray-700">
                그리스도의 사랑으로 서로를 섬기는 교회
              </p>
            </div>
            <div className="border border-gray-200 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3">선교하는 교회</h4>
              <p className="text-gray-700">
                복음을 전하고 세상을 변화시키는 교회
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// 로딩 상태 컴포넌트
function Loading() {
  return <div className="text-center py-10">로딩 중...</div>;
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 뒤로가기 버튼 */}
      <div className="sticky top-0 bg-white z-10 p-4">
        <Link href="/" className="inline-block">
          <IoIosArrowBack className="text-2xl" />
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20">
        <Suspense fallback={<Loading />}>
          <AboutContent />
        </Suspense>
      </div>
    </div>
  );
} 