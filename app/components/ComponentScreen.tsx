// app/components/ComponentScreen.tsx
"use client"; // Client Component로 변경
import React, { useState, useRef } from "react";
import { SubMenu } from "./SubMenu";
import { menuData, MenuDataKey } from "./constants/menu";

interface ComponentProps {
  className?: string;
}

export const ComponentScreen: React.FC<ComponentProps> = ({ className }) => { // Component -> ComponentScreen
  const baseClasses =
    "text-xl font-semibold tracking-[-0.32px] whitespace-nowrap cursor-pointer";
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
      <div className={`hidden lg:flex gap-20`}>
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

      {hoveredItem && menuRefs.current[hoveredItem] && containerRef.current && (
        <SubMenu
          key={hoveredItem}
          menuData={{ [hoveredItem]: menuData[hoveredItem as MenuDataKey] || [] }}
          className="absolute"
          cardMode={true}
          onHoverChange={handleSubMenuHoverChange}
          menuItemKey={hoveredItem}
          menuRef={menuRefs.current[hoveredItem]}
          containerRef={containerRef}
          isEmpty={menuData[hoveredItem as MenuDataKey]?.length === 0}
        />
      )}
    </div>
  );
};