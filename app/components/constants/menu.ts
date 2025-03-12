// constants/menu.ts
export const menuData = {
    예배: ["예배 LIVE", "설교", "예배안내"],
    성장: ["교회학교", "교육/훈련", "강좌"],
    교제: ["소그룹", "교회부서", "봉사/행사"],
    섬김: ["돌봄", "선교", "말씀나눔"],
    미디어: ["영상", "갤러리", "행정서비스"],
    소통: ["교회소식", "교우소식", "문의", "진우교회"],
    교회: [],
  };
  
  export type MenuDataKey = keyof typeof menuData;