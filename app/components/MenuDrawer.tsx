"use client";
import React, { useEffect, useRef } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  FaClock, 
  FaNewspaper, 
  FaMapMarkerAlt, 
  FaHandHoldingHeart,
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
import { IconType } from "react-icons";
import { ThemeToggle } from "./ThemeToggle";

interface MenuItem {
  title: string;
  href: string;
  icon?: IconType;
  onClick?: () => void;
  subItems?: {
    title: string;
    href: string;
    icon?: IconType;
    onClick?: () => void;
  }[];
}

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuDrawer = ({ isOpen, onClose }: MenuDrawerProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const handleTouchMove = (e: React.TouchEvent) => {
    const menuElement = menuRef.current;
    if (!menuElement) return;

    const { scrollTop, scrollHeight, clientHeight } = menuElement;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    if ((isAtTop && e.touches[0].clientY > 0) || 
        (isAtBottom && e.touches[0].clientY < 0)) {
      e.preventDefault();
    }
  };

  const handleShowWorshipTime = () => {
    onClose();
    const event = new CustomEvent('showWorshipTime');
    document.dispatchEvent(event);
  };

  const handleShowBulletin = () => {
    onClose();
    const event = new CustomEvent('showBulletin');
    document.dispatchEvent(event);
  };

  const handleShowLocation = () => {
    onClose();
    const event = new CustomEvent('showLocation');
    document.dispatchEvent(event);
  };

  const handleShowOffering = () => {
    onClose();
    const event = new CustomEvent('showOffering');
    document.dispatchEvent(event);
  };

  const menuItems: MenuItem[] = [
    {
      title: "주요 메뉴",
      href: "/",
      subItems: [
        { title: "예배 시간", href: "/worship-time", icon: FaClock, onClick: handleShowWorshipTime },
        { title: "교회 소식", href: "/bulletin", icon: FaNewspaper, onClick: handleShowBulletin },
        { title: "오시는 길", href: "/location", icon: FaMapMarkerAlt, onClick: handleShowLocation },
        { title: "헌금 안내", href: "/offering", icon: FaHandHoldingHeart, onClick: handleShowOffering },
      ],
    },
    {
      title: "교회 안내",
      href: "/about",
      subItems: [
        { title: "역사", href: "/about?section=history", icon: FaHistory },
        { title: "비전", href: "/about?section=vision", icon: FaEye },
      ],
    },
    {
      title: "섬기는 사람들",
      href: "/ministry",
      subItems: [
        { title: "담임 목사", href: "/ministry?section=pastors", icon: FaUserTie },
        { title: "원로 목사", href: "/ministry?section=seniorpastors", icon: FaUserTie },
        { title: "장로", href: "/ministry?section=elders", icon: FaUserGraduate },
        { title: "권사", href: "/ministry?section=deaconesses", icon: FaUserFriends },
        { title: "집사", href: "/ministry?section=deacons", icon: FaUsers },
      ],
    },
    {
      title: "교회 정보",
      href: "/info",
      subItems: [
        { title: "교회 시설", href: "/info?section=facilities", icon: FaBuilding },
        { title: "교회 전화번호", href: "/info?section=contact", icon: FaPhone },
        { title: "교회 부서", href: "/info?section=departments", icon: FaSitemap },
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
          ref={menuRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-white dark:bg-dark z-50 overflow-y-auto overscroll-none flex justify-center"
          style={{ 
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y'
          }}
          onTouchMove={handleTouchMove}
        >
          <div className="w-full max-w-[720px]">
            <motion.div 
              variants={itemVariants}
              className="p-4 sticky top-0 bg-white dark:bg-dark z-10 relative"
            >
              <div className="flex items-center justify-center">
                <button onClick={onClose} className="absolute left-2 p-2">
                  <IoIosArrowBack className="text-2xl dark:text-white" />
                </button>
                <h2 className="text-xl font-semibold dark:text-white">메뉴</h2>
              </div>
            </motion.div>
            
            <div className="p-4 pb-24">
              <motion.div 
                variants={itemVariants}
                className="mb-6 flex justify-end"
              >
                <ThemeToggle />
              </motion.div>
              
              {menuItems.map((section, sectionIndex) => (
                <motion.div 
                  key={sectionIndex} 
                  className="mb-6"
                  variants={itemVariants}
                >
                  <h3 className="text-2xl font-semibold mb-4 pl-2 dark:text-white">{section.title}</h3>
                  <div className="space-y-2">
                    {section.subItems?.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        variants={itemVariants}
                      >
                        {item.onClick ? (
                          <div
                            className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors cursor-pointer"
                            onClick={item.onClick}
                          >
                            <div className="w-8 h-8 bg-[#F9F9F9] dark:bg-dark-700 rounded-md flex items-center justify-center mr-3">
                              {item.icon && <item.icon className="text-black dark:text-white" />}
                            </div>
                            <span className="text-black dark:text-white font-semibold">{item.title}</span>
                          </div>
                        ) : (
                          <Link
                            href={item.href}
                            className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
                            onClick={onClose}
                          >
                            <div className="w-8 h-8 bg-[#F9F9F9] dark:bg-dark-700 rounded-md flex items-center justify-center mr-3">
                              {item.icon && <item.icon className="text-black dark:text-white" />}
                            </div>
                            <span className="text-black dark:text-white font-semibold">{item.title}</span>
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuDrawer;