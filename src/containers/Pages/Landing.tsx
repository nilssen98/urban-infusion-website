import {Box, Divider} from '@mui/material';
import HeroSection from '../../components/HeroSection';
import FeaturesSection from '../../components/Pages/Landing/FeaturesSection';
import FeaturedProductsSection from '../../components/Pages/Landing/FeaturedProductsSection';
import TestimonialSection from '../../components/Pages/Landing/TestimonialSection';
import Footer from '../Footer';
import AboutUsSection from '../../components/Pages/About/AboutUsSection';
import InstagramSection from '../../components/Pages/About/InstagramSection';
import useProducts from '../../hooks/products/useProducts';

export default function Landing() {
    const {data: products} = useProducts();

    return (
        <>
            <Box>
                <HeroSection
                    title={'Find your herbal friend'}
                    description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                />
                <FeaturedProductsSection products={products || []}/>
                <FeaturesSection/>
                <TestimonialSection/>
                <AboutUsSection/>
                {/*<InstagramSection/>*/}
                <Divider/>
                <Footer/>
            </Box>
        </>
    );
}
