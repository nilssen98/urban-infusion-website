import {AppBar, Grid, Skeleton, Slide, Toolbar, Typography, useScrollTrigger} from "@mui/material";
import Logo from "../components/Logo";
import {ReactElement, ReactNode} from "react";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();

    return (
        <>
            <HideOnScroll {...props}>
                <AppBar color={'primary'}>
                    <Toolbar>
                        <Grid container>
                            <Grid xs={4} item container style={{alignItems: 'center'}}>
                                <NavigationLink onClick={() => navigate('/products')}>
                                    Products
                                </NavigationLink>
                            </Grid>
                            <Grid xs={4} item container>
                                <Logo clickable onClick={() => navigate('/')}/>
                            </Grid>
                            <Grid xs={4} item container style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                                <Skeleton variant={'circular'} width={48} height={48} animation={'wave'}
                                          sx={{bgcolor: 'grey.900', cursor: 'pointer'}}/>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </>
    )
}

interface NavigationLinkProps {
    children?: ReactNode;
    onClick?: () => void;
}

function NavigationLink(props: NavigationLinkProps) {
    return (
        <>
            <Typography
                onClick={props.onClick}
                variant={'body1'}
                sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        textDecoration: 'underline'
                    }
                }}
            >
                {props.children}
            </Typography>
        </>
    )
}
