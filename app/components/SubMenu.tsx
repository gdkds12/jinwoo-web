// components/SubMenu.tsx
"use client";
import { motion } from "framer-motion";

interface SubMenuProps {
  menuData: { [key: string]: string[] };
  className?: string;
}

export const SubMenu: React.FC<SubMenuProps> = ({ menuData, className }) => {
  return (
    <motion.div
      className={`bg-white  shadow-lg  w-full  ${className}`} //배경, 그림자, 전체 너비
      initial={{ opacity: 0, height: 0 }} // 초기 상태: 투명, 높이 0
      animate={{ opacity: 1, height: "auto" }} // 애니메이션: 불투명, 높이 auto
      exit={{ opacity: 0, height: 0 }}      // 사라질 때: 투명, 높이 0
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-[1400px] mx-auto py-4 flex flex-wrap justify-between gap-4">
        {/* 모든 서브메뉴 항목을 하나의 행에 표시 */}
        {Object.entries(menuData).map(([mainMenuItem, subMenuItems]) => (
          <div key={mainMenuItem} className="flex flex-col gap-2">
            <h4 className="font-bold text-foreground">{mainMenuItem}</h4>
             <div className="flex flex-wrap">
              {subMenuItems.slice(0, mainMenuItem === '소통' ? 4 : undefined).map((item) => (  //소통 메뉴는 4개
                <div key={item} className="text-foreground hover:text-gray-600 mr-4 whitespace-nowrap">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};