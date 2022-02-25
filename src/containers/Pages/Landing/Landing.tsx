import {Divider, Grid, Typography} from "@mui/material";
import Section from "../../../components/Section";

export default function Landing() {
    return (
        <>
            <Grid container>
                <Section height={300}>
                    <Typography variant={'h4'}>Section</Typography>
                </Section>
                <Divider/>
                <Grid container
                      sx={{
                          height: 300,
                          background: 'rgb(255, 255, 255, 0.5)',
                          alignItems: 'center',
                          justifyContent: 'center'
                      }}
                >
                    <Typography variant={'h4'}>Section</Typography>
                </Grid>
                <Divider/>
                <Grid container
                      sx={{
                          height: 300,
                          alignItems: 'center',
                          justifyContent: 'center'
                      }}
                >
                    <Typography variant={'h4'}>Section</Typography>
                </Grid>
                <Divider/>
            </Grid>
        </>
    )
}
