// app/page.tsx
import { Header } from "./components/Header";
import { Section } from "./components/Section";
import { Footer } from "./components/Footer";
import GallerySection from "./components/GallerySection";

export default function Home() {
  return (
    <>
      <Header />
      <Section />
      <GallerySection />
      <Footer />
    </>
  );
}