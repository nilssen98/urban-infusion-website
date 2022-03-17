import {Badge, IconButton} from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {CartItem} from './ShoppingCartProps';
import ShoppingCartList from './ShoppingCartList';
import {useState} from 'react';
import {range} from 'lodash-es';

interface Props {
    items: CartItem[];
}

ShoppingCart.defaultProps = {
    items: range(10).map(i => ({
        id: i,
        price: i * 10,
        title: 'Test product',
        description: 'This is a test product'
    }))
};

export default function ShoppingCart(props: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton {...props} onClick={handleClick}>
                <Badge
                    badgeContent={props.items.length}
                    color={'primary'}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <ShoppingCartOutlinedIcon color={'action'}/>
                </Badge>
            </IconButton>
            <ShoppingCartList
                anchorEl={anchorEl}
                items={props.items}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            />
        </>
    );
}
