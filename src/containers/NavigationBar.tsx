import {AppBar, Box, Skeleton, Slide, Toolbar, Typography, useScrollTrigger} from "@mui/material";
import Logo from "../components/Logo";
import {ReactElement, ReactNode} from "react";
import {useNavigate} from "react-router-dom";
import {ThemeSwitch} from "../components/ThemeSwitch";
import {useSelector} from "react-redux";
import {RootState, store} from "../state/store";
import {userPreferencesSlice} from "../state/slices/userPreferences";
import Section from "../components/Wrappers/Section";

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
                <AppBar
                    color={'inherit'}
                >
                    <Toolbar>
                        <Section
                            sx={{
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    display: 'flex',
                                    justifyContent: 'left',
                                }}
                            >
                                <Logo clickable onClick={() => navigate('/')}/>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flex: 3,
                                    px: 4,
                                    justifyContent: 'right',
                                }}
                            >
                                <NavigationLink onClick={() => navigate('/products')}>
                                    Products
                                </NavigationLink>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'right',
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                            >
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
                            </Box>
                        </Section>
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
                    display: 'inline',
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
