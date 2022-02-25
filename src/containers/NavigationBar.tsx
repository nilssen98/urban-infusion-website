import {AppBar, Grid, Skeleton, Slide, Toolbar, Typography, useScrollTrigger} from "@mui/material";
import Logo from "../components/Logo";
import {ReactElement, ReactNode} from "react";
import {useNavigate} from "react-router-dom";
import {ThemeSwitch} from "../components/ThemeSwitch";
import {useSelector} from "react-redux";
import {RootState, store} from "../state/store";
import {userPreferencesSlice} from "../state/slices/userPreferences";

interface Props {
    children?: ReactElement;
}

export default function NavigationBar(props: Props) {
    const theme = useSelector((store: RootState) => store.userPreferences.theme);

    const navigate = useNavigate();

    const handleChangeTheme = () => {
        store.dispatch(userPreferencesSlice.actions.toggleTheme());
    }

    return (
        <>
            <HideOnScroll {...props}>
                <AppBar color={'primary'}>
                    <Toolbar>
                        <Grid container>
                            <Grid xs={2} item container>
                                <Logo clickable onClick={() => navigate('/')}/>
                            </Grid>
                            <Grid xs={5} item container style={{alignItems: 'center'}}>
                                <NavigationLink onClick={() => navigate('/products')}>
                                    Products
                                </NavigationLink>
                            </Grid>
                            <Grid xs={5} item container style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                                <ThemeSwitch
                                    checked={theme === 'dark'}
                                    onChange={handleChangeTheme}
                                />
                                <Skeleton
                                    variant={'circular'}
                                    width={48}
                                    height={48}
                                    animation={'wave'}
                                    sx={{bgcolor: 'grey.900', cursor: 'pointer', marginLeft: '1rem'}}
                                />
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
