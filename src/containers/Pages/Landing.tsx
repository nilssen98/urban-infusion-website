import {Box, Divider} from '@mui/material';
import HeroSection from '../../components/HeroSection';
import FeaturesSection from '../../components/Pages/Landing/FeaturesSection';
import FeaturedProductsSection from '../../components/Pages/Landing/FeaturedProductsSection';
import TestimonialSection from '../../components/Pages/Landing/TestimonialSection';
import Footer from '../Footer';

export default function Landing() {
    return (
        <>
            <Box>
                <HeroSection
                    title={'Find your herbal friend'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                />
                <FeaturedProductsSection/>
                <FeaturesSection/>
                <TestimonialSection/>
                <Divider/>
                <Footer/>
            </Box>
        </>
    );
}
