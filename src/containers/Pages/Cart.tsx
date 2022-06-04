import Section from '../../components/Wrappers/Section';
import {RootState} from '../../state/store';
import {CartItem, selectCartItems} from '../../state/slices/cart';
import {connect} from 'react-redux';
import {ReactElement} from 'react';
import Page from '../../components/Wrappers/Page';
import {Button, Divider, Stack, Typography, useTheme} from '@mui/material';
import {getProductImageURL} from '../../api/urbaninfusion/public/products';
import {round} from 'lodash-es';
import UnstyledLink from '../../components/UnstyledLink';

const mapStateToProps = (state: RootState) => {
    return {
        cart: selectCartItems(state.cart).map(item => item),
    };
};

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {
    children?: ReactElement;
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

function Cart(props: Props) {
    const theme = useTheme();

    const getItemCount = (item: CartItem): number => {
        return props.cart.filter(e => e.id === item.id).length;
    };

    const getItemPrice = (item: CartItem): number => {
        return round(item.price - (item.price * item.discount), 2);
    };

    const getItemTotalPrice = (item: CartItem): number => {
        return round(getItemCount(item) * (item.price - (item.price * item.discount)), 2);
    };

    const getTotalPrice = () => {
        return round(props.cart.reduce((acc, curr) => {
            return acc + (curr.price - (curr.price * curr.discount));
        }, 0), 2);
    };

    const getTotalSavings = () => {
        return round(props.cart.reduce((acc, curr) => {
            if (curr.discount > 0) {
                return acc + (curr.price - (curr.price * curr.discount));
            } else {
                return acc;
            }
        }, 0), 2);
    };

    return (
        <>
            <Page>
                <Section>
                    {
                        props.cart.length > 0
                            ? (
                                <Stack direction={'column'} width={'100%'} textAlign={'right'} spacing={4}>
                                    <Stack direction={'row'}>
                                        <Typography flex={1} textAlign={'left'}>Product</Typography>
                                        <Typography flex={1}>Price</Typography>
                                        <Typography flex={1}>Quantity</Typography>
                                        <Typography flex={1}>Total</Typography>
                                    </Stack>
                                    <Divider/>
                                    <Stack spacing={4}>
                                        {
                                            props.cart.map(item => (
                                                <Stack direction={'row'} alignItems={'center'} key={item.id}>
                                                    <Stack flex={1} direction={'row'} alignItems={'center'} spacing={2}>
                                                        <img
                                                            style={{height: 64, width: 64}}
                                                            src={getProductImageURL(item.imageId)}
                                                            alt={''}
                                                        />
                                                        <Typography flex={1} textAlign={'left'}>{item.title}</Typography>
                                                    </Stack>
                                                    <Typography flex={1}>${getItemPrice(item)}</Typography>
                                                    <Typography flex={1}>{getItemCount(item)}</Typography>
                                                    <Typography flex={1}>${getItemTotalPrice(item)}</Typography>
                                                </Stack>
                                            ))
                                        }
                                    </Stack>
                                    <Divider/>
                                    <Stack spacing={2}>
                                        <Stack justifyContent={'space-between'} direction={'row'}>
                                            <Typography>Subtotal</Typography>
                                            <Typography fontWeight={600}>${getTotalPrice()}</Typography>
                                        </Stack>
                                        <Stack justifyContent={'space-between'} direction={'row'}>
                                            <Typography>Savings on this order</Typography>
                                            <Typography fontWeight={600}
                                                        sx={{color: theme.palette.success.main}}>${getTotalSavings()}</Typography>
                                        </Stack>
                                    </Stack>
                                    <Divider/>
                                    <Stack alignItems={'end'}>
                                        <Stack direction={'row'} spacing={4}>
                                            <UnstyledLink to={'/products/all'}>
                                                <Button>Continue shopping</Button>
                                            </UnstyledLink>
                                            <UnstyledLink to={'/checkout'}>
                                                <Button variant={'contained'} size={'large'}>Checkout</Button>
                                            </UnstyledLink>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            )
                            : (
                                <Stack width={'100%'} height={500} justifyContent={'center'} alignItems={'center'} spacing={4}>
                                    <Typography variant={'h5'}>The cart is empty</Typography>
                                    <UnstyledLink to={'/products/all'}>
                                        <Button variant={'contained'}>Continue shopping</Button>
                                    </UnstyledLink>
                                </Stack>
                            )
                    }
                </Section>
            </Page>
        </>
    );
}
