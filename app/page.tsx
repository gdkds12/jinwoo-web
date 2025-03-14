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
      <Section />
      <MenuSection />
      <GallerySection />
      <Footer />
    </>
  );
}