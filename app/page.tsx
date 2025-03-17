"use client";
// app/page.tsx
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MainBanner } from "./components/MainBanner";
import { WordSection } from "./components/WordSection";
import { MenuSection } from "./components/MenuSection";
import { NoticeSection } from "./components/NoticeSection";
import { GallerySection } from "./components/GallerySection";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // 페이지 로드 시 body 스타일 설정
    document.body.style.backgroundColor = "#F2F2F2";
    
    return () => {
      // 컴포넌트 언마운트 시 스타일 초기화
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <Header />
      
      <main className="w-full max-w-6xl mx-auto pt-4">
        <MainBanner />
        <MenuSection />
        <WordSection />
        <NoticeSection />
        <GallerySection />
        
        {/* 여기에 다른 섹션 추가 */}
        
      </main>
      
      <Footer />
    </div>
  );
}