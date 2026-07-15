import Banner from "@/components/home/Banner";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { HowItWorks } from "@/components/home/HowItWorks";
import { NewsletterSection } from "@/components/home/NewsLetterSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";


import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { getRecentReviews } from "./lib/api/reviews.api";


export default async function Home() {
  const reviews = await getRecentReviews().catch(() => []);
  return (
    <div>
      <Banner/>
      <FeaturedProperties />
       <CategorySection />
       <StatsSection />
      <WhyChooseUs />
      <HowItWorks />
      <TestimonialsSlider reviews ={reviews}/>
      <NewsletterSection />
    </div>
  );
}
