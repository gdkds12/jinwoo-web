"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// 스크롤 시 등장하는 애니메이션 섹션 컴포넌트
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  delay = 0.2, 
  className = "" 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.1,
    fallback: true // 뷰포트 감지 실패해도 렌더링을 진행
  });

  // DOM 요소 등장 시 콘텐츠가 미리 렌더링되도록 처리
  useEffect(() => {
    if (ref.current) {
      const element = ref.current as HTMLElement;
      element.style.minHeight = '10px'; // 최소 높이 설정으로 스크롤 가능성 확보
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.4, 
        delay: delay,
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// 페이지 로드 시 등장하는 애니메이션 컴포넌트
export const FadeInSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  delay = 0.2, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: delay,
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}; 