import {Box, Divider, Stack, Typography, useTheme} from '@mui/material';
import {ProductsList} from '../../components/Pages/Products/ProductsList';
import {useParams} from 'react-router-dom';
import Page from '../../components/Wrappers/Page';
import {Category} from '../../api/urbaninfusion/dto/categories-dto';
import {useState} from 'react';
import TabNavigation from '../../components/TabNavigation';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';
import useProducts from '../../hooks/products/useProducts';
import useCategories from '../../hooks/categories/useCategories';

export default function Products() {
    const {isLoading, data: products} = useProducts();

    const {id} = useParams();
    const theme = useTheme();

    const filteredProducts = (): ProductDto[] | undefined => {
        return Object.values(Category).includes(id as Category)
            ? products?.filter(product => product.category === id)
            : products;
    };

    return (
        <>
            <Page isLoading={isLoading}>
                <Stack direction={'column'} alignItems={'center'}>
                    <Box width={'100%'} maxWidth={theme.breakpoints.values.lg}>
                        {
                            products ? (
                                <ProductsList products={filteredProducts()} id={id}/>
                            ) : (
                                <Stack
                                    direction={'column'}
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
