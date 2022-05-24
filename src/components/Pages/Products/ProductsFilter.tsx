import {Autocomplete, Box, Stack, TextField, Typography, useTheme} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import SortByAlphaOutlinedIcon from '@mui/icons-material/SortByAlphaOutlined';
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import {useEffect, useMemo, useState} from 'react';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import {enumValues} from '../../../utils/utils';

enum OrderOption {
    ASCENDING = 'ascending',
    DESCENDING = 'descending'
}

enum SortOption {
    PRICE = 'price',
    NAME = 'name',
    DISCOUNT = 'discount',
    WEIGHT = 'weight'
}

interface Props {
    products?: ProductDto[];
    onFilter: (filteredProducts?: ProductDto[]) => void;
}

export default function ProductsFilter(props: Props) {
    const [order, setOrder] = useState<OrderOption>(OrderOption.DESCENDING);
    const [sort, setSort] = useState<SortOption>(SortOption.NAME);

    const theme = useTheme();

    const filteredProducts = useMemo(() => {
        const filtered = props.products;
        switch (sort) {
            case SortOption.NAME:
                return filtered?.sort((a, b) => a.title.localeCompare(b.title));
            case SortOption.PRICE:
                return filtered?.sort((a, b) => b.price - a.price);
            case SortOption.DISCOUNT:
                return filtered?.sort((a, b) => b.discount - a.discount);
            case SortOption.WEIGHT:
                return filtered?.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return filtered;
        }
    }, [props.products, sort, order]);


    useEffect(() => {
        if (props.products) {
            applyFilter();
        }
    }, [props.products]);

    const applyFilter = () => {
        props.onFilter(filteredProducts);
    };

    useEffect(() => {
        console.log(filteredProducts);
    }, [filteredProducts]);

    const getIcon = (option: OrderOption | SortOption) => {
        switch (option) {
            case OrderOption.ASCENDING:
                return <ArrowUpwardIcon/>;
            case OrderOption.DESCENDING:
                return <ArrowDownwardIcon/>;
            case SortOption.NAME:
                return <SortByAlphaOutlinedIcon/>;
            case SortOption.PRICE:
                return <AttachMoneyOutlinedIcon/>;
            case SortOption.DISCOUNT:
                return <LocalOfferOutlinedIcon/>;
            case SortOption.WEIGHT:
                return <MonitorWeightOutlinedIcon/>;
            default:
                return <></>;
        }
    };

    return (
        <>
            <Stack width={'100%'} alignItems={'center'}>
                <Stack
                    direction={'row'}
                    spacing={2}
                    py={4}
                    maxWidth={theme.breakpoints.values.lg}
                    width={'100%'}
                    alignItems={'start'}
                >
                    <Autocomplete
                        defaultValue={SortOption.NAME}
                        value={sort}
                        onChange={(_, newValue) => {
                            setSort(newValue as SortOption);
                            applyFilter();
                        }}
                        disableClearable
                        size={'small'}
                        renderOption={(boxProps, option) => (
                            <Box component={'li'} {...boxProps}>
                                <Typography flex={1} textTransform={'capitalize'}>{option}</Typography>
                                {getIcon(option as SortOption)}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{width: 175}}
                                label={'Sort by'}
                            />
                        )}
                        options={enumValues(SortOption)}
                    />
                    <Autocomplete
                        value={order}
                        onChange={(_, newValue) => {
                            setOrder(newValue as OrderOption);
                            applyFilter();
                        }}
                        defaultValue={OrderOption.DESCENDING}
                        disableClearable
                        size={'small'}
                        renderOption={(boxProps, option) => (
                            <Box component={'li'} {...boxProps}>
                                <Typography flex={1}>{option}</Typography>
                                {getIcon(option as OrderOption)}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{width: 175}}
                                label={'Order by'}
                            />
                        )}
                        options={enumValues(OrderOption)}
                    />
                </Stack>
            </Stack>
        </>
    );
}
