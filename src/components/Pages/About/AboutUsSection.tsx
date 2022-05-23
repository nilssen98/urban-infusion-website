import {Stack, Typography, useTheme} from '@mui/material';
import Section from '../../Wrappers/Section';
import Background from '../../../assets/images/story-section.jpeg';

export default function AboutUsSection() {
    const theme = useTheme();
    return (
        <>
            <Section sx={{my: 16}} label={'History'}>
                <Stack
                    width={'100%'}
                    alignItems={'center'}
                    textAlign={'center'}
                >
                    <Stack
                        spacing={{xs: 4, md: 6}}
                        maxWidth={800}
                    >
                        <Typography variant={'h4'}>
                            Our story
                        </Typography>
                        <Typography>
                            Humans have been enjoying herbal teas for millennia. We are passionate for natural teas,
                            nurtured by our ancestors. Our experts have carefully selected teas from all regions of the
                            planet – from Japanese teas to herbal wonders of Machu Picchu.
                        </Typography>
                        <Typography>
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
