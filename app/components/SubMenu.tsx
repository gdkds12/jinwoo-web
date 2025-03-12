"use client";
import Link from "next/link";
import { useRef, useLayoutEffect, useState, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from 'react';

interface SubMenuProps {
  menuData: { [key: string]: string[] };
  className?: string;
  onHoverChange: (isHovered: boolean) => void;
  cardMode?: boolean;
  menuItemKey: string;
  menuRef: HTMLDivElement | null;
  containerRef: RefObject<HTMLDivElement | null>;
  isEmpty?: boolean; // 추가: 빈 메뉴 항목인지 나타내는 prop
}

export const SubMenu: React.FC<SubMenuProps> = ({
  menuData,
  className,
  onHoverChange,
  cardMode,
  menuItemKey,
  menuRef,
  containerRef,
  isEmpty // 추가
}) => {
  const subMenuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isMounted, setIsMounted] = useState(true);

  useLayoutEffect(() => {
    if (menuRef && subMenuRef.current && containerRef.current) {
      const menuRect = menuRef.getBoundingClientRect();
      const subMenuRect = subMenuRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const top = menuRect.bottom - containerRect.top;
      const left =
        menuRect.left +
        menuRect.width / 2 -
        subMenuRect.width / 2 -
        containerRect.left;

      setPosition({ top, left });
    }
  }, [menuRef, subMenuRef, menuItemKey, containerRef]);

    const handleMouseLeaveWithAnimation = () => {
        setIsMounted(false)
    }

    const lineVariants = {
        hidden: { scaleX: 0, originX: 0.5 },
        visible: { scaleX: 1, originX: 0.5, transition: { duration: 0.3, ease: "easeInOut" } },
        exit: { scaleX: 0, originX: 0.5, transition: { duration: 0.2, ease: "easeInOut" } }
    };


  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          className={`bg-white/80 backdrop-blur-md shadow-lg absolute rounded-2xl ${
            cardMode ? "w-auto" : "left-0 right-0"
          } ${className} ${isEmpty ? 'invisible' : ''}`} // 추가: isEmpty일 때 invisible 클래스 추가

          style={{ top: position.top, left: position.left, originY: 0, zIndex: 30 }}
          onMouseEnter={() => onHoverChange(true)}
          onMouseLeave={() => {
            handleMouseLeaveWithAnimation();
            onHoverChange(false)
          }}
          ref={subMenuRef}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded-t-xl"
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
           {/* 내용 렌더링 부분 변경 */}
          {!isEmpty && ( // isEmpty가 false일 때만 내용 렌더링
            <div
              className={`${
                cardMode ? "" : "max-w-[1400px] mx-auto"
              } px-4 py-4 flex flex-wrap gap-4 pt-5`}
            >
            {Object.entries(menuData).map(([mainMenuItem, subMenuItems]) => (
                <div
                  key={mainMenuItem}
                  className={`flex flex-col ${
                    cardMode ? "p-8" : ""
                  } items-center justify-center w-full`}
                >
                  <h4 className="font-bold text-gray-700 mb-4">
                    {cardMode ? "" : mainMenuItem}
                  </h4>
                  <div className="flex flex-col w-full">
                    {subMenuItems.map((item, index) => (
                      <React.Fragment key={item}>
                        <Link
                          href={"#"}
                          className="text-gray-700 hover:text-blue-500 hover:underline whitespace-nowrap py-3 w-full text-center"
                        >
                          {item}
                        </Link>
                        {index < subMenuItems.length - 1 && (
                          <motion.div
                            className="w-full h-px bg-gray-800"
                            variants={lineVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};