import {Stack, Typography, useTheme} from '@mui/material';
import Section from '../../Wrappers/Section';
import Background from '../../../assets/images/about-section-background.jpg';

export default function AboutUsSection() {
    const theme = useTheme();
    return (
        <>
            <Section backgroundUrl={Background} sx={{my: 16}}>
                <Stack
                    width={'100%'}
                    color={theme.palette.getContrastText('#070707')}
                    alignItems={'center'}
                    textAlign={'center'}
                >
                    <Stack
                        spacing={{xs: 2, md: 4}}
                        maxWidth={750}
                    >
                        <Typography variant={'h4'}>
                            Our story
                        </Typography>
                        <Typography variant={'h6'}>
                            Humans have been enjoying herbal teas for millennia. We are passionate for natural teas,
                            nurtured by our ancestors. Our experts have carefully selected teas from all regions of the
                            planet – from Japanese teas to herbal wonders of Machu Picchu.
                        </Typography>
                        <Typography variant={'h6'}>
                            We have carefully created a collection of more than 600 different teas from 140 different
                            countries. Come visit us at our office in Amfi Moa, we have 62 most popular teas available
                            here!
                        </Typography>
                    </Stack>
                </Stack>
            </Section>
        </>
    );
}
