import {Grid, Typography} from "@mui/material";
import Section from "../../../components/Section";

export default function Landing() {
    return (
        <>
            <Grid container>
                <Section height={300}>
                    <Grid container sx={{justifyContent: 'center', height: '100%'}}>
                        <Typography paddingTop={6} variant={'h4'}>Section</Typography>
                    </Grid>
                </Section>
                <Section height={300} bgColor={'#88D8AB'}>
                    <Grid container sx={{justifyContent: 'center', height: '100%'}}>
                        <Typography paddingTop={6} variant={'h4'}>Section</Typography>
                    </Grid>
                </Section>
                <Section height={300}>
                    <Grid container sx={{justifyContent: 'center', height: '100%'}}>
                        <Typography paddingTop={6} variant={'h4'}>Section</Typography>
                    </Grid>
                </Section>
                <Section height={300} bgColor={'#88D8AB'}>
                    <Grid container sx={{justifyContent: 'center', height: '100%'}}>
                        <Typography paddingTop={6} variant={'h4'}>Section</Typography>
                    </Grid>
                </Section>
            </Grid>
        </>
    )
}
