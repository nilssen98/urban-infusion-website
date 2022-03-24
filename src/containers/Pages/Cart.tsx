import Section from '../../components/Wrappers/Section';
import {store} from '../../state/store';
import CartItem from '../../components/Pages/Cart/CartItem';

export default function Cart() {
    const cartItems = store.getState().cart.items;
    return (
        <>
            <Section>
                {
                    cartItems.map(item =>
                        <CartItem item={item}/>
                    )
                }
            </Section>
        </>
    );
}
