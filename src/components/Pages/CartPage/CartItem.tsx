import {Stack, Typography} from '@mui/material';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import PictureBox from '../../PictureBox';

interface Props {
    item: ProductDto;
    count: number;
}

export default function CartItem(props: Props) {

    return (
        <>
            <Stack
                direction={'row'}
                sx={{
                    minHeight: 128,
                    marginTop: 4,
                    border: '1px solid blue'
                }}
            >
                <Typography flex={1}>{props.item.title}</Typography>
                <Typography flex={1}>{props.item.description}</Typography>
                <Typography flex={1}>{props.count}</Typography>
                <Typography flex={1}>{props.item.price}</Typography>
            </Stack>
        </>
    );
}
