import {Box, Divider, Typography} from "@mui/material";
import Section from "../../../components/Wrappers/Section";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import FeaturedProductsSection from "./FeaturedProductsSection";

export default function Landing() {
    return (
        <>
            <Box>
                <HeroSection/>
                <Divider/>
                <FeaturesSection/>
                <Divider/>
                <FeaturedProductsSection/>
                <Divider/>
                <Section
                         sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Typography variant={'h4'}>Section</Typography>
                </Section>
                <Divider/>
                <Section
                         sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Typography variant={'h4'}>Section</Typography>
                </Section>
                <Divider/>
                <Section
                         sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Typography variant={'h4'}>Section</Typography>
                </Section>
            </Box>
        </>
    )
}
