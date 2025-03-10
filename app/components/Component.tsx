// components/Component.tsx
import React from "react";

interface ComponentProps {
    className?: string;
    hover: boolean;
    itemClassName?: string;
    variant: "one" | "two"; // variant 타입을 명시
}

export const Component: React.FC<ComponentProps> = ({
    className,
    hover,
    itemClassName,
    variant,
}) => {

    const baseClasses = "text-white text-base tracking-[-0.32px] leading-[60px] whitespace-nowrap"

    return (
        <div
        className={`inline-flex items-start gap-[60px] relative ${className}`}
        >
             <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div className={`${baseClasses} ${hover? 'font-bold' : 'font-medium'} `}>
                    교회소식
                </div>
            </div>

            <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div className={`${baseClasses} ${hover? 'font-bold' : 'font-medium'} `}>
                    설교말씀
                </div>
            </div>

             <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div className={`${baseClasses} ${hover? 'font-bold' : 'font-medium'} `}>
                    교회학교
                </div>
            </div>

            <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div className={`${baseClasses} ${hover? 'font-bold' : 'font-medium'} `}>
                    찬양
                </div>
            </div>

            <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div className={`${baseClasses} ${hover? 'font-bold' : 'font-medium'} `}>
                    선교
                </div>
            </div>

             <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div className={`${baseClasses} ${hover? 'font-bold' : 'font-medium'} `}>
                    공동체
                </div>
            </div>
        </div>
    )
};