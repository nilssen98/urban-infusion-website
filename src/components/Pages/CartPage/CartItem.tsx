import {Box, Stack, Typography} from '@mui/material';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';

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
                <Box
                    height={120}
                    sx={{
                        objectFit: 'contain',
                    }}
                >
                    <img
                        src={props.item.image}
                        alt={'Product image'}
                        style={{objectFit: 'contain', height: 'inherit'}}
                        draggable={false}
                    />
                </Box>
                <Typography flex={1}>{props.item.title}</Typography>
                <Typography flex={1}>{props.item.description}</Typography>
                <Typography flex={1}>{props.count}</Typography>
                <Typography flex={1}>{props.item.price}</Typography>
            </Stack>
        </>
    );
}
