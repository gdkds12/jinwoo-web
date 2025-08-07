// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
      extend: {
        fontFamily: {
          sans: ["var(--font-pretendard)", "sans-serif"],
          mono: ["var(--font-geist-mono)", "monospace"],
        },
        zIndex: {
            '50': '50', // z-index 커스텀 클래스 추가
        },
      },
    },
    plugins: [],
  };