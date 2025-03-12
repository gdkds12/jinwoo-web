// constants/menu.ts
export const menuData = {
    예배: ["설교", "예배안내"],
    성장: ["교회학교", "교육/훈련", "강좌"],
    교제: ["교회부서", "봉사/행사"],
    섬김: ["돌봄", "선교", "말씀나눔"],
    미디어: ["영상", "갤러리", "행정서비스"],
    소통: ["교회소식", "문의"],
    교회: ["진우 교회", "시설 안내"],
  };
  
  export type MenuDataKey = keyof typeof menuData;