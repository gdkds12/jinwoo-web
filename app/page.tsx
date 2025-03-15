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
    
    // 모바일에서 헤더가 보이도록 최상단으로 스크롤
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    
    // 스크롤 이벤트 처리를 부드럽게 - passive: true 옵션 추가
    const scrollOptions = { passive: true };
    window.addEventListener('scroll', () => {}, scrollOptions);
    
    // 컴포넌트 사전 로드 강제화
    const preloadComponents = () => {
      const sections = document.querySelectorAll('.main-container > div, .content-container > div');
      sections.forEach((section) => {
        if (section instanceof HTMLElement) {
          section.style.visibility = 'visible';
          section.style.willChange = 'auto';
        }
      });
      
      // 헤더를 절대 위치로 설정하여 메인 이미지 위에 표시
      const header = document.querySelector('header');
      if (header instanceof HTMLElement) {
        header.style.display = 'block';
        header.style.visibility = 'visible';
        header.style.opacity = '1';
        header.style.position = 'absolute';
        header.style.top = '0';
        header.style.left = '0';
        header.style.width = '100%';
        header.style.backgroundColor = 'transparent';
        header.style.zIndex = '100';
        
        // 모바일일 경우 헤더 스타일 추가 조정
        if (window.innerWidth <= 767) {
          header.style.textAlign = 'center';
          
          // 로고 크기 및 정렬 조정
          const logo = header.querySelector('img, svg, a > img, a > svg');
          if (logo instanceof HTMLElement) {
            logo.style.maxWidth = '120px';
            logo.style.margin = '0 auto';
            logo.style.display = 'block';
            // 로고에 약간의 그림자 추가하여 가시성 향상
            logo.style.filter = 'drop-shadow(0 0 3px rgba(0,0,0,0.3))';
          }
          
          // 배경 제거 및 메뉴 아이콘 가시성 향상
          const buttons = header.querySelectorAll('button, a[role="button"]');
          buttons.forEach(button => {
            if (button instanceof HTMLElement) {
              button.style.backgroundColor = 'transparent';
              button.style.filter = 'drop-shadow(0 0 3px rgba(0,0,0,0.3))';
            }
          });
          
          // 불필요한 배경이나 컨테이너 숨기기
          const containers = header.querySelectorAll('div:not(:has(img)):not(:has(svg)):not(:has(button))');
          containers.forEach(container => {
            if (container instanceof HTMLElement && container.children.length === 0) {
              container.style.display = 'none';
            }
          });
        }
      }
      
      // 갤러리 카드 비율 직접 적용
      const galleryCards = document.querySelectorAll('[class*="gallery"] [class*="card"], [class*="Gallery"] [class*="card"], [class*="gallery"] [class*="Card"], [class*="Gallery"] [class*="Card"]');
      galleryCards.forEach(card => {
        if (card instanceof HTMLElement) {
          card.style.aspectRatio = '2/3';
          card.style.height = 'auto';
          
          // 카드 내부 이미지도 비율 조정
          const img = card.querySelector('img');
          if (img) {
            img.style.aspectRatio = '2/3';
            img.style.objectFit = 'cover';
            img.style.width = '100%';
            img.style.height = '100%';
          }
        }
      });
    };
    
    // 즉시 실행하고 약간의 지연 후 다시 실행
    preloadComponents();
    setTimeout(preloadComponents, 100);
    setTimeout(preloadComponents, 500);  // 추가 지연 후 한 번 더 실행
    
    return () => {
      // 이벤트 리스너 제거
      window.removeEventListener('scroll', () => {}, scrollOptions as EventListenerOptions);
      
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
    <div className="min-h-[200vh] w-full mx-auto relative">
      {/* 헤더를 절대 위치로 설정하여 메인 이미지 위에 표시 */}
      <div className="header-container w-full absolute top-0 left-0 z-50">
        <FadeInSection delay={0}>
          <Header />
        </FadeInSection>
      </div>
      
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
          scroll-behavior: smooth;
          scroll-padding-top: 0;
        }
        
        body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
          overflow-x: hidden !important;
          box-sizing: border-box !important;
          position: relative !important;
          scroll-behavior: smooth !important;
          -webkit-overflow-scrolling: touch !important;
        }
        
        #__next {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          box-sizing: border-box;
        }
        
        /* 애니메이션 관련 스타일 최적화 */
        .animated-section, .fade-in-section {
          will-change: auto !important;
          transform: none !important;
          transition-delay: 0ms !important;
        }
        
        /* 헤더가 메인 이미지 위에 오도록 설정 */
        .header-container {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          display: block !important;
          z-index: 100 !important;
          background-color: transparent !important;
        }
        
        header {
          position: relative !important;
          z-index: 100 !important;
          visibility: visible !important;
          opacity: 1 !important;
          display: block !important;
          margin: 0 !important;
          padding: 0 !important;
          background-color: transparent !important;
        }
        
        /* 로고와 버튼 가시성 향상 */
        header img, header svg, header a > img, header a > svg,
        header button, header a[role="button"] {
          filter: drop-shadow(0 0 3px rgba(0,0,0,0.3)) !important;
        }
        
        /* 헤더 내 불필요한 배경 제거 */
        header div, header nav, header section {
          background-color: transparent !important;
        }
        
        /* 메인 이미지 섹션의 패딩 제거 */
        .main-container {
          padding: 0 !important;
          margin: 0 !important;
        }
        
        .main-container > div:first-child {
          padding: 0 !important;
          margin: 0 !important;
        }
        
        /* Section 컴포넌트 내부의 요소에 패딩 제거 */
        .main-container > div:first-child > div {
          padding: 0 !important;
          margin: 0 !important;
        }
        
        /* 갤러리 카드 비율 변경 - 세로로 길게 */
        [class*="gallery"] [class*="card"],
        [class*="Gallery"] [class*="card"],
        [class*="gallery"] [class*="Card"],
        [class*="Gallery"] [class*="Card"],
        div[class*="gallery"] > div,
        div[class*="Gallery"] > div {
          aspect-ratio: 2/3 !important;
          height: auto !important;
          min-height: 0 !important;
        }
        
        [class*="gallery"] img,
        [class*="Gallery"] img,
        div[class*="gallery"] > div img,
        div[class*="Gallery"] > div img {
          aspect-ratio: 2/3 !important;
          object-fit: cover !important;
          width: 100% !important;
          height: 100% !important;
        }
        
        /* 더 구체적인 갤러리 카드 선택자 */
        .content-container div[class*="gallery"] div,
        .content-container div[class*="Gallery"] div {
          aspect-ratio: 2/3 !important;
        }
        
        @media (max-width: 767px) {
          body {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
            padding-top: 0 !important;
          }
          
          /* 모바일에서 헤더가 메인 이미지 위에 오도록 설정 */
          .header-container {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 100 !important;
            background-color: transparent !important;
          }
          
          header {
            position: relative !important;
            width: 100% !important;
            transform: none !important;
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            background-color: transparent !important;
            text-align: center !important;
          }
          
          /* 모바일 헤더 로고 스타일링 */
          header img, 
          header svg,
          header a > img,
          header a > svg {
            max-width: 120px !important;
            height: auto !important;
            margin: 0 auto !important;
            display: block !important;
            filter: drop-shadow(0 0 3px rgba(0,0,0,0.3)) !important;
          }
          
          /* 모바일 메뉴 버튼 스타일링 */
          header button, 
          header a[role="button"] {
            background-color: transparent !important;
            filter: drop-shadow(0 0 3px rgba(0,0,0,0.3)) !important;
          }
          
          /* 모바일에서 네비게이션 메뉴가 있다면 가운데 정렬 */
          header nav,
          header ul,
          header ol,
          header div > ul,
          header div > ol {
            display: flex !important;
            justify-content: center !important;
            margin: 0 auto !important;
            background-color: transparent !important;
          }
          
          .main-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            overflow-x: hidden;
            padding: 0 !important;
            margin: 0 !important;
          }
          
          .content-container {
            margin-top: 0;
            background-color: #f9fafb; /* gray-50 */
            position: relative;
            z-index: 2;
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            overflow-x: hidden;
          }
        }
      `}</style>
    </div>
  );
}