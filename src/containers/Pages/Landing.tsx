import {Box, Divider} from '@mui/material';
import HeroSection from '../../components/HeroSection';
import FeaturesSection from '../../components/Pages/Landing/FeaturesSection';
import FeaturedProductsSection from '../../components/Pages/Landing/FeaturedProductsSection';
import TestimonialSection from '../../components/Pages/Landing/TestimonialSection';
import BackgroundImage from '../../assets/images/hero-section.jpg';

export default function Landing() {
    return (
        <>
            <Box>
                <HeroSection
                    title={'Find your herbal friend'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                    backgroundUrl={BackgroundImage}
                    // backgroundUrlMobile={'https://i.imgur.com/cGWuYIr.jpg'} // mobile 1
                    // backgroundUrlMobile={'https://i.imgur.com/tUtZZfJ.jpg'} // mobile 2
                    backgroundUrlMobile={'https://i.imgur.com/fBLkybq.jpg'} // mobile 3
                />
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
