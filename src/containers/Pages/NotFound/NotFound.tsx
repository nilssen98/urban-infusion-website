import {Box, Typography} from '@mui/material';
import Section from '../../../components/Wrappers/Section';

export default function NotFound() {
    return (
        <>
            <Section
                height={600}
                sx={{
                    margin: 0
                }}
            >
                <Box
                    display={'flex'}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant={'h1'} paddingBottom={6}>
                        404
                    </Typography>
                    <Typography variant={'h3'} component={'h2'} paddingBottom={1}>
                        Oops! That Page Can’t Be Found
                    </Typography>
                    <Typography variant={'h6'} component={'h3'} paddingBottom={4}>
                        The page you are looking for does not exist
                    </Typography>
                    <Typography variant={'body1'} component={'h4'}>
                        Please return to the home page
                    </Typography>
                </Box>
            </Section>
        </>
    );
}
