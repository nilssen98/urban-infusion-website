import Section from '../../components/Wrappers/Section';
import {RootState} from '../../state/store';
import {CartItem, cartSlice} from '../../state/slices/cart';
import {connect} from 'react-redux';
import Page from '../../components/Wrappers/Page';
import {Button, Divider, Stack, Typography, useTheme} from '@mui/material';
import {getProductImageURL} from '../../api/urbaninfusion/public/products';
import {countBy, round, uniqBy} from 'lodash-es';
import UnstyledLink from '../../components/UnstyledLink';
import Counter from '../../components/Counter';

const mapStateToProps = (state: RootState) => {
    return {
        cart: state.cart.items,
    };
};

const mapDispatchToProps = {
    addOne: cartSlice.actions.addOne,
    removeOne: cartSlice.actions.removeOne,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

interface CountedCartItem {
    item: CartItem;
    count: number;
}

function Cart(props: Props) {
    const theme = useTheme();

    const getCartItems = (): CountedCartItem[] => {
        const counts = countBy(props.cart, 'id');
        return uniqBy(props.cart, 'id')
            .map(e => ({item: e, count: counts[e.id]}))
            .sort((a, b) => {
                return b.item.id - a.item.id;
            });
    };

    const getItemCount = (item: CartItem): number => {
        return props.cart.filter(e => e.id === item.id).length;
    };

    const getItemPrice = (item: CartItem): number => {
        return round(item.price - (item.price * item.discount), 2);
    };

    const getItemTotalPrice = (item: CartItem): number => {
        return round(getItemCount(item) * (item.price - (item.price * item.discount)), 2);
    };

    const getTotalPrice = (): number => {
        return round(props.cart.reduce((acc, curr) => {
            return acc + (curr.price - (curr.price * curr.discount));
        }, 0), 2);
    };

    const getTotalSavings = (): number => {
        return round(props.cart.reduce((acc, curr) => {
            if (curr.discount > 0) {
                return acc + (curr.price * curr.discount);
            } else {
                return acc;
            }
        }, 0), 2);
    };

    const handleIncreaseCount = (item: CartItem) => {
        props.addOne(item);
    };

    const handleDecreaseCount = (item: CartItem) => {
        props.removeOne(item);
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
                                            getCartItems().map(({item, count}) => (
                                                <Stack direction={'row'} alignItems={'center'} key={item.id}>
                                                    <Stack flex={1} direction={'row'} alignItems={'center'} spacing={2}>
                                                        <UnstyledLink to={`/product/${item.id}`}>
                                                            <img
                                                                style={{height: 64, width: 64}}
                                                                src={getProductImageURL(item.imageId)}
                                                                alt={''}
                                                            />
                                                        </UnstyledLink>
                                                        <UnstyledLink to={`/product/${item.id}`}>
                                                            <Stack flex={1} textAlign={'left'}>
                                                                <Typography>
                                                                    {item.title}
                                                                </Typography>
                                                                <Typography variant={'body2'} color={theme.palette.text.secondary}>
                                                                    {item.weight}
                                                                </Typography>
                                                            </Stack>
                                                        </UnstyledLink>
                                                    </Stack>
                                                    <Typography flex={1}>${getItemPrice(item)}</Typography>
                                                    <Stack flex={1}>
                                                        <Counter
                                                            sx={{alignSelf: 'end'}}
                                                            count={count}
                                                            onIncrement={() => handleIncreaseCount(item)}
                                                            onDecrement={() => handleDecreaseCount(item)}
                                                        />
                                                    </Stack>
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
                                            <Typography sx={{color: theme.palette.success.main}}>
                                                Savings on this order
                                            </Typography>
                                            <Typography fontWeight={600} sx={{color: theme.palette.success.main}}>
                                                ${getTotalSavings()}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    <Divider/>
                                    <Stack alignItems={'end'}>
                                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                            <UnstyledLink to={'/products/all'}>
                                                <Button size={'large'}>Continue shopping</Button>
                                            </UnstyledLink>
                                            <UnstyledLink to={'/checkout'}>
                                                <Button variant={'contained'} size={'large'}>Checkout</Button>
                                            </UnstyledLink>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            )
                            : (
                                <Stack width={'100%'} height={500} justifyContent={'center'} alignItems={'center'}
                                       spacing={4}>
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
