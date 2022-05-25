import ProductCard from '../../Cards/ProductCard';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import {Stack, useTheme} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {defaultProductImageURL, getProductImageURL} from '../../../utils/productImageUtils';

interface Props {
    products?: ProductDto[];
}

export function ProductsList(props: Props) {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <>
            <Stack
                flexWrap={'wrap'}
                direction={'row'}
                gap={4}
                overflow={'auto'}
            >
                {
                    props.products?.map(product =>
                        <ProductCard
                            data={product}
                            key={product.id}
                            img={product.imageId
                                ? getProductImageURL(product.imageId)
                                : defaultProductImageURL}
                        />
                    )
                }
            </Stack>
        </>
    );
}
