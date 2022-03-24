import {Stack, Typography} from '@mui/material';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';

interface Props {
    item: ProductDto;
}

export default function CartItem(props: Props) {
    return (
        <>
            <Stack>
                <Typography>{props.item.image}</Typography>
                <Typography>{props.item.title}</Typography>
                <Typography>{props.item.description}</Typography>
            </Stack>
        </>
    );
}
