// components/SubMenu.tsx
"use client";
import Link from "next/link";
import { useRef, useLayoutEffect, useState, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SubMenuProps {
  menuData: { [key: string]: string[] };
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  cardMode?: boolean;
  menuItemKey: string;
  menuRef: HTMLDivElement | null;
  containerRef: RefObject<HTMLDivElement>;
}

export const SubMenu: React.FC<SubMenuProps> = ({
  menuData,
  className,
  onMouseEnter,
  onMouseLeave,
  cardMode,
  menuItemKey,
  menuRef,
  containerRef,
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
    setIsMounted(false);
    if (onMouseLeave) {
      onMouseLeave();
    }
  };

    // 테두리 애니메이션을 위한 variants
    const borderVariants = {
      hidden: { scaleX: 0, originX: 0.5 },
      visible: { scaleX: 1, originX: 0.5, transition: { duration: 0.3, ease: "easeInOut" } },
      exit: { scaleX: 0, originX: 0.5, transition: { duration: 0.2, ease: "easeInOut" } }
    };

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          className={`bg-white/50 backdrop-blur-md shadow-lg absolute ${
            cardMode ? "w-auto" : "left-0 right-0"
          } ${className}`}
          style={{ top: position.top, left: position.left, originY: 0 }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={handleMouseLeaveWithAnimation}
          ref={subMenuRef}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* 상단 테두리 (애니메이션 적용) */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-blue-500"
            variants={borderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />

          <div
            className={`${
              cardMode ? "" : "max-w-[1400px] mx-auto"
            } px-4 py-4 flex flex-wrap gap-4 pt-5`} // pt-5 추가 (테두리 공간 확보)
          >
            {Object.entries(menuData).map(([mainMenuItem, subMenuItems]) => (
              <div
                key={mainMenuItem}
                className={`flex flex-col ${
                  cardMode ? "p-8" : ""
                } items-center justify-center`}
              >
                <h4 className="font-bold text-gray-700 mb-4">
                  {cardMode ? "" : mainMenuItem}
                </h4>
                <div className="flex flex-col w-full">
                  {subMenuItems.map((item) => (
                    <Link
                      key={item}
                      href={"#"} // 실제 경로로 변경 필요
                      className="text-gray-700 hover:text-gray-900 whitespace-nowrap py-3 w-full text-center"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};