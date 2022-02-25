import {Grid, Typography} from "@mui/material";
import Logo from "../components/Logo";


export default function Footer() {
    return (
        <>
            <Grid
                container
                sx={{
                    height: 300,
                    background: 'rgb(255, 255, 255, 0.5)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    rowGap: 4
                }}
            >
                <Logo/>
                <Typography variant={"body2"} sx={{fontWeight: 'fontWeightBold'}}>
                    Copyright © {new Date().getFullYear()} Urban Infusion
                </Typography>
            </Grid>
        </>
    )
}
