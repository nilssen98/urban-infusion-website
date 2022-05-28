import {Divider, Stack, Typography, useTheme} from '@mui/material';
import {useParams} from 'react-router-dom';
import Page from '../../components/Wrappers/Page';
import useProducts from '../../hooks/products/useProducts';
import {useMemo, useState} from 'react';
import ProductsFilter from '../../components/Pages/Products/ProductsFilter';
import {defaultProductImageURL, getProductImageURL} from '../../utils/productImageUtils';
import ProductCard from '../../components/Cards/ProductCard';

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
    const theme = useTheme();
    const {id} = useParams();

    const [order, setOrder] = useState<OrderOption>(OrderOption.DESCENDING);
    const [sort, setSort] = useState<SortOption>(SortOption.NAME);

    const filtered = useMemo(() => {
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

        return temp;
    }, [products, id, sort, order]);

    const onSort = (newValue: SortOption) => {
        setSort(newValue);
    };

    const onOrder = (newValue: OrderOption) => {
        setOrder(newValue);
    };

    return (
        <>
            <Page isLoading={isLoading}>
                <Stack width={'100%'} alignItems={'center'} px={4}>
                    <Stack
                        maxWidth={theme.breakpoints.values.lg}
                        width={'100%'}
                        py={4}
                    >
                        <ProductsFilter
                            sort={sort}
                            order={order}
                            onSort={onSort}
                            onOrder={onOrder}
                        />
                    </Stack>
                    <Divider flexItem sx={{width: '100vw', marginLeft: -4}}/>
                    <Stack
                        py={4}
                        maxWidth={theme.breakpoints.values.lg}
                        width={'100%'}
                    >
                        {
                            filtered && filtered.length > 0 ? (
                                <Stack
                                    flexWrap={'wrap'}
                                    direction={'row'}
                                    gap={4}
                                    overflow={'auto'}
                                >
                                    {
                                        filtered.map(product => (<ProductCard
                                            data={product}
                                            key={product.id}
                                            img={product.imageId
                                                ? `${getProductImageURL(product.imageId)}`
                                                : defaultProductImageURL}
                                        />))
                                    }
                                </Stack>
                            ) : (
                                <Stack
                                    color={theme.palette.text.disabled}
                                    width={'100%'}
                                >
                                    <Typography variant={'h5'}>No products</Typography>
                                </Stack>
                            )
                        }
                    </Stack>
                </Stack>
            </Page>
        </>
    );
}
