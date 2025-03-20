"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FaUserTie, FaUsers, FaUserFriends } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

// 클라이언트 컴포넌트로 분리
function MinistryContent() {
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchParams]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-6">섬기는 사람들</h1>
      
      {/* 담임목사 섹션 */}
      <section id="pastors" className="py-6">
        <h2 className="text-2xl font-bold mb-4 text-center">담임목사</h2>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 mb-4 flex items-center justify-center bg-gray-100 rounded-full">
            <FaUserTie size={48} className="text-gray-600" />
          </div>
          <h3 className="text-xl font-bold">배학기</h3>
          <p className="text-gray-600">담임목사</p>
        </div>
        <div className="w-full h-px bg-gray-200 my-6"></div>
      </section>

      {/* 원로목사 섹션 */}
      <section id="seniorpastors" className="py-6">
        <h2 className="text-2xl font-bold mb-4 text-center">원로목사</h2>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 mb-4 flex items-center justify-center bg-gray-100 rounded-full">
            <FaUserTie size={48} className="text-gray-600" />
          </div>
          <h3 className="text-xl font-bold">김근수</h3>
          <p className="text-gray-600">원로목사</p>
        </div>
        <div className="w-full h-px bg-gray-200 my-6"></div>
      </section>

      {/* 장로 섹션 */}
      <section id="elders" className="py-6">
        <h2 className="text-2xl font-bold mb-4 text-center">장로</h2>
        <div className="grid grid-cols-2 gap-4 mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center p-2">
              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center bg-gray-100 rounded-full">
                <FaUsers size={28} className="text-gray-600" />
              </div>
              <h3 className="font-bold">장로 {i}</h3>
              <p className="text-sm text-gray-600">시무장로</p>
            </div>
          ))}
        </div>
        <div className="w-full h-px bg-gray-200 my-6"></div>
      </section>

      {/* 권사 섹션 */}
      <section id="deaconesses" className="py-6">
        <h2 className="text-2xl font-bold mb-4 text-center">권사</h2>
        <div className="grid grid-cols-2 gap-4 mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center p-2">
              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center bg-gray-100 rounded-full">
                <FaUserFriends size={28} className="text-gray-600" />
              </div>
              <h3 className="font-bold">권사 {i}</h3>
              <p className="text-sm text-gray-600">시무권사</p>
            </div>
          ))}
        </div>
        <div className="w-full h-px bg-gray-200 my-6"></div>
      </section>

      {/* 집사 섹션 */}
      <section id="deacons" className="py-6">
        <h2 className="text-2xl font-bold mb-4 text-center">집사</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="text-center p-2">
              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center bg-gray-100 rounded-full">
                <FaUserFriends size={28} className="text-gray-600" />
              </div>
              <h3 className="font-bold">집사 {i}</h3>
              <p className="text-sm text-gray-600">시무집사</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

// 로딩 상태 컴포넌트
function Loading() {
  return <div className="text-center py-10">로딩 중...</div>;
}

export default function MinistryPage() {
  return (
    <div className="min-h-screen bg-white p-4 flex justify-center">
      <div className="w-full max-w-[550px]">
        {/* 뒤로가기 버튼 */}
        <div className="sticky top-0 bg-white z-10 py-4">
          <Link href="/" className="inline-block">
            <IoIosArrowBack className="text-2xl" />
          </Link>
        </div>
        
        <Suspense fallback={<Loading />}>
          <MinistryContent />
        </Suspense>
      </div>
    </div>
  );
} 