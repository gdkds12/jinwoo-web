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

export const GallerySection: React.FC<GallerySectionProps> = ({ isOverlay = false, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("전체");
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  const years = useMemo(() => Array.from(new Set(galleryData.map(image => image.year))).sort((a, b) => Number(b) - Number(a)), []);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setCurrentImage(image);
  };

  const closeFullScreen = () => {
    setSelectedImage(null);
    if (onClose) {
      onClose();
    }
  };

  const nextImage = useCallback(() => {
    if (!currentImage) return;
    const currentIndex = galleryData.findIndex(img => img.id === currentImage.id);
    const nextIndex = (currentIndex + 1) % galleryData.length;
    setCurrentImage(galleryData[nextIndex]);
  }, [currentImage]);

  const prevImage = useCallback(() => {
    if (!currentImage) return;
    const currentIndex = galleryData.findIndex(img => img.id === currentImage.id);
    const prevIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    setCurrentImage(galleryData[prevIndex]);
  }, [currentImage]);

  const scrollToYear = (year: string) => {
    setSelectedYear(year);
    const imageElement = thumbnailContainerRef.current?.querySelector(`[data-year='${year}']`);
    if (imageElement) {
      imageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };
  
  useEffect(() => {
    if (currentImage && thumbnailContainerRef.current) {
      const imageElement = thumbnailContainerRef.current.querySelector(`[data-id='${currentImage.id}']`);
      if (imageElement) {
        imageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentImage]);


  const openGallery = () => {
    const event = new CustomEvent('showGallery');
    document.dispatchEvent(event);
  };

  const GalleryList = () => (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">교회 갤러리</h2>
        <button onClick={onClose} className="p-2">
          <IoIosClose size={24} />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryData.map((image) => (
          <motion.div
            key={image.id}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => handleImageClick(image)}
            layoutId={`gallery-image-${image.id}`}
          >
            <Image
              src={image.imageUrl}
              alt={image.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-2">
              <p className="text-white text-xs font-semibold">{image.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const FullScreenViewer = () => (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center relative" onClick={closeFullScreen}>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImage?.id}
            className="w-full h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {currentImage && (
               <Image
                src={currentImage.imageUrl}
                alt={currentImage.title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
       {/* UI 요소 */}
       <div className="absolute inset-0 pointer-events-none">
          <AnimatePresence initial={false}>
            {currentImage && (
              <>
                {/* 상단 헤더 */}
                <motion.div
                  className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between pointer-events-auto"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-white">
                    <h3 className="font-bold">{currentImage.title}</h3>
                    <div className="flex items-center text-sm">
                      <IoMdCalendar className="mr-1" />
                      <span>{currentImage.date}</span>
                    </div>
                  </div>
                  <button
                    onClick={closeFullScreen}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                  >
                    <IoIosClose size={24} />
                  </button>
                </motion.div>
                
                {/* 좌우 이동 버튼 */}
                <motion.button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors pointer-events-auto"
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoIosArrowBack size={24} />
                </motion.button>
                
                <motion.button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors pointer-events-auto"
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
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
                            onClick={(e) => { e.stopPropagation(); scrollToYear(year); }}
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
                        data-id={image.id}
                        data-year={image.year}
                        onClick={(e) => { e.stopPropagation(); setCurrentImage(image); setSelectedYear(image.year); }}
                        className={`flex-shrink-0 w-16 h-16 relative rounded-md overflow-hidden cursor-pointer ${
                          currentImage?.id === image.id
                            ? 'ring-2 ring-white'
                            : 'ring-1 ring-white/30'
                        }`}
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

  if (isOverlay) {
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
        <AnimatePresence>
          {selectedImage ? <FullScreenViewer /> : <GalleryList />}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.div 
      className="w-full mt-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">교회 갤러리</h2>
          <button 
            onClick={openGallery}
            className="text-sm font-medium text-blue-500 hover:text-blue-600"
          >
            더보기
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryData.slice(0, 8).map((image, index) => (
            <motion.div
              key={image.id}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={openGallery}
            >
              <Image
                src={image.imageUrl}
                alt={image.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-2">
                <p className="text-white text-xs font-semibold">{image.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GallerySection;