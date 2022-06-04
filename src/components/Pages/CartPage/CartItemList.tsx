import {Box, Button, Divider, Stack, Typography} from '@mui/material';
import {CartItem} from '../../../state/slices/cart';
import {getProductImageURL} from '../../../api/urbaninfusion/public/products';
import {round} from 'lodash-es';

interface Props {
    items: CartItem[];
}

export default function CartItemList(props: Props) {


    return (
        <>

        </>
    );
}
