import {AppBar, Box, Grid, Skeleton, Slide, Toolbar, Typography, useScrollTrigger} from "@mui/material";
import Logo from "../components/Logo";
import {ReactElement} from "react";

interface Props {
    children?: ReactElement;
}

function HideOnScroll(props: Props) {
    const trigger = useScrollTrigger({
        target: window,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {props.children || <></>}
        </Slide>
    );
}

export default function NavigationBar(props: Props) {
    return (
        <>
            <HideOnScroll {...props}>
                <AppBar color={'primary'}>
                    <Toolbar>
                        <Grid container>
                            <Grid xs={4} item container style={{alignItems: 'center'}}>
                                <Typography variant={'body1'}>Products</Typography>
                            </Grid>
                            <Grid xs={4} item container>
                                <Logo/>
                            </Grid>
                            <Grid xs={4} item container style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                                <Skeleton variant={'circular'} width={48} height={48} animation={'wave'} sx={{bgcolor: 'grey.900', cursor: 'pointer'}}/>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </>
    )
}
