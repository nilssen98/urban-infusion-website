import {
    AppBar,
    Box,
    Button,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
    useTheme
} from '@mui/material';
import Logo from '../components/Logo';
import {ReactElement, ReactNode, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {RootState} from '../state/store';
import {userSlice} from '../state/slices/user';
import MenuIcon from '@mui/icons-material/Menu';
import {SxProps} from '@mui/system';
import {Theme} from '@mui/material/styles';
import CartButton from '../components/AppBarNavigation/CartButton';
import AccountButton from '../components/AppBarNavigation/AccountButton';
import {connect} from 'react-redux';
import {selectCartItems} from '../state/slices/cart';

const mapStateToProps = (state: RootState) => {
    return {
        cartItemCount: selectCartItems(state.cart).length,
        themeColor: state.user.theme,
        isAuthenticated: state.user.jwt !== undefined,
    };
};

const mapDispatchToProps = {
    toggleTheme: userSlice.actions.toggleTheme,
    setJwtToken: userSlice.actions.setJwtToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBarNavigation);

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {
    children?: ReactElement;
};

function AppBarNavigation(props: Props) {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const theme = useTheme();
    const navigate = useNavigate();

    const pages = ['Products', 'About'];

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleChangeTheme = () => {
        props.toggleTheme();
    };

    return (
        <>
            <AppBar
                color={'inherit'}
                position={'sticky'}
                sx={{
                    boxShadow: 0,
                    // background: `rgba(${hexToRgb(theme.palette.background.default)?.join(',')}, 0.8)`,
                    // backdropFilter: 'saturate(1.8) blur(20px)',
                }}
            >
                <Toolbar sx={{justifyContent: 'center'}} disableGutters>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        width={theme.breakpoints.values.lg}
                        px={{md: 8, xs: 2}}
                    >
                        <Box sx={{flex: 1, display: {sm: 'flex', xs: 'none'}}}>
                            <Logo clickable onClick={() => navigate('/')}/>
                        </Box>
                        <Box sx={{flex: 1, display: {sm: 'none', xs: 'flex'}}}>
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
                        <Stack
                            direction={'row'}
                            spacing={2}
                            alignItems={'center'}
                            sx={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'right',
                            }}
                        >

                            {
                                /*
                                <ThemeSwitch
                                    mode={props.themeColor}
                                    onClick={handleChangeTheme}
                                />
                                 */
                            }
                            <CartButton itemsCount={props.cartItemCount}/>
                            {
                                props.isAuthenticated
                                    ? <AccountButton/>
                                    : <Button variant={'contained'}>
                                        Login
                                    </Button>
                            }
                        </Stack>
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
                    </Stack>
                </Toolbar>
                <Divider/>
            </AppBar>
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
