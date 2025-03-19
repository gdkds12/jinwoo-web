"use client";
// app/page.tsx
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MainBanner } from "./components/MainBanner";
import { WordSection } from "./components/WordSection";
import { MenuSection } from "./components/MenuSection";
import { NoticeSection } from "./components/NoticeSection";
import { GallerySection } from "./components/GallerySection";
import ChurchBulletin from "./components/ChurchBulletin";
import WorshipTime from "./components/WorshipTime";
import ChurchLocation from "./components/ChurchLocation";
import OfferingGuide from "./components/OfferingGuide";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [showBulletin, setShowBulletin] = useState(false);
  const [showWorshipTime, setShowWorshipTime] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showOffering, setShowOffering] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 공지사항 이벤트 상태 확인
    const checkNoticeEventQueuedInStorage = () => {
      if (localStorage.getItem('noticeEventQueued') === 'true') {
        localStorage.removeItem('noticeEventQueued');
        setTimeout(() => {
          const event = new CustomEvent('openNoticeFullScreen');
          document.dispatchEvent(event);
        }, 500);
      }
    };
    
    // 주보 이벤트 처리를 위한 이벤트 리스너 등록
    const handleShowBulletin = () => {
      setShowBulletin(true);
    };

    // 예배 시간 이벤트 처리를 위한 이벤트 리스너 등록
    const handleShowWorshipTime = () => {
      setShowWorshipTime(true);
    };

    // 오시는 길 이벤트 처리를 위한 이벤트 리스너 등록
    const handleShowLocation = () => {
      setShowLocation(true);
    };

    // 헌금 안내 이벤트 처리를 위한 이벤트 리스너 등록
    const handleShowOffering = () => {
      setShowOffering(true);
    };

    // 갤러리 이벤트 처리를 위한 이벤트 리스너 등록
    const handleShowGallery = () => {
      setShowGallery(true);
    };

    document.addEventListener('showBulletin', handleShowBulletin);
    document.addEventListener('showWorshipTime', handleShowWorshipTime);
    document.addEventListener('showLocation', handleShowLocation);
    document.addEventListener('showOffering', handleShowOffering);
    document.addEventListener('showGallery', handleShowGallery);
    
    // 페이지 로드 시 body 스타일 설정
    document.body.style.backgroundColor = "#F2F2F2";
    
    // 페이지 로드 완료 후 확인
    if (document.readyState === 'complete') {
      checkNoticeEventQueuedInStorage();
    } else {
      window.addEventListener('load', checkNoticeEventQueuedInStorage);
    }
    
    return () => {
      // 컴포넌트 언마운트 시 스타일 초기화 및 이벤트 리스너 제거
      document.body.style.backgroundColor = "";
      window.removeEventListener('load', checkNoticeEventQueuedInStorage);
      document.removeEventListener('showBulletin', handleShowBulletin);
      document.removeEventListener('showWorshipTime', handleShowWorshipTime);
      document.removeEventListener('showLocation', handleShowLocation);
      document.removeEventListener('showOffering', handleShowOffering);
      document.removeEventListener('showGallery', handleShowGallery);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <Header />
      
      {/* 공지사항 컴포넌트를 미리 로드 (화면에는 표시되지 않음) */}
      <div style={{ display: "none" }}>
        <NoticeSection />
      </div>
      
      <main className="w-full max-w-6xl mx-auto pt-2">
        <MainBanner />
        <MenuSection />
        <WordSection />
        <NoticeSection />
        <GallerySection />
        
        {/* 여기에 다른 섹션 추가 */}
        
      </main>
      
      <Footer />

      <AnimatePresence mode="wait">
        {showBulletin && (
          <ChurchBulletin key="church-bulletin" onClose={() => setShowBulletin(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showWorshipTime && (
          <WorshipTime key="worship-time" onClose={() => setShowWorshipTime(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showLocation && (
          <ChurchLocation key="church-location" onClose={() => setShowLocation(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showOffering && (
          <OfferingGuide key="offering-guide" onClose={() => setShowOffering(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showGallery && (
          <GallerySection key="gallery-section" isOverlay={true} onClose={() => setShowGallery(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}