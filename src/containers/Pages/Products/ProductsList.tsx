import {Typography} from '@mui/material';
import ProductCard from './ProductCard';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';

interface Props {
    id?: string;
    products: ProductDto[];
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
            {
                props.products.map(product =>
                    <ProductCard
                        title={product.title}
                        price={`$${product.price}`}
                        image_url={'https://i.imgur.com/ZG4W7Le.jpg'}
                    />
                )
            }
        </>
    );
}
