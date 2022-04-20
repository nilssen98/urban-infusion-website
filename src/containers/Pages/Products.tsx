import {Box, Divider, Stack, Typography, useTheme} from '@mui/material';
import {getProducts} from '../../api/urbaninfusion/public/products';
import {ProductsList} from '../../components/Pages/Products/ProductsList';
import {useParams} from 'react-router-dom';
import Page from '../../components/Wrappers/Page';
import {useQuery} from 'react-query';
import {getCategories} from '../../api/urbaninfusion/public/categories';
import {Category} from '../../api/urbaninfusion/dto/categories-dto';
import {useState} from 'react';
import TabNavigation from '../../components/TabNavigation';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';

export default function Products() {
    const {isLoading, data: products}:
        { isLoading: boolean, data?: ProductDto[] } = useQuery(
        'products',
        () => getProducts()
    );

    const {isLoading: isLoadingCategories, data: categories}:
        { isLoading: boolean, data?: Category[] } = useQuery(
        'categories',
        () => getCategories()
    );

    const [currentTab, setCurrentTab] = useState<number>(0);

    const {id} = useParams();
    const theme = useTheme();

    const filteredCategories = (): Array<Category | string> => {
        return categories?.reduce((acc: Array<Category | string>, curr: Category) => {
            acc.push(curr);
            return acc;
        }, ['all']) || [];
    };

    const filteredProducts = (): ProductDto[] | undefined => {
        return Object.values(Category).includes(filteredCategories()[currentTab] as Category)
            ? products?.filter(product => product.category === filteredCategories()[currentTab])
            : products;
    };

    return (
        <>
            <Page isLoading={isLoading || isLoadingCategories}>
                <Stack direction={'column'} alignItems={'center'}>
                    <Box width={'100%'} maxWidth={theme.breakpoints.values.lg}>
                        <TabNavigation
                            tabs={filteredCategories()}
                            currentTab={currentTab}
                            onChange={(newValue) => setCurrentTab(newValue)}
                        />
                    </Box>
                    <Divider flexItem/>
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
