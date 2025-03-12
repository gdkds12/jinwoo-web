// Component.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { SubMenu } from "./SubMenu";
import { menuData, MenuDataKey } from "./constants/menu";

interface ComponentProps {
  className?: string;
}

export const Component: React.FC<ComponentProps> = ({ className }) => {
  const baseClasses =
    "text-xl font-bold tracking-[-0.32px] whitespace-nowrap cursor-pointer";
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMouseOverMenuOrSubMenu, setIsMouseOverMenuOrSubMenu] = useState(false);
  // isSubMenuHovered 상태 제거

  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // 추가: setTimeout ref

  const menuItems = Object.keys(menuData);

  const handleMouseEnter = (item: string) => {
      if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
      }
    setHoveredItem(item);
    setIsMouseOverMenuOrSubMenu(true);
  };

  const handleMouseLeave = () => {
      if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
      }
    // setTimeout을 사용하여 지연 후 상태 변경 (SubMenu hover 상태와 무관하게)
    timeoutRef.current = setTimeout(() => {
      setIsMouseOverMenuOrSubMenu(false);
      setHoveredItem(null);
    }, 100);
  };

  // SubMenu의 hover 상태를 업데이트하는 콜백 함수
    const handleSubMenuHoverChange = (isHovered: boolean) => {
        if (isHovered) {
            if (timeoutRef.current) { // SubMenu 진입 시 타이머 해제
                clearTimeout(timeoutRef.current);
            }
            setIsMouseOverMenuOrSubMenu(true);
        } else {
            // SubMenu에서 벗어났을 때  타이머 설정
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setIsMouseOverMenuOrSubMenu(false);
                setHoveredItem(null);
            }, 100)
        }
    };

  useEffect(() => {
    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
          onHoverChange={handleSubMenuHoverChange} // 콜백 함수 전달
          menuItemKey={hoveredItem}
          menuRef={menuRefs.current[hoveredItem]}
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
        />
      )}
    </div>
  );
};