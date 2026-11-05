import FeaturesSection from "@/components/home/FeaturesSection";
import GallerySection from "@/components/home/GallerySection";
import HeroSection from "@/components/home/HeroSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <UpcomingEvents />
      <GallerySection />
      <NewsletterSection />
    </main>
  );
}