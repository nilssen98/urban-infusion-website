import {
    AppBar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Slide,
    Toolbar,
    Typography,
    useScrollTrigger, useTheme
} from '@mui/material';
import Logo from '../components/Logo';
import {ReactElement, ReactNode, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ThemeSwitch} from '../components/NavigationBar/ThemeSwitch';
import {RootState, store} from '../state/store';
import {userPreferencesSlice} from '../state/slices/userPreferences';
import MenuIcon from '@mui/icons-material/Menu';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';
import CartButton from '../components/NavigationBar/CartButton';
import AccountButton from '../components/NavigationBar/AccountButton';
import {connect} from 'react-redux';
import {selectCartItems} from '../state/slices/cart';

type Props = StateProps & {
    children?: ReactElement;
}

const pages = ['Products', 'About'];

function NavigationBar(props: Props) {
    const themeColor = store.getState().userPreferences.theme;
    const theme = useTheme();

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const navigate = useNavigate();

    const handleChangeTheme = () => {
        store.dispatch(userPreferencesSlice.actions.toggleTheme());
    };

    return (
        <>
            <HideOnScroll {...props}>
                <AppBar color={'inherit'} position={'sticky'}>
                    <Toolbar sx={{justifyContent: 'center'}}>
                        <Box
                            sx={{
                                width: theme.breakpoints.values.lg,
                                display: 'flex',
                                flexWrap: 'nowrap',
                                alignItems: 'center'
                            }}
                        >
                            <Box sx={{flex: 1, display: {sm: 'flex', xs: 'none'}}}>
                                <Logo clickable onClick={() => navigate('/')}/>
                            </Box>
                            <Box sx={{flex: 1, display: {sm: 'none', xs: 'flex'},}}>
                                <IconButton
                                    onClick={handleOpenNavMenu}
                                >
                                    <MenuIcon/>
                                </IconButton>
                            </Box>
                            <Box sx={{flex: 1, display: {sm: 'none', xs: 'flex'}}}>
                                <Logo clickable onClick={() => navigate('/')}/>
                            </Box>
                            <Box
                                sx={{
                                    flex: 1,
                                    display: {sm: 'flex', xs: 'none'},
                                    px: 4,
                                    justifyContent: 'right',
                                }}
                            >
                                {
                                    pages.map(page => (
                                        <NavigationLink
                                            sx={{pr: 8}}
                                            key={page}
                                            onClick={() => navigate(page.toLowerCase())}
                                        >
                                            {page}
                                        </NavigationLink>
                                    ))
                                }
                            </Box>
                            <Box
                                sx={{
                                    flex: 1,
                                    display: 'flex',
                                    justifyContent: 'right',
                                }}
                            >
                                <ThemeSwitch
                                    mode={themeColor}
                                    onClick={handleChangeTheme}
                                />
                                <CartButton itemsCount={props.cartCount}/>
                                <AccountButton/>
                            </Box>
                            <Menu
                                anchorEl={anchorElNav}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                keepMounted
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                {
                                    pages.map(page => (
                                        <MenuItem key={page} onClick={() => {
                                            navigate(page.toLowerCase());
                                            handleCloseNavMenu();
                                        }}>
                                            <Typography>{page}</Typography>
                                        </MenuItem>
                                    ))
                                }
                            </Menu>
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </>
    );
}

interface NavigationLinkProps {
    children?: ReactNode;
    onClick?: () => void;
    sx?: SxProps<Theme>;
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
                    },
                    ...props.sx
                }}
            >
                {props.children}
            </Typography>
        </>
    );
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

interface StateProps {
    cartCount: number;
}

function mapStateToProps(state: RootState): StateProps {
    return {
        cartCount: selectCartItems(state.cart).length
    };
}

export default connect(mapStateToProps)(NavigationBar);
