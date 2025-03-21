// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}", // app 폴더
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/**/*.{js,ts,jsx,tsx,mdx}", // src 폴더 (사용하는 경우)
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ["var(--font-pretendard)", "sans-serif"],
          mono: ["var(--font-geist-mono)", "monospace"],
        },
        zIndex: {
            '50': '50', // z-index 커스텀 클래스 추가
        },
        colors: {
          dark: {
            DEFAULT: '#24241e',
            800: '#2d2d26',
            700: '#37372f',
          }
        }
      },
    },
    plugins: [],
  };