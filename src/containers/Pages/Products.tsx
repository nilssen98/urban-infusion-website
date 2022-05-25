import {Box, Divider, Stack, Typography, useTheme} from '@mui/material';
import {ProductsList} from '../../components/Pages/Products/ProductsList';
import {useParams} from 'react-router-dom';
import Page from '../../components/Wrappers/Page';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';
import useProducts from '../../hooks/products/useProducts';
import {useEffect, useState} from 'react';
import ProductsFilter from '../../components/Pages/Products/ProductsFilter';

export enum OrderOption {
    ASCENDING = 'ascending',
    DESCENDING = 'descending',
}

export enum SortOption {
    PRICE = 'price',
    NAME = 'name',
    DISCOUNT = 'discount',
    WEIGHT = 'weight'
}

export default function Products() {
    const {isLoading, data: products} = useProducts();
    const [filtered, setFiltered] = useState<ProductDto[]>();
    const theme = useTheme();
    const {id} = useParams();

    const [order, setOrder] = useState<OrderOption>(OrderOption.DESCENDING);
    const [sort, setSort] = useState<SortOption>(SortOption.NAME);

    useEffect(() => {
        applyFilters();
    }, [products, id, sort, order]);

    const applyFilters = () => {
        let temp = [...(products || [])];

        temp = temp.filter(product =>
            id === 'all' || id?.toLowerCase() === product.category.toLowerCase()
        );

        temp = {
            [SortOption.NAME]: () => temp.sort((a, b) => a.title.localeCompare(b.title)),
            [SortOption.PRICE]: () => temp.sort((a, b) => b.price - a.price),
            [SortOption.DISCOUNT]: () => temp.sort((a, b) => b.discount - a.discount),
            [SortOption.WEIGHT]: () => temp.sort((a, b) => a.title.localeCompare(b.title)),
        }[sort]() || temp;

        if (order === OrderOption.ASCENDING) {
            temp = temp.reverse();
        }

        setFiltered(temp);
    };

    const onSort = (newValue: SortOption) => {
        setSort(newValue);
    };

    const onOrder = (newValue: OrderOption) => {
        setOrder(newValue);
    };

    return (
        <>
            <Page isLoading={isLoading}>
                <Stack direction={'column'} alignItems={'center'}>
                    <ProductsFilter
                        sort={sort}
                        order={order}
                        onSort={onSort}
                        onOrder={onOrder}
                    />
                    <Divider flexItem/>
                    <Box width={'100%'} maxWidth={theme.breakpoints.values.lg}>
                        {
                            filtered && filtered.length > 0 ? (
                                <ProductsList products={filtered}/>
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
