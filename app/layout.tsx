// app/layout.tsx
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

// Pretendard 폰트 설정
const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2", //  public/fonts에 폰트 파일
  display: "swap",
  variable: "--font-pretendard",
});

// Geist Mono (기존 코드 유지)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "진우교회",
  description: "진우교회 홈페이지",
};

export const viewport = "width=device-width, initial-scale=1.0, maximum-scale=1.0";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${geistMono.variable}`}>
      <body className="font-sans">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}