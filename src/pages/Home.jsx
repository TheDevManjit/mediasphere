import Ticker from '../components/Ticker';
import HeroSlider from '../components/HeroSlider';
import FeaturedStories from '../components/FeaturedStories';
import TrendingNews from '../components/TrendingNews';
import CategoriesSection from '../components/CategoriesSection';
import VideoSection from '../components/VideoSection';
import NewsletterSection from '../components/NewsletterSection';
import Testimonials from '../components/Testimonials';
import StatsSection from '../components/StatsSection';
import AppPromo from '../components/AppPromo';
import AdBanner from '../components/AdBanner';
import LatestArticles from '../components/LatestArticles';

export default function Home() {
  return (
    <main>
      <Ticker />
      <HeroSlider />
      <AdBanner />
      <FeaturedStories />
      <StatsSection />
      <TrendingNews />
      <CategoriesSection />
      <VideoSection />
      <LatestArticles />
      <NewsletterSection />
      <Testimonials />
      <AppPromo />
    </main>
  );
}
