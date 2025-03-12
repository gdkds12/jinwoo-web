// Component.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { SubMenu } from "./SubMenu";

interface ComponentProps {
  className?: string;
}

export const Component: React.FC<ComponentProps> = ({ className }) => {
  const baseClasses =
    "text-xl font-bold tracking-[-0.32px] whitespace-nowrap cursor-pointer";
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMouseOverMenuOrSubMenu, setIsMouseOverMenuOrSubMenu] =
    useState(false);

  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null); // null을 허용하지 않는 타입으로 변경

  const menuData = {
    예배: ["예배 LIVE", "설교", "예배안내"],
    성장: ["교회학교", "교육/훈련", "강좌"],
    교제: ["소그룹", "교회부서", "봉사/행사"],
    섬김: ["돌봄", "선교", "말씀나눔"],
    미디어: ["영상", "갤러리", "행정서비스"],
    소통: ["교회소식", "교우소식", "문의", "진우교회"],
    교회: [],
  };

  type MenuDataKey = keyof typeof menuData;

  const menuItems = Object.keys(menuData);

  const handleMouseEnter = (item: string) => {
    setHoveredItem(item);
    setIsMouseOverMenuOrSubMenu(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOverMenuOrSubMenu(false);
    if (!isMouseOverMenuOrSubMenu) {
      setHoveredItem(null);
    }
  };

  const handleSubMenuMouseEnter = () => {
    setIsMouseOverMenuOrSubMenu(true);
  };

  const handleSubMenuMouseLeave = () => {
    setIsMouseOverMenuOrSubMenu(false);
    setHoveredItem(null);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className={`hidden lg:flex gap-22`}>
        {menuItems.map((item) => (
          <div
            key={item}
            ref={(el) => {
              menuRefs.current[item] = el;
            }}
            className="flex flex-col items-start relative flex-[0_0_auto]"
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`${baseClasses} ${
                hoveredItem === item ? "" : ""
              } text-foreground`}
            >
              {item}
            </div>
          </div>
        ))}
      </div>

      {hoveredItem && menuRefs.current[hoveredItem] && containerRef.current && (
        <SubMenu
          key={hoveredItem}
          menuData={{ [hoveredItem]: menuData[hoveredItem as MenuDataKey] }}
          className="absolute"
          cardMode={true}
          onMouseEnter={handleSubMenuMouseEnter}
          onMouseLeave={handleSubMenuMouseLeave}
          menuItemKey={hoveredItem}
          menuRef={menuRefs.current[hoveredItem]}
          containerRef={containerRef as React.RefObject<HTMLDivElement>} // RefObject<HTMLDivElement>로 타입 단언
        />
      )}
    </div>
  );
};