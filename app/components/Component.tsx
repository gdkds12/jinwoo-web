// components/Component.tsx
"use client";
import { useState } from "react";
import { SubMenu } from "./SubMenu";
import { AnimatePresence } from "framer-motion";

interface ComponentProps {
  className?: string;
}

export const Component: React.FC<ComponentProps> = ({ className }) => {
  const baseClasses =
    "text-xl font-bold tracking-[-0.32px] whitespace-nowrap cursor-pointer"; // text-xl로 변경
  const [isHovered, setIsHovered] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const menuData = {
    예배: ["예배 LIVE", "설교", "예배안내"],
    성장: ["교회학교", "교육/훈련", "강좌"],
    교제: ["소그룹", "교회부서", "봉사/행사"],
    섬김: ["돌봄", "선교", "소망말씀나눔"],
    미디어: ["영상", "갤러리", "행정서비스"],
    소통: ["교회소식", "교우소식", "문의", "진우교회"],
    교회: [],
  };

  type MenuDataKey = keyof typeof menuData;

  const menuItems = Object.keys(menuData);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowSubMenu(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowSubMenu(false);
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}

    >
      <div className={`hidden lg:flex gap-22`}> {/* gap-22으로 변경 */}
        {menuItems.map((item) => (
          <div
            key={item}
            className="flex flex-col items-start relative flex-[0_0_auto]"
          >
            <div
              className={`${baseClasses} ${
                isHovered ? "" : ""
              } text-foreground`}
            >
              {item}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showSubMenu && (
          <SubMenu menuData={menuData} className="absolute top-full left-0" />
        )}
      </AnimatePresence>
    </div>
  );
};