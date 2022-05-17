import {AppBar, Button, Divider, Stack, Toolbar, useTheme} from '@mui/material';
import Logo from '../components/Logo';
import {ReactElement} from 'react';
import {useNavigate} from 'react-router-dom';
import {RootState} from '../state/store';
import {userSlice} from '../state/slices/user';
import CartButton from '../components/AppBarNavigation/CartButton';
import AccountButton from '../components/AppBarNavigation/AccountButton';
import {connect} from 'react-redux';
import {selectCartItems} from '../state/slices/cart';
import UnstyledLink from '../components/UnstyledLink';
import ProductNavigation from './ProductNavigation';

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

export default connect(mapStateToProps, mapDispatchToProps)(TopAppBar);

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {
    children?: ReactElement;
};

function TopAppBar(props: Props) {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <>
            <AppBar
                color={'inherit'}
                position={'sticky'}
                sx={{
                    boxShadow: 0,
                }}
            >
                <Toolbar sx={{justifyContent: 'center'}} disableGutters>
                    <Stack
                        flex={1}
                        alignItems={'center'}
                    >
                        <Stack px={4} width={'100%'} direction={'row'} alignItems={'center'}>
                            <Stack>
                                <Logo clickable onClick={() => navigate('/')}/>
                            </Stack>
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
                                <CartButton itemsCount={props.cartItemCount}/>
                                {
                                    props.isAuthenticated
                                        ? <AccountButton/>
                                        : (<UnstyledLink to={'/login'}>
                                            <Button variant={'contained'}>
                                                Login
                                            </Button>
                                        </UnstyledLink>)
                                }
                            </Stack>
                        </Stack>
                        <Divider flexItem/>
                        <Stack px={4} width={'100%'} maxWidth={theme.breakpoints.values.lg}>
                            <ProductNavigation/>
                        </Stack>
                    </Stack>
                </Toolbar>
                <Divider/>
            </AppBar>
        </>
);
}
