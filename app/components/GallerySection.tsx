// app/components/GallerySection.tsx
"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { IoIosArrowForward, IoIosArrowBack, IoMdClose, IoMdCalendar } from "react-icons/io";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

// 갤러리 이미지 인터페이스
interface GalleryImage {
  id: number;
  title: string;
  date: string;
  year: string;
  imageUrl: string;
}

// 예시 갤러리 데이터 (더 많은 샘플과 다양한 연도)
const galleryData: GalleryImage[] = [
  {
    id: 1,
    title: "신년 예배",
    date: "2024.01.01",
    year: "2024",
    imageUrl: "/images/background/image3.jpg"
  },
  {
    id: 2,
    title: "봄 성경학교",
    date: "2024.03.10",
    year: "2024",
    imageUrl: "/images/background/image1.jpg"
  },
  {
    id: 3,
    title: "전교인 수련회",
    date: "2024.02.15",
    year: "2024",
    imageUrl: "/images/background/image4.jpg"
  },
  {
    id: 4,
    title: "봄맞이 교회 대청소",
    date: "2024.03.05",
    year: "2024",
    imageUrl: "/images/background/image2.jpg"
  },
  {
    id: 5,
    title: "성탄절 특별 예배",
    date: "2023.12.25",
    year: "2023",
    imageUrl: "/images/background/image5.jpg"
  },
  {
    id: 6,
    title: "추수감사절 행사",
    date: "2023.11.20",
    year: "2023",
    imageUrl: "/images/background/image6.jpg"
  },
  {
    id: 7,
    title: "가을 음악회",
    date: "2023.10.15",
    year: "2023",
    imageUrl: "/images/background/image3.jpg"
  },
  {
    id: 8,
    title: "여름 캠프",
    date: "2023.07.23",
    year: "2023",
    imageUrl: "/images/background/image2.jpg"
  },
  {
    id: 9,
    title: "부활절 예배",
    date: "2023.04.09",
    year: "2023",
    imageUrl: "/images/background/image4.jpg"
  },
  {
    id: 10,
    title: "성탄 축하 예배",
    date: "2022.12.25",
    year: "2022",
    imageUrl: "/images/background/image1.jpg"
  },
  {
    id: 11,
    title: "추수감사 나눔 행사",
    date: "2022.11.24",
    year: "2022",
    imageUrl: "/images/background/image6.jpg"
  },
  {
    id: 12,
    title: "가을 음악회",
    date: "2022.10.09",
    year: "2022",
    imageUrl: "/images/background/image5.jpg"
  },
  {
    id: 13,
    title: "새 예배당 입당 감사예배",
    date: "2022.06.05",
    year: "2022",
    imageUrl: "/images/background/image3.jpg"
  },
  {
    id: 14,
    title: "교회 창립 기념 행사",
    date: "2021.09.12",
    year: "2021",
    imageUrl: "/images/background/image2.jpg"
  },
  {
    id: 15,
    title: "여름 수련회",
    date: "2021.07.18",
    year: "2021",
    imageUrl: "/images/background/image5.jpg"
  }
];

