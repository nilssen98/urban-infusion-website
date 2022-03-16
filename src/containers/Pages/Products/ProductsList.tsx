import {Typography} from '@mui/material';
import ProductCard from './ProductCard';

interface Props {
    id?: string;
}

export function ProductsList(props: Props) {
    return (
        <>
            <Typography>{props.id}</Typography>
            <ProductCard
                title={'Title'}
                price={'$9.99'}
                image_url={'https://i.imgur.com/ZG4W7Le.jpg'}
            />
        </>
    );
}
