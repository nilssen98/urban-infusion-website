import {Box, Stack, Typography, useTheme} from '@mui/material';
import {getProducts} from '../../api/urbaninfusion/public/products';
import {ProductsList} from '../../components/Pages/Products/ProductsList';
import {useParams} from 'react-router-dom';
import Page from '../../components/Wrappers/Page';
import {useQuery} from 'react-query';
import {getCategories} from '../../api/urbaninfusion/public/categories';
import {Category} from '../../api/urbaninfusion/dto/categories-dto';
import {ReactElement, useState} from 'react';
import TabNavigation, {TabProps} from '../../components/TabNavigation';
import FreeBreakfastOutlinedIcon from '@mui/icons-material/FreeBreakfastOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';

export default function Products() {
    const {isLoading, data: products}:
        { isLoading: boolean, data?: ProductDto[] } = useQuery(
        'products',
        () => getProducts()
    );

    const {isLoading: isLoadingCategories, data: categories}:
        { isLoading: boolean, data?: TabProps[] } = useQuery(
        'categories',
        async () => {
            const temp_categories = await getCategories();
            return temp_categories.reduce(
                (acc: TabProps[], curr: Category) => {
                    acc.push({
                        name: curr,
                        icon: getIconForCategory(curr as Category)
                    });
                    return acc;
                }, []);
        }
    );

    const [tab, setTab] = useState<number>(0);

    const {id} = useParams();
    const theme = useTheme();

    const getIconForCategory = (category: Category): ReactElement => {
        switch (category) {
            case Category.TEA:
                return <FreeBreakfastOutlinedIcon/>;
            case Category.ACCESSORIES:
                return <CategoryOutlinedIcon/>;
            default:
                return <></>;
        }
    };

    const filteredProducts = () => categories
        ? products?.filter(product => product.category === categories[tab].name)
        : products;

    return (
        <>
            <Page isLoading={isLoading || isLoadingCategories}>
                <Box>
                    {
                        categories && (
                            <TabNavigation
                                tabs={categories}
                                currentTab={tab}
                                onChange={(newValue) => setTab(newValue)}
                            />
                        )
                    }
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
