import {Box, Divider, Stack, Typography, useTheme} from '@mui/material';
import {ProductsList} from '../../components/Pages/Products/ProductsList';
import {useParams} from 'react-router-dom';
import Page from '../../components/Wrappers/Page';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';
import useProducts from '../../hooks/products/useProducts';
import ProductsFilter from '../../components/Pages/Products/ProductsFilter';
import {useEffect, useState} from 'react';

export default function Products() {
    const {isLoading, data: products} = useProducts();
    const [filteredProducts, setFilteredProducts] = useState<ProductDto[] | undefined>([]);
    const theme = useTheme();
    const {id} = useParams();

    useEffect(() => {
        if (products) {
            setFilteredProducts(products);
        }
    }, [products]);

    const onFilter = (filtered?: ProductDto[]) => {
        setFilteredProducts(filtered?.filter(product => product.category.toLowerCase() === id?.toLowerCase()));
    };

    return (
        <>
            <Page isLoading={isLoading}>
                <Stack direction={'column'} alignItems={'center'}>
                    <ProductsFilter products={products} onFilter={onFilter}/>
                    <Divider flexItem/>
                    <Box width={'100%'} maxWidth={theme.breakpoints.values.lg}>
                        {
                            filteredProducts ? (
                                <ProductsList products={filteredProducts}/>
                            ) : (
                                <Stack
                                    pt={8}
                                    color={theme.palette.text.disabled}
                                    width={'100%'}
                                >
                                    <Typography variant={'h5'}>No products</Typography>
                                </Stack>
                            )
                        }
                    </Box>
                </Stack>
            </Page>
        </>
    );
}