export const GallerySection = () => {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hideUI, setHideUI] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const swipeThreshold = 50;
  
  const imagesByYear = useMemo(() => {
    const grouped: Record<string, GalleryImage[]> = {};
    galleryData.forEach(image => {
      if (!grouped[image.year]) {
        grouped[image.year] = [];
      }
      grouped[image.year].push(image);
    });
    return grouped;
  }, []);
  
  const years = useMemo(() => {
    return Object.keys(imagesByYear).sort((a, b) => Number(b) - Number(a));
  }, [imagesByYear]);
  
  // 이미지 위치 초기화
  const resetImagePosition = () => {
    setZoomLevel(1);
  };
  
  const toggleFullScreen = (image?: GalleryImage) => {
    if (!showFullScreen) {
      setScrollPosition(window.scrollY);
      if (image) {
        setCurrentImage(image);
        setSelectedYear(image.year);
      } else {
        setCurrentImage(galleryData[0]);
        setSelectedYear(galleryData[0].year);
      }
      resetImagePosition();
    }
    setShowFullScreen(!showFullScreen);
    setHideUI(false);
  };
  
  const toggleUI = () => {
    if (!isDragging) {
      setHideUI(!hideUI);
    }
  };
  
  const prevImage = () => {
    if (!currentImage) return;
    
    const currentIndex = galleryData.findIndex(img => img.id === currentImage.id);
    const prevIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    setCurrentImage(galleryData[prevIndex]);
    setSelectedYear(galleryData[prevIndex].year);
  };
  
  const nextImage = () => {
    if (!currentImage) return;
    
    const currentIndex = galleryData.findIndex(img => img.id === currentImage.id);
    const nextIndex = (currentIndex + 1) % galleryData.length;
    setCurrentImage(galleryData[nextIndex]);
    setSelectedYear(galleryData[nextIndex].year);
  };

  const scrollToYear = (year: string) => {
    if (thumbnailContainerRef.current && selectedYear !== year) {
      const yearElements = thumbnailContainerRef.current.querySelectorAll(`[data-year="${year}"]`);
      if (yearElements.length > 0) {
        const firstYearElement = yearElements[0] as HTMLElement;
        thumbnailContainerRef.current.scrollLeft = firstYearElement.offsetLeft - 16;
      }
      setSelectedYear(year);
    }
  };
  
  // 드래그 관련 함수들
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    if (info.offset.x > swipeThreshold) {
      prevImage();
    } else if (info.offset.x < -swipeThreshold) {
      nextImage();
    }
  };
  
  // 스크롤 이벤트 처리
  const handleWheel = (e: WheelEvent) => {
    if (!showFullScreen) return;
    e.preventDefault();
    
    // 가로 스크롤(deltaX)이 있으면 그것을 우선 사용, 없으면 세로 스크롤(deltaY) 사용
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    
    if (delta > 0) {
      nextImage();
    } else if (delta < 0) {
      prevImage();
    }
  };
  
  // 터치 이벤트 - 핀치 줌 완전 비활성화
  const handleTouchStart = (e: React.TouchEvent) => {
    // 핀치 줌은 완전히 비활성화 (두 손가락 터치 무시)
    if (e.touches.length > 1) {
      e.preventDefault();
      return;
    }
  };

  const handleDragClick = (e: React.MouseEvent) => {
    // 이미지 드래그 중이 아닐 때만 UI 토글
    if (!isDragging) {
      toggleUI();
    }
  };

  // 브라우저 기본 핀치 줌 비활성화
  useEffect(() => {
    // 메타 태그 추가
    const metaTag = document.createElement('meta');
    metaTag.name = 'viewport';
    metaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(metaTag);
    
    // 기본 터치 동작 방지 함수
    const preventPinchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    // 모든 터치 이벤트에 핸들러 등록 (passive: false로 설정하여 preventDefault 사용 가능)
    document.addEventListener('touchstart', preventPinchZoom, { passive: false });
    document.addEventListener('touchmove', preventPinchZoom, { passive: false });
    
    // 정리 함수
    return () => {
      document.removeEventListener('touchstart', preventPinchZoom);
      document.removeEventListener('touchmove', preventPinchZoom);
      document.head.removeChild(metaTag);
    };
  }, []);
  
  // 스크롤 이벤트 리스너 추가
  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => handleWheel(e);
    
    if (showFullScreen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
      
      // 스크롤 이벤트 리스너 직접 등록 (passive: false로 설정)
      window.addEventListener('wheel', wheelHandler, { passive: false });
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
      
      window.removeEventListener('wheel', wheelHandler);
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      window.removeEventListener('wheel', wheelHandler);
      
      if (showFullScreen) {
        window.scrollTo(0, scrollPosition);
      }
    };
  }, [showFullScreen, scrollPosition]);
  
  const containerVariants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0,
      transition: {
        type: "tween",
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: { x: "100%" }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // 계산된 드래그 제약 조건
  const calculateDragConstraints = () => {
    return { left: 0, right: 0, top: 0, bottom: 0 };
  };

  return (
    <motion.div 
      className="w-full mt-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="flex items-center justify-between px-4 mb-4"
        onClick={() => toggleFullScreen()}
      >
        <h2 className="text-2xl font-semibold cursor-pointer">갤러리</h2>
        <IoIosArrowForward className="text-xl cursor-pointer" />
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 px-4">
          {galleryData.slice(0, 2).map((image, index) => (
            <motion.div 
              key={image.id}
              className="flex-none w-[85%] aspect-[3/3.5] rounded-xl overflow-hidden relative cursor-pointer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={() => toggleFullScreen(image)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <img 
                src={image.imageUrl} 
                alt={image.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-lg font-medium">{image.title}</h3>
                <p className="text-white/70 text-sm">{image.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showFullScreen && (
          <motion.div 
            ref={containerRef}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[9999] bg-black flex flex-col w-screen h-screen touch-none"
          >
            {/* 이미지 뷰어 - 최하단 레이어 */}
            <div className="flex-1 relative overflow-hidden" onClick={handleDragClick}>
              {currentImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-center justify-center"
                    drag={false}
                    dragConstraints={calculateDragConstraints()}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    dragElastic={0}
                    dragTransition={{ power: 0 }}
                    onTouchStart={handleTouchStart}
                  >
                    <motion.img 
                      ref={imageRef}
                      src={currentImage.imageUrl} 
                      alt={currentImage.title} 
                      className="max-w-full max-h-full object-contain"
                      draggable="false"
                      animate={{ 
                        scale: 1,
                        x: 0,
                        y: 0
                      }}
                      transition={{
                        type: "tween",
                        duration: 0.2
                      }}
                    />
                  </motion.div>
                </div>
              )}
            </div>

            {/* 모든 UI 컨트롤 - 최상단 고정 레이어 */}
            <div className="absolute inset-0 z-50 pointer-events-none">
              {/* 헤더 UI */}
              <AnimatePresence>
                {!hideUI && (
                  <motion.div 
                    variants={cardVariants}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pointer-events-auto z-20"
                  >
                    <button onClick={() => toggleFullScreen()} className="p-2">
                      <IoIosArrowBack className="text-3xl text-white" />
                    </button>
                    <div className="flex items-center">
                      {currentImage && (
                        <span className="text-white text-sm mr-2">{currentImage.year}</span>
                      )}
                      <h1 className="text-xl font-semibold text-white">갤러리</h1>
                    </div>
                    <div className="w-10"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 이전/다음 버튼 */}
              <AnimatePresence>
                {!hideUI && (
                  <>
                    <motion.button 
                      onClick={prevImage} 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-auto z-20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoIosArrowBack className="text-4xl text-white" />
                    </motion.button>
                    <motion.button 
                      onClick={nextImage} 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-auto z-20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IoIosArrowForward className="text-4xl text-white" />
                    </motion.button>
                  </>
                )}
              </AnimatePresence>

              {/* 이미지 설명 하단 - 그라데이션 제거 */}
              <AnimatePresence>
                {!hideUI && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-[200px] left-0 right-0 p-4 pointer-events-auto z-20"
                  >
                    <div className="flex items-center">
                      <span className="text-white/80 text-xs">{currentImage?.date}</span>
                    </div>
                    <h3 className="text-white text-lg font-medium mt-1">{currentImage?.title}</h3>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 연도 선택 및 썸네일 영역 - 하단 고정 UI */}
              <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                <AnimatePresence>
                  {!hideUI && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 py-2 bg-black/40 backdrop-blur-sm flex items-center overflow-x-auto hide-scrollbar pointer-events-auto"
                    >
                      {years.map(year => (
                        <button
                          key={year}
                          onClick={() => scrollToYear(year)}
                          className={`flex-none px-3 py-1 mr-2 rounded-full text-sm transition-colors ${
                            selectedYear === year 
                              ? 'bg-white text-black font-medium' 
                              : 'bg-white/20 text-white'
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {!hideUI && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full bg-black/30 backdrop-blur-sm pointer-events-auto"
                    >
                      <div 
                        ref={thumbnailContainerRef}
                        className="flex overflow-x-auto pb-4 pt-4 px-4 custom-scrollbar"
                        style={{ scrollbarWidth: 'thin' }}
                      >
                        {years.map(year => (
                          <div key={year} className="flex-none">
                            <div 
                              data-year={year}
                              className="flex items-center mb-2 mr-4"
                            >
                              <IoMdCalendar className="text-white/70 mr-1" />
                              <span className="text-white/70 text-xs">{year}</span>
                            </div>
                            
                            <div className="flex gap-2">
                              {imagesByYear[year].map(image => (
                                <div 
                                  key={image.id}
                                  className={`flex-none w-16 h-16 rounded-md overflow-hidden ${
                                    currentImage?.id === image.id 
                                      ? 'ring-2 ring-white' 
                                      : 'opacity-70 hover:opacity-100 transition-opacity'
                                  }`}
                                  onClick={() => {
                                    setCurrentImage(image);
                                    resetImagePosition();
                                  }}
                                >
                                  <img 
                                    src={image.imageUrl} 
                                    alt={image.title} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                              <div className="w-4"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="px-4 pb-2 flex justify-center">
                        <div className="w-10 h-1 bg-white/30 rounded-full"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GallerySection;