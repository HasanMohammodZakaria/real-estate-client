import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { getRecentReviews } from "../lib/api/reviews.api";
import { TestimonialsSlider } from "@/components/home/TestimonialsSlider";




const AboutPage = async () => {
    const reviews = await getRecentReviews().catch(() => []);
    return (
        <div>
            <AboutHero/>
            <OurStory />
            <WhyChooseUs />
            <TestimonialsSlider reviews ={reviews}/>
        </div>
    );
};

export default AboutPage;