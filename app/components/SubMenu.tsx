// components/SubMenu.tsx
"use client";
import { motion } from "framer-motion";

interface SubMenuProps {
  menuData: { [key: string]: string[] };
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const SubMenu: React.FC<SubMenuProps> = ({
  menuData,
  className,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <motion.div
      className={`bg-white shadow-lg absolute top-full left-0 right-0 ${className}`} // max-w, mx-auto 제거
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 콘텐츠를 감싸는 div에 max-w-[1400px] mx-auto 적용 */}
      <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-wrap justify-between gap-4">
        {Object.entries(menuData).map(([mainMenuItem, subMenuItems]) => (
          <div key={mainMenuItem} className="flex flex-col gap-2">
            <h4 className="font-bold text-foreground">{mainMenuItem}</h4>
            <div className="flex flex-wrap">
              {subMenuItems
                .slice(0, mainMenuItem === "소통" ? 4 : undefined)
                .map((item) => (
                  <div
                    key={item}
                    className="text-foreground hover:text-gray-600 mr-4 whitespace-nowrap"
                  >
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