import {Divider, Grid, Typography} from "@mui/material";

export default function Landing() {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
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
            </Grid>
        </>
    )
}
