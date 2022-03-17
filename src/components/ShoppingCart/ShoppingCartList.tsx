import {List, Menu, MenuList} from '@mui/material';
import ShoppingCartItem from './ShoppingCartItem';
import {CartItem} from './ShoppingCartProps';
import {MenuProps} from '@mui/material/Menu/Menu';

type Props = {
    items: CartItem[];
} & MenuProps;

export default function ShoppingCartList(props: Props) {
    return (
        <>
            <Menu
                {...props}
                PaperProps={{
                    style: {
                        maxHeight: 500,
                        width: 350,
                    },
                }}
            >
                <MenuList>
                    {
                        props.items.map((item, i) => (
                            <ShoppingCartItem key={i} item={item}/>
                        ))
                    }
                </MenuList>
            </Menu>
        </>
    );
}
