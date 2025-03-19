"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export const Menu = () => {
  const handleShowWorshipTime = () => {
    const event = new CustomEvent('showWorshipTime');
    document.dispatchEvent(event);
  };

  const handleShowBulletin = () => {
    const event = new CustomEvent('showBulletin');
    document.dispatchEvent(event);
  };

  const handleShowLocation = () => {
    const event = new CustomEvent('showLocation');
    document.dispatchEvent(event);
  };

  const handleShowOffering = () => {
    const event = new CustomEvent('showOffering');
    document.dispatchEvent(event);
  };

  const menuItems = [
    { text: "예배 시간", onClick: handleShowWorshipTime },
    { text: "주보", onClick: handleShowBulletin },
    { text: "오시는 길", onClick: handleShowLocation },
    { text: "헌금안내", onClick: handleShowOffering },
    { 
      text: "교회 안내", 
      href: "/about",
      subItems: [
        { text: "역사", href: "/about?section=history" },
        { text: "비전", href: "/about?section=vision" }
      ]
    },
    { 
      text: "섬기는 사람", 
      href: "/ministry",
      subItems: [
        { text: "담임 목사", href: "/ministry?section=pastors" },
        { text: "장로", href: "/ministry?section=elders" },
        { text: "권사", href: "/ministry?section=deaconesses" },
        { text: "집사", href: "/ministry?section=deacons" }
      ]
    },
    { 
      text: "교회 정보", 
      href: "/ministry",
      subItems: [
        { text: "교회 시설", href: "/ministry?section=facilities" },
        { text: "교회 전화번호", href: "/ministry?section=contact" },
        { text: "교회 부서", href: "/ministry?section=departments" }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8">메뉴</h2>
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <div key={index}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer"
                onClick={item.onClick}
              >
                <span className="text-lg">{item.text}</span>
                {item.href && (
                  <Link href={item.href} className="flex items-center">
                    <IoIosArrowForward className="text-xl" />
                  </Link>
                )}
              </motion.div>
              {item.subItems && (
                <div className="ml-4 mt-2 space-y-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <motion.div
                      key={subIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: (index + subIndex) * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer"
                    >
                      <Link href={subItem.href} className="flex items-center w-full justify-between">
                        <span className="text-base">{subItem.text}</span>
                        <IoIosArrowForward className="text-lg" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu; 