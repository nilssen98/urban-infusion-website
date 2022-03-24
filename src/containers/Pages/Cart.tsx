import Section from '../../components/Wrappers/Section';
import {store} from '../../state/store';
import CartItemList from '../../components/Pages/Cart/CartItemList';

export default function Cart() {
    const cartItems = store.getState().cart.items;
    return (
        <>
            <Section>
                <CartItemList items={cartItems}/>
            </Section>
        </>
    );
}
