import {Box, Divider, Stack, Typography, useTheme} from '@mui/material';
import {getProducts} from '../../api/urbaninfusion/public/products';
import {ProductsList} from '../../components/Pages/Products/ProductsList';
import {useParams} from 'react-router-dom';
import Page from '../../components/Wrappers/Page';
import {useQuery} from 'react-query';
import {getCategories} from '../../api/urbaninfusion/public/categories';
import {Category} from '../../api/urbaninfusion/dto/categories-dto';
import {useState} from 'react';
import TabNavigation, {TabProps} from '../../components/TabNavigation';
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

    const [tab, setTab] = useState<number>(0);

    const {id} = useParams();
    const theme = useTheme();

    const filteredCategories = () => {
        return categories?.reduce((acc: TabProps[], curr: Category) => {
            acc.push({name: curr});
            return acc;
        }, [{name: 'all'}]);
    };

    const filteredProducts = () => {
        return categories && Object.values(categories).includes(categories[tab])
            ? products?.filter(product => product.category === categories[tab])
            : products;
    };

    return (
        <>
            <Page isLoading={isLoading || isLoadingCategories}>
                <Box>
                    {
                        categories && (
                            <TabNavigation
                                tabs={filteredCategories()}
                                currentTab={tab}
                                onChange={(newValue) => setTab(newValue)}
                            />
                        )
                    }
                    <Divider/>
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
            </Page>
        </>
    );
}
