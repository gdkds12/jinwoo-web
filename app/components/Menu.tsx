"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { FaClock, FaNewspaper, FaMapMarkerAlt, FaMoneyBillWave, FaSchool, FaPhotoVideo } from "react-icons/fa";
import { FaChurch, FaEye, FaPray, FaUsers, FaUserTie, FaBuilding, FaPhone, FaSitemap } from "react-icons/fa";

type MenuItemProps = {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onClick }) => {
  return (
    <motion.div 
      className="flex items-center py-3 cursor-pointer" 
      onClick={onClick}
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-8 h-8 flex items-center justify-center mr-4">
        {icon}
      </div>
      <span className="text-base font-medium">{text}</span>
    </motion.div>
  );
};

type MenuSectionProps = {
  title: string;
  items: {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
  }[];
};

const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div className="pl-2">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MenuItem 
              icon={item.icon} 
              text={item.text} 
              onClick={item.onClick}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const Menu = () => {
  const [isOpen] = useState(true);

  const handleShowWorshipTime = () => {
    const event = new CustomEvent('showWorshipTime');
    document.dispatchEvent(event);
  };

  const handleShowBulletin = () => {
    const event = new CustomEvent('showBulletin');
    document.dispatchEvent(event);
  };

  const mainMenuItems = [
    { 
      icon: <FaClock size={16} className="text-gray-600" />, 
      text: "예배 시간",
      onClick: handleShowWorshipTime
    },
    { 
      icon: <FaNewspaper size={16} className="text-gray-600" />, 
      text: "주보",
      onClick: handleShowBulletin
    },
    { icon: <FaMapMarkerAlt size={16} className="text-gray-600" />, text: "오시는 길" },
    { icon: <FaMoneyBillWave size={16} className="text-gray-600" />, text: "헌금 안내" },
    { icon: <FaSchool size={16} className="text-gray-600" />, text: "교회학교" },
    { icon: <FaPhotoVideo size={16} className="text-gray-600" />, text: "미디어" },
  ];

  const churchInfoItems = [
    { icon: <FaChurch size={16} className="text-gray-600" />, text: "역사" },
    { icon: <FaEye size={16} className="text-gray-600" />, text: "비전" },
  ];

  const peopleItems = [
    { icon: <FaPray size={16} className="text-gray-600" />, text: "담임 목사" },
    { icon: <FaUserTie size={16} className="text-gray-600" />, text: "장로" },
    { icon: <FaUsers size={16} className="text-gray-600" />, text: "권사" },
    { icon: <FaUsers size={16} className="text-gray-600" />, text: "집사" },
  ];

  const facilityInfoItems = [
    { icon: <FaBuilding size={16} className="text-gray-600" />, text: "교회 시설" },
    { icon: <FaPhone size={16} className="text-gray-600" />, text: "교회 전화번호" },
    { icon: <FaSitemap size={16} className="text-gray-600" />, text: "교회 부서" },
  ];

  const menuVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "100%", opacity: 0 }
  };

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 bottom-0 bg-white z-50 p-5 overflow-y-auto"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <div className="w-10 h-10 flex items-center cursor-pointer">
            <IoIosArrowBack size={20} className="text-gray-600" />
          </div>
        </Link>
        <h1 className="text-xl font-bold">메뉴</h1>
        <div className="w-10"></div> {/* 균형을 위한 빈 공간 */}
      </div>

      <div className="mt-4">
        <MenuSection title="주요 메뉴" items={mainMenuItems} />
        <MenuSection title="교회 안내" items={churchInfoItems} />
        <MenuSection title="섬기는 사람들" items={peopleItems} />
        <MenuSection title="교회 정보" items={facilityInfoItems} />
      </div>
    </motion.div>
  );
};

export default Menu; 