import {CartItem} from './ShoppingCartProps';
import {Box, MenuItem, Typography} from '@mui/material';
import {MenuItemProps} from '@mui/material/MenuItem/MenuItem';

type Props = {
    item: CartItem;
    onRemove?: () => void;
} & MenuItemProps;

export default function ShoppingCartItem(props: Props) {
    return (
        <>
            <MenuItem
                {...props}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box>
                    <Typography>{props.item.image}</Typography>
                    <Typography>{props.item.price}</Typography>
                    <Typography>{props.item.title}</Typography>
                    <Typography>{props.item.description}</Typography>
                </Box>
            </MenuItem>
        </>
    );
}
