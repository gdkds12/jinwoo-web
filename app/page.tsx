"use client";
// app/page.tsx
import { Header } from "./components/Header";
import { Section } from "./components/Section";
import { Footer } from "./components/Footer";
import GallerySection from "./components/GallerySection";
import MenuSection from "./components/MenuSection";
import { FadeInSection, AnimatedSection } from "./components/AnimatedSection";
import { useEffect, useState } from "react";

// 컴포넌트 로딩 상태를 위한 간단한 스켈레톤 컴포넌트
const SkeletonSection = ({ height }: { height: string }) => (
  <div className={`w-full ${height} bg-gray-50`}></div>
);

export default function Home() {
  // 페이지 로딩 상태 관리
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // 페이지 로드 후 상태 업데이트
    setIsLoaded(true);
    
    // 새로고침 시 페이지 상단으로 스크롤
    window.scrollTo(0, 0);
    
    // 페이지 로드 시 스크롤 가능하도록 body 스타일 설정
    document.body.style.overflow = "auto";
    document.body.style.overscrollBehavior = "auto";
    
    return () => {
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    };
  }, []);

  return (
    <div className="min-h-[200vh]">
      <FadeInSection delay={0}>
        <Header />
      </FadeInSection>
      <div className="main-container relative">
        <FadeInSection delay={0}>
          <Section />
        </FadeInSection>
        <div className="content-container md:mt-0">
          <AnimatedSection delay={0}>
            <MenuSection />
          </AnimatedSection>
          
          <AnimatedSection delay={0}>
            <GallerySection />
          </AnimatedSection>
        </div>
      </div>
      <AnimatedSection delay={0}>
        <Footer />
      </AnimatedSection>
      
      <style jsx>{`
        @media (max-width: 767px) {
          .main-container {
            display: flex;
            flex-direction: column;
          }
          .content-container {
            margin-top: 0;
            background-color: #f9fafb; /* gray-50 */
            position: relative;
            z-index: 2;
          }
        }
      `}</style>
    </div>
  );
}