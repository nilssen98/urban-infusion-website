import {Box, Container, Divider, Grid, Typography} from "@mui/material";
import Section from "../../../components/Section";

export default function Landing() {
    return (
        <>
            <Box>
                <Section height={300}>
                    <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                        <Typography paddingTop={6} variant={'h4'}>Section</Typography>
                    </Container>
                </Section>
                <Divider/>
                <Section height={300}>
                    <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                        <Typography paddingTop={6} variant={'h4'}>Section</Typography>
                    </Container>
                </Section>
                <Divider/>
                <Section height={300}>
                    <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                        <Typography paddingTop={6} variant={'h4'}>Section</Typography>
                    </Container>
                </Section>
                <Divider/>
                <Section height={300}>
                    <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                        <Typography paddingTop={6} variant={'h4'}>Section</Typography>
                    </Container>
                </Section>
            </Box>
        </>
    )
}
