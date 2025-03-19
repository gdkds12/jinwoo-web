// app/components/GallerySection.tsx
"use client";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { IoIosArrowForward, IoIosArrowBack, IoMdCalendar, IoIosClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// 갤러리 이미지 인터페이스
interface GalleryImage {
  id: number;
  title: string;
  date: string;
  year: string;
  imageUrl: string;
}

// props 인터페이스 추가
interface GallerySectionProps {
  onClose?: () => void;
  isOverlay?: boolean;
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

export const GallerySection = ({ onClose, isOverlay = false }: GallerySectionProps = {}) => {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
  const [hideUI, setHideUI] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
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
  const resetImagePosition = useCallback(() => {
    setZoomLevel(1);
  }, []);
  
  const toggleFullScreen = useCallback((image?: GalleryImage) => {
    if (!showFullScreen) {
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
  }, [showFullScreen, resetImagePosition]);
  
  const toggleUI = useCallback(() => {
    setHideUI(!hideUI);
  }, [hideUI]);
  
  const prevImage = useCallback(() => {
    if (!currentImage) return;
    
    const currentIndex = galleryData.findIndex(img => img.id === currentImage.id);
    const prevIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    setCurrentImage(galleryData[prevIndex]);
    setSelectedYear(galleryData[prevIndex].year);
  }, [currentImage]);
  
  const nextImage = useCallback(() => {
    if (!currentImage) return;
    
    const currentIndex = galleryData.findIndex(img => img.id === currentImage.id);
    const nextIndex = (currentIndex + 1) % galleryData.length;
    setCurrentImage(galleryData[nextIndex]);
    setSelectedYear(galleryData[nextIndex].year);
  }, [currentImage]);

  const scrollToYear = useCallback((year: string) => {
    if (thumbnailContainerRef.current && selectedYear !== year) {
      const yearElements = thumbnailContainerRef.current.querySelectorAll(`[data-year="${year}"]`);
      if (yearElements.length > 0) {
        const firstYearElement = yearElements[0] as HTMLElement;
        thumbnailContainerRef.current.scrollLeft = firstYearElement.offsetLeft - 16;
      }
      setSelectedYear(year);
    }
  }, [selectedYear]);
  
  // 스크롤 이벤트 처리
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!showFullScreen) return;
    e.preventDefault();
    
    // 가로 스크롤(deltaX)이 있으면 그것을 우선 사용, 없으면 세로 스크롤(deltaY) 사용
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    
    if (delta > 0) {
      nextImage();
    } else if (delta < 0) {
      prevImage();
    }
  }, [showFullScreen, nextImage, prevImage]);
  
  useEffect(() => {
    const checkImagesLoaded = () => {
      // ... existing code ...
    };
    
    checkImagesLoaded();
    
    // 이벤트 리스너 등록
    const currentContainerRef = containerRef.current;
    
    if (currentContainerRef) {
      currentContainerRef.addEventListener('wheel', handleWheel);
    }
    
    // 정리 함수
    return () => {
      if (currentContainerRef) {
        currentContainerRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleWheel]);

  useEffect(() => {
    if (showFullScreen) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setShowFullScreen(false);
        } else if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [showFullScreen, currentImage]);

  // 갤러리 리스트 컴포넌트
  const GalleryList = () => (
    <motion.div 
      className={`w-full ${isOverlay ? 'h-full bg-white overflow-auto' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isOverlay && (
        <div className="sticky top-0 bg-white z-10 p-4 flex items-center justify-center">
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors absolute left-2"
          >
            <IoIosClose size={24} />
          </button>
          <h2 className="text-2xl font-bold">갤러리</h2>
        </div>
      )}
      
      <div className="p-4">
        {years.map((year) => (
          <div key={year} className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">{year}년</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {imagesByYear[year].map((image) => (
                <motion.div
                  key={image.id}
                  className="cursor-pointer overflow-hidden rounded-md relative aspect-square bg-gray-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFullScreen(image)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="text-white text-sm font-medium">{image.title}</div>
                    <div className="text-white/80 text-xs">{image.date}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  if (isOverlay) {
    return (
      <div className="fixed inset-0 z-50">
        {/* 고정 배경 레이어 - 항상 불투명하게 유지 */}
        <div className="absolute inset-0 bg-white" />
        
        <motion.div 
          className="relative w-full h-full overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {showFullScreen ? (
            <FullScreenViewer />
          ) : (
            <GalleryList />
          )}
        </motion.div>
      </div>
    );
  }

  // 일반 갤러리 섹션 컴포넌트 (메인 페이지 내에 표시될 때)
  return (
    <>
      <motion.div
        className="w-full pt-4 pb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center px-4 mb-4">
          <h2 className="text-2xl font-semibold">갤러리</h2>
          <button 
            className="text-sm text-gray-500 flex items-center"
            onClick={() => {
              if (onClose) {
                const event = new CustomEvent('showGallery');
                document.dispatchEvent(event);
              }
            }}
          >
            <IoIosArrowForward className="text-xl text-black" />
          </button>
        </div>
        
        {/* 갤러리 미리보기 - 최신 이미지 6개만 표시 */}
        <div className="px-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {galleryData.slice(0, 6).map((image) => (
            <motion.div
              key={image.id}
              className="cursor-pointer overflow-hidden rounded-md relative aspect-square bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleFullScreen(image)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image.imageUrl}
                alt={image.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-white text-xs font-medium">{image.title}</div>
                <div className="text-white/80 text-xxs">{image.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {showFullScreen && <FullScreenViewer />}
    </>
  );

  // 전체 화면 갤러리 뷰어 컴포넌트
  function FullScreenViewer() {
    useEffect(() => {
      // 스크롤 방지
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }, []);

    return (
      <div className="fixed inset-0 bg-black z-50">
        {/* 이미지 컨테이너 */}
        <div 
          className="h-full w-full flex items-center justify-center"
          onClick={toggleUI}
        >
          {currentImage && (
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src={currentImage.imageUrl}
                alt={currentImage.title}
                ref={imageRef}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          )}
        </div>
        
        {/* UI 요소 */}
        <div className="absolute inset-0 pointer-events-none">
          <AnimatePresence initial={false}>
            {!hideUI && (
              <>
                {/* 상단 헤더 */}
                <motion.div
                  className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between pointer-events-auto"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentImage && (
                    <div className="text-white">
                      <h3 className="font-bold">{currentImage.title}</h3>
                      <div className="flex items-center text-sm">
                        <IoMdCalendar className="mr-1" />
                        <span>{currentImage.date}</span>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setShowFullScreen(false);
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                  >
                    <IoIosClose size={24} />
                  </button>
                </motion.div>
                
                {/* 좌우 이동 버튼 */}
                <motion.button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors pointer-events-auto"
                  onClick={prevImage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoIosArrowBack size={24} />
                </motion.button>
                
                <motion.button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors pointer-events-auto"
                  onClick={nextImage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoIosArrowForward size={24} />
                </motion.button>
                
                {/* 하단 썸네일 */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent pointer-events-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  {years.length > 0 && (
                    <div className="mb-3">
                      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                        {years.map((year) => (
                          <button
                            key={year}
                            onClick={() => scrollToYear(year)}
                            className={`px-3 py-1 rounded-full text-sm ${
                              selectedYear === year
                                ? 'bg-white text-black'
                                : 'bg-black/40 text-white'
                            }`}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div
                    ref={thumbnailContainerRef}
                    className="flex gap-2 overflow-x-auto scrollbar-hide"
                  >
                    {galleryData.map((image) => (
                      <div
                        key={image.id}
                        onClick={() => {
                          setCurrentImage(image);
                          setSelectedYear(image.year);
                        }}
                        className={`flex-shrink-0 w-16 h-16 relative rounded-md overflow-hidden cursor-pointer ${
                          currentImage?.id === image.id
                            ? 'ring-2 ring-white'
                            : 'ring-1 ring-white/30'
                        }`}
                        data-year={image.year}
                      >
                        <Image
                          src={image.imageUrl}
                          alt={image.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
};

export default GallerySection;