"use client";
import { useState, useRef } from "react";
import { SubMenu } from "./SubMenu";
import { menuData, MenuDataKey } from "./constants/menu"; //  경로 확인

interface ComponentProps {
  className?: string;
}

export const Component: React.FC<ComponentProps> = ({ className }) => {
  const baseClasses =
    "text-xl font-bold tracking-[-0.32px] whitespace-nowrap cursor-pointer";
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isSubMenuHovered, setIsSubMenuHovered] = useState(false);

  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const menuItems = Object.keys(menuData);

  const handleMouseEnter = (item: string) => {
    setHoveredItem(item);
    setIsSubMenuHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isSubMenuHovered) {
      setHoveredItem(null);
    }
  };

  const handleSubMenuHoverChange = (isHovered: boolean) => {
    setIsSubMenuHovered(isHovered);
    if (!isHovered) {
      setHoveredItem(null);
    }
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
            <div className={`${baseClasses} text-foreground`}>{item}</div>
          </div>
        ))}
      </div>

      {/* SubMenu 표시 조건 변경 */}
      {hoveredItem && menuRefs.current[hoveredItem] && containerRef.current && (
        <SubMenu
          key={hoveredItem}
          // menuData가 비어있어도 SubMenu를 생성하도록 조건 변경
          menuData={{ [hoveredItem]: menuData[hoveredItem as MenuDataKey] || [] }} // 빈 배열 추가
          className="absolute"
          cardMode={true}
          onHoverChange={handleSubMenuHoverChange}
          menuItemKey={hoveredItem}
          menuRef={menuRefs.current[hoveredItem]}
          containerRef={containerRef}
          isEmpty={menuData[hoveredItem as MenuDataKey]?.length === 0} // 추가: 빈 메뉴 항목인지 확인
        />
      )}
    </div>
  );
};