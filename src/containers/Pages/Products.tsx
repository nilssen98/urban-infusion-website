import {Box, Divider, Stack, Typography, useTheme} from '@mui/material';
import {ProductsList} from '../../components/Pages/Products/ProductsList';
import {useParams} from 'react-router-dom';
import Page from '../../components/Wrappers/Page';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';
import useProducts from '../../hooks/products/useProducts';
import ProductsFilter from '../../components/Pages/Products/ProductsFilter';

export default function Products() {
    const {isLoading, data: products} = useProducts();
    const theme = useTheme();
    const {id} = useParams();

    const filteredProducts = (): ProductDto[] | undefined => {
        const filtered_products = products?.filter(product => product.category.toLowerCase() === id?.toLowerCase());
        return filtered_products?.length === 0 ? products : filtered_products;
    };

    return (
        <>
            <Page isLoading={isLoading}>
                <Stack direction={'column'} alignItems={'center'}>
                    <ProductsFilter/>
                    <Divider flexItem/>
                    <Box width={'100%'} maxWidth={theme.breakpoints.values.lg}>
                        {
                            products ? (
                                <ProductsList products={filteredProducts()} id={id}/>
                            ) : (
                                <Stack
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    width={'100%'}
                                    height={`calc(100vh - ${theme.mixins.toolbar.minHeight}px)`}
                                >
                                    <Typography variant={'h5'} component={'h1'}>No products to show!</Typography>
                                </Stack>
                            )
                        }
                    </Box>
                </Stack>
            </Page>
        </>
    );
}
