"use client";
// app/page.tsx
import { Header } from "./components/Header";
import { Section } from "./components/Section";
import { Footer } from "./components/Footer";
import GallerySection from "./components/GallerySection";
import MenuSection from "./components/MenuSection";

export default function Home() {
  return (
    <>
      <Header />
      <div className="main-container relative">
        <Section />
        <div className="content-container md:mt-0">
          <MenuSection />
          <GallerySection />
        </div>
      </div>
      <Footer />
      
      <style jsx>{`
        @media (max-width: 767px) {
          .main-container {
            display: flex;
            flex-direction: column;
          }
          .content-container {
            margin-top: 0;
            background-color: #f9fafb; /* gray-50 */
            position: relative;
            z-index: 2;
          }
        }
      `}</style>
    </>
  );
}