import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import {store} from '../../../state/store';
import CartItem from './CartItem';

interface Props {
    items: ProductDto[];
}

export default function CartItemList(props: Props) {
    const cartItems = store.getState().cart.items;

    return (
        <>
            {
                cartItems.map(item => (<CartItem item={item}/>))
            }
        </>
    );
}
