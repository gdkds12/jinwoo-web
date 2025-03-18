"use client";
import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  FaChurch, 
  FaClock, 
  FaNewspaper, 
  FaMapMarkerAlt, 
  FaHandHoldingHeart,
  FaGraduationCap,
  FaVideo,
  FaHistory,
  FaEye,
  FaUsers,
  FaUserTie,
  FaUserGraduate,
  FaUserFriends,
  FaBuilding,
  FaPhone,
  FaSitemap
} from "react-icons/fa";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuDrawer = ({ isOpen, onClose }: MenuDrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    {
      title: "주요 메뉴",
      items: [
        { name: "예배 시간", icon: FaClock, href: "/worship-time" },
        { name: "주보", icon: FaNewspaper, href: "/bulletin" },
        { name: "오시는 길", icon: FaMapMarkerAlt, href: "/location" },
        { name: "헌금안내", icon: FaHandHoldingHeart, href: "/offering" },
        { name: "교회학교", icon: FaGraduationCap, href: "/sunday-school" },
        { name: "미디어", icon: FaVideo, href: "/media" },
      ],
    },
    {
      title: "교회 안내",
      items: [
        { name: "역사", icon: FaHistory, href: "/history" },
        { name: "비전", icon: FaEye, href: "/vision" },
      ],
    },
    {
      title: "섬기는 사람들",
      items: [
        { name: "담임 목사", icon: FaUserTie, href: "/pastor" },
        { name: "장로", icon: FaUserGraduate, href: "/elders" },
        { name: "권사", icon: FaUsers, href: "/deaconesses" },
        { name: "집사", icon: FaUserFriends, href: "/deacons" },
      ],
    },
    {
      title: "교회 정보",
      items: [
        { name: "교회 시설", icon: FaBuilding, href: "/facilities" },
        { name: "교회 전화번호", icon: FaPhone, href: "/contact" },
        { name: "교회 부서", icon: FaSitemap, href: "/departments" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0,
      transition: {
        type: "tween",
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { x: "100%" }
  };

  const itemVariants = {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-white z-50 overflow-y-auto"
        >
          <motion.div 
            variants={itemVariants}
            className="p-4 sticky top-0 bg-white z-10 relative"
          >
            <div className="flex items-center justify-center">
              <button onClick={onClose} className="absolute left-2 p-2">
                <IoIosArrowBack className="text-2xl" />
              </button>
              <h2 className="text-xl font-semibold">메뉴</h2>
            </div>
          </motion.div>
          
          <div className="p-4">
            {menuItems.map((section, sectionIndex) => (
              <motion.div 
                key={sectionIndex} 
                className="mb-6"
                variants={itemVariants}
              >
                <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      variants={itemVariants}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={onClose}
                      >
                        <div className="w-8 h-8 bg-[#F2F2F2] rounded-md flex items-center justify-center mr-3">
                          <item.icon className="text-black" />
                        </div>
                        <span className="text-black font-semibold">{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuDrawer; 