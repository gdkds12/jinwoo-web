// app/components/Component.tsx
"use client";
import { useState, useRef } from "react";
import { SubMenu } from "./SubMenu";
import { menuData, MenuDataKey } from "./constants/menu"; // menuData import 경로 수정

interface ComponentProps {
  className?: string;
}

export const Component: React.FC<ComponentProps> = ({ className }) => {
  const baseClasses =
    "text-xl font-bold tracking-[-0.32px] whitespace-nowrap cursor-pointer";
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isSubMenuHovered, setIsSubMenuHovered] = useState(false); // SubMenu hover 상태

  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const menuItems = Object.keys(menuData);

  const handleMouseEnter = (item: string) => {
    setHoveredItem(item);
    setIsSubMenuHovered(true); // SubMenu 표시
  };

  const handleMouseLeave = () => {
    // SubMenu에 hover 중이 아니면 바로 false로, hover 중이면 SubMenu의 onMouseLeave에서 처리
    if (!isSubMenuHovered) {
      setHoveredItem(null);
    }
  };

  const handleSubMenuHoverChange = (isHovered: boolean) => {
        setIsSubMenuHovered(isHovered); // SubMenu hover 상태 변경
        if(!isHovered){
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
            <div
              className={`${baseClasses} text-foreground`}
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
          onHoverChange={handleSubMenuHoverChange}
          menuItemKey={hoveredItem}
          menuRef={menuRefs.current[hoveredItem]}
          containerRef={containerRef}
        />
      )}
    </div>
  );
};