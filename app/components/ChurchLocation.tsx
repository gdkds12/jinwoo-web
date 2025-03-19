"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { FaMapMarkerAlt, FaSubway, FaBus, FaCar } from "react-icons/fa";

type ChurchLocationProps = {
  onClose: () => void;
};

// 교회 위치 정보
const locationData = {
  address: "경기 광주시 도척면 저수지길 25-13",
  coordinates: "37.3456, 127.1234", // 가상의 좌표값 (실제 교회 위치에 맞게 수정 필요)
  transportation: [
    { 
      type: "지하철", 
      icon: <FaSubway />, 
      description: "OO역에서 하차 후 OO번 버스 환승" 
    },
    { 
      type: "버스", 
      icon: <FaBus />, 
      description: "OO번, OO번 버스 이용 → OO정류장 하차 → 도보 5분" 
    },
    { 
      type: "자가용", 
      icon: <FaCar />, 
      description: "네비게이션에 '진우교회' 또는 주소 입력" 
    }
  ],
  parkingInfo: "교회 내 주차장 이용 가능 (30대 주차 가능)"
};

export const ChurchLocation: React.FC<ChurchLocationProps> = ({ onClose }) => {
  const locationVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "100%", opacity: 0 }
  };

  useEffect(() => {
    // 오버레이가 열릴 때 body 스크롤 방지
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.top = '0';
    
    return () => {
      // 컴포넌트가 언마운트될 때 body 스크롤 복구
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 bg-white z-[60] overflow-hidden"
      initial="closed"
      animate="open"
      exit="closed"
      variants={locationVariants}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-5">
          <div 
            className="w-10 h-10 flex items-center cursor-pointer"
            onClick={onClose}
          >
            <IoIosArrowBack size={20} className="text-gray-600" />
          </div>
          <h1 className="text-xl font-bold">오시는 길</h1>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-5">
          <motion.div
            className="mt-4 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 주소 및 지도 섹션 */}
            <motion.div
              className="rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-4 bg-blue-50 rounded-t-lg">
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-blue-600 mr-2" size={18} />
                  <h3 className="text-lg font-bold text-blue-700">교회 주소</h3>
                </div>
                <p className="text-gray-700 font-medium">{locationData.address}</p>
              </div>
              
              {/* 지도 영역 - 실제 지도 API를 연동하거나 이미지로 대체할 수 있음 */}
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">지도가 표시될 영역입니다.</p>
              </div>
            </motion.div>

            {/* 교통편 안내 */}
            <motion.div
              className="rounded-lg p-4 bg-gray-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold mb-4 border-b pb-2">교통편 안내</h3>
              <div className="space-y-4">
                {locationData.transportation.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-8 h-8 flex items-center justify-center text-gray-600 mr-3 mt-1">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.type}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 주차 안내 */}
            <motion.div
              className="rounded-lg p-4 bg-gray-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg font-bold mb-2">주차 안내</h3>
              <p className="text-gray-700">{locationData.parkingInfo}</p>
            </motion.div>

            {/* 문의 안내 */}
            <motion.div
              className="rounded-lg p-4 bg-blue-50 my-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-lg font-bold mb-2 text-blue-700">오시는 길 문의</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                교회 오시는 길에 대해 더 자세한 안내가 필요하시면 교회 사무실(000-000-0000)로 연락주시기 바랍니다.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChurchLocation; 