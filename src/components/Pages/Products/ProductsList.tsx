import ProductCard from '../../Cards/ProductCard';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import {Box, Container, Stack, useTheme} from '@mui/material';
import {range} from 'lodash-es';
import ProductCardNew from '../../Cards/ProductCardNew';
import {useNavigate} from 'react-router-dom';
import {defaultProductImageURL, getProductImageURL} from '../../../utils/productImageUtils';

interface Props {
    id?: string;
    products?: ProductDto[];
}

export function ProductsList(props: Props) {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <>
            <Box
                padding={4}
                sx={{overflowY: 'auto'}}
            >
                <Stack
                    flexWrap={'wrap'}
                    direction={'row'}
                    gap={4}
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
            </Box>
        </>
    );
}
