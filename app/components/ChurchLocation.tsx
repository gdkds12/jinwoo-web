"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { FaMapMarkerAlt, FaSubway, FaBus, FaCar } from "react-icons/fa";

type ChurchLocationProps = {
  onClose: () => void;
};

// 교회 위치 정보
const locationData = {
  address: "경기 광주시 도척면 저수지길 25-13",
  coordinates: [37.321144, 127.338866], // 사용자가 제공한 좌표로 수정
  transportation: [
    { 
      type: "지하철", 
      icon: <FaSubway />, 
      description: "곤지암역에서 하차"
    },
    { 
      type: "버스", 
      icon: <FaBus />, 
      description: "37-2, 37-21, 39-4, 37-32, 39-6 이용 -> 진우 삼거리, 진우 정미소 하차"
    },
    { 
      type: "자가용", 
      icon: <FaCar />, 
      description: "네비게이션에 '진우교회' 또는 주소 입력" 
    }
  ],
  parkingInfo: "교회 내 주차장 이용 가능"
};

export const ChurchLocation: React.FC<ChurchLocationProps> = ({ onClose }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstance = useRef<any>(null); // any 타입 유지 및 ESLint 규칙 비활성화

  const locationVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "100%", opacity: 0 }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.top = '0';

    const clientId = 'u4vz6uh1ol';
    const scriptId = `naver-maps-script-${clientId}`;

    const initMap = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const naver = (window as any).naver; // any 타입 유지 및 ESLint 규칙 비활성화
      if (naver && naver.maps && mapElement.current && !mapInstance.current) {
        try {
          const mapOptions = {
            center: new naver.maps.LatLng(locationData.coordinates[0], locationData.coordinates[1]),
            zoom: 17,
            zoomControl: true,
            zoomControlOptions: {
              position: naver.maps.Position.TOP_RIGHT,
            },
          };

          mapInstance.current = new naver.maps.Map(mapElement.current, mapOptions);

          new naver.maps.Marker({
            position: new naver.maps.LatLng(locationData.coordinates[0], locationData.coordinates[1]),
            map: mapInstance.current,
          });
          console.log("Naver Map initialized successfully.");

        } catch (error) {
            console.error("Error initializing Naver Map:", error);
        }
      } else if (!naver || !naver.maps) {
           console.warn("Naver maps object not ready yet.");
      } else if (!mapElement.current) {
           console.warn("Map container element not ready yet.");
      }
    };

    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        console.log("Naver Maps script loaded.");
        initMap();
      };
      script.onerror = () => {
          console.error("Failed to load Naver Maps script.");
      };
    } else {
      console.log("Naver Maps script already exists.");
      initMap();
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
        console.log('Naver Map instance destroyed.');
      }
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 bg-white dark:bg-dark z-[60] overflow-hidden flex justify-center"
      initial="closed"
      animate="open"
      exit="closed"
      variants={locationVariants}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
    >
      <div className="w-full max-w-[550px] md:max-w-[720px] h-full flex flex-col">
        <div className="flex items-center justify-between p-5">
          <div 
            className="w-10 h-10 flex items-center cursor-pointer"
            onClick={onClose}
          >
            <IoIosArrowBack size={20} className="text-gray-600 dark:text-gray-300" />
          </div>
          <h1 className="text-xl font-bold dark:text-white">오시는 길</h1>
          <div className="w-10"></div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-5">
          <motion.div
            className="mt-4 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-t-lg">
                <div className="flex items-center mb-2">
                  <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 mr-2" size={18} />
                  <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400">교회 주소</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">{locationData.address}</p>
              </div>
              
              <div ref={mapElement} className="w-full h-64 md:h-80 bg-gray-200"></div>
            </motion.div>

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

            <motion.div
              className="rounded-lg p-4 bg-gray-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg font-bold mb-2">주차 안내</h3>
              <p className="text-gray-700">{locationData.parkingInfo}</p>
            </motion.div>

            <motion.div
              className="rounded-lg p-4 bg-blue-50 my-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-lg font-bold mb-2 text-blue-700">오시는 길 문의</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                교회 오시는 길에 대해 더 자세한 안내가 필요하시면 교회 사무실(031-764-9730)로 연락주시기 바랍니다.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChurchLocation; 