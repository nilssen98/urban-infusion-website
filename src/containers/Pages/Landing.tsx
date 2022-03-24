import {Box, Divider, Typography} from '@mui/material';
import Section from '../../components/Wrappers/Section';
import HeroSection from '../../components/Pages/Landing/HeroSection';
import FeaturesSection from '../../components/Pages/Landing/FeaturesSection';
import FeaturedProductsSection from '../../components/Pages/Landing/FeaturedProductsSection';
import TestimonialSection from '../../components/Pages/Landing/TestimonialSection';

export default function Landing() {
    return (
        <>
            <Box>
                <HeroSection/>
                <Divider/>
                <FeaturedProductsSection/>
                <Divider/>
                <FeaturesSection/>
                <Divider/>
                <TestimonialSection/>
                <Divider/>
            </Box>
        </>
    );
}
