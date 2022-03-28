import ProductCard from '../../ProductCard';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import {Box} from '@mui/material';
import {range} from 'lodash-es';

interface Props {
    id?: string;
    products: ProductDto[];
}

export function ProductsList(props: Props) {

    return (
        <>
            <Box
                paddingTop={8}
                paddingBottom={8}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    width: '100%',
                    rowGap: 12,
                    columnGap: 12,
                }}
            >
                {
                    range(3).map(item =>
                        <ProductCard
                            key={item}
                            title={'Title'}
                            price={9.99}
                            image_url={'https://i.imgur.com/ZG4W7Le.jpg'}
                        />
                    )
                }
                {
                    props.products.map(product =>
                        <ProductCard
                            key={product.id}
                            title={product.title}
                            price={product.price}
                            image_url={'https://i.imgur.com/ZG4W7Le.jpg'}
                        />
                    )
                }
            </Box>
        </>
    );
}
