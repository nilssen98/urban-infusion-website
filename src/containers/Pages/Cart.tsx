import Section from '../../components/Wrappers/Section';
import {RootState, store} from '../../state/store';
import CartItemList from '../../components/Pages/CartPage/CartItemList';
import {CartItem, cartSlice, selectCartItems} from '../../state/slices/cart';
import {connect} from 'react-redux';
import {useEffect} from 'react';
import {Category} from '../../api/urbaninfusion/dto/categories-dto';
import Page from '../../components/Wrappers/Page';
import {useTheme} from '@mui/material';

const dummyData: CartItem[] = [
    {
        id: 0,
        price: 10,
        discount: 0.5,
        imageId: null,
        title: 'Some crazy item',
        description: 'This item is crazy',
        weight: '50kg',
        comments: [],
        category: 'Tea'
    },
    {
        id: 1,
        price: 20,
        discount: 0.0,
        imageId: null,
        title: 'Very nice item',
        description: 'This item is very nice',
        weight: '65kg',
        comments: [],
        category: 'Tea'
    }
];

type Props = StateProps;

function Cart(props: Props) {
    const theme = useTheme();

    useEffect(() => {
        if (props.cart.length < 1) {
            store.dispatch(cartSlice.actions.set(dummyData));
        }
    });

    return (
        <>
            <Page>
                <Section>
                    <CartItemList items={props.cart}/>
                </Section>
            </Page>
        </>
    );
}

interface StateProps {
    cart: CartItem[];
}

function mapStateToProps(state: RootState): StateProps {
    return {
        cart: selectCartItems(state.cart).map(item => item),
    };
}

export default connect(mapStateToProps)(Cart);
