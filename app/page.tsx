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
    
    // 페이지 로드 시 body 스타일 설정
    document.body.style.width = "100%";
    document.body.style.maxWidth = "100%";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
    document.body.style.boxSizing = "border-box";
    document.body.style.position = "relative";
    
    return () => {
      // 컴포넌트 언마운트 시 스타일 초기화
      document.body.style.width = "";
      document.body.style.maxWidth = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
      document.body.style.overflowY = "";
      document.body.style.boxSizing = "";
      document.body.style.position = "";
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
      
      <style jsx global>{`
        html {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }
        
        body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
          overflow-x: hidden !important;
          box-sizing: border-box !important;
          position: relative !important;
        }
        
        #__next {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          box-sizing: border-box;
        }
        
        @media (max-width: 767px) {
          body {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
          }
          
          .main-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 100vw;
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