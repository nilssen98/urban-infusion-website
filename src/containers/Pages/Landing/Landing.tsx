import {Box, Divider, Typography} from "@mui/material";
import Section from "../../../components/Wrappers/Section";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import BestSellersSection from "./BestSellersSection";

export default function Landing() {
    return (
        <>
            <Box>
                <HeroSection/>
                <Divider/>
                <FeaturesSection/>
                <Divider/>
                <BestSellersSection/>
                <Divider/>
                <Section height={600}
                         sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Typography paddingTop={6} variant={'h4'}>Section</Typography>
                </Section>
                <Divider/>
                <Section height={600}
                         sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Typography paddingTop={6} variant={'h4'}>Section</Typography>
                </Section>
                <Divider/>
                <Section height={600}
                         sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Typography paddingTop={6} variant={'h4'}>Section</Typography>
                </Section>
            </Box>
        </>
    )
}
