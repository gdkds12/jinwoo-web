// app/components/Component.tsx
"use client";
import { useState, useRef } from "react";
import { SubMenu } from "./SubMenu";
import { menuData, MenuDataKey } from "./constants/menu"; // menuData import

interface ComponentProps {
  className?: string;
}

export const Component: React.FC<ComponentProps> = ({ className }) => {
  const baseClasses =
    "text-xl font-bold tracking-[-0.32px] whitespace-nowrap cursor-pointer";
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  // const [isMouseOverMenuOrSubMenu, setIsMouseOverMenuOrSubMenu] = useState(false); // 사용하지 않으므로 주석 처리 또는 삭제
    const [isMouseOverMenuOrSubMenu, setIsMouseOverMenuOrSubMenu] = useState(false);

  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const menuItems = Object.keys(menuData);

   const handleMouseEnter = (item: string) => {
        setHoveredItem(item);
        setIsMouseOverMenuOrSubMenu(true); // 값 할당 뿐 아니라, 사용도 해야 합니다.
    };

    const handleMouseLeave = () => {
        // SubMenu에 hover 중이 아니면 바로 false로, hover 중이면 SubMenu의 onMouseLeave에서 처리
        if (!isSubMenuHovered) {
          setIsMouseOverMenuOrSubMenu(false);
          setHoveredItem(null);
        }
    };
    const [isSubMenuHovered, setIsSubMenuHovered] = useState(false); // 추가: SubMenu hover 상태

    const handleSubMenuMouseEnter = () => {
        setIsSubMenuHovered(true); // SubMenu 진입 시 true
        setIsMouseOverMenuOrSubMenu(true); // SubMenu가 보이는 상태 유지
    };
    const handleSubMenuMouseLeave = () => {

        setIsSubMenuHovered(false); // SubMenu에서 벗어나면 false
        setIsMouseOverMenuOrSubMenu(false);  // SubMenu 닫기
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
          onHoverChange={handleSubMenuHoverChange} // 콜백 함수 전달
          menuItemKey={hoveredItem}
          menuRef={menuRefs.current[hoveredItem]}
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
        />
      )}
    </div>
  );
    function handleSubMenuHoverChange(arg0: boolean): void {
        throw new Error("Function not implemented.");
    }
};