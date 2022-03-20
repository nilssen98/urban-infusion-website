import {Box, Typography} from '@mui/material';
import Section from '../../../components/Wrappers/Section';


export default function About() {
    return (
        <>
            <Section
                height={500}
                sx={{
                    margin: 0
                }}
            >
                <Box
                    display={'flex'}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Typography
                        variant={'h3'}
                    >
                        About page
                    </Typography>
                </Box>
            </Section>
        </>
    );
}
