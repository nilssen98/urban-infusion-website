import {Autocomplete, Box, Stack, TextField, Typography, useTheme} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import SortByAlphaOutlinedIcon from '@mui/icons-material/SortByAlphaOutlined';
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import {ReactElement} from 'react';
import {enumValues} from '../../../utils/utils';
import {OrderOption, SortOption} from '../../../containers/Pages/Products';
import {capitalize} from 'lodash-es';

interface Props {
    sort: SortOption;
    order: OrderOption;
    onSort: (sort: SortOption) => void;
    onOrder: (order: OrderOption) => void;
}

export default function ProductsFilter(props: Props) {
    const theme = useTheme();

    const handleSort = (newValue: SortOption) => {
        props.onSort(newValue);
    };

    const handleOrder = (newValue: OrderOption) => {
        props.onOrder(newValue);
    };

    const getIcon = (option: OrderOption | SortOption): ReactElement => {
        return {
            [OrderOption.ASCENDING]: <ArrowUpwardIcon/>,
            [OrderOption.DESCENDING]: <ArrowDownwardIcon/>,
            [SortOption.NAME]: <SortByAlphaOutlinedIcon/>,
            [SortOption.PRICE]: <AttachMoneyOutlinedIcon/>,
            [SortOption.DISCOUNT]: <LocalOfferOutlinedIcon/>,
            [SortOption.WEIGHT]: <MonitorWeightOutlinedIcon/>,
        }[option] || <></>;
    };

    return (
        <>
            <Stack
                direction={'row'}
                spacing={4}
                alignItems={'start'}
            >
                <Autocomplete
                    defaultValue={SortOption.NAME}
                    value={props.sort}
                    onChange={(_, newValue) => {
                        handleSort(newValue as SortOption);
                    }}
                    disableClearable
                    size={'small'}
                    getOptionLabel={(option) => capitalize(option)}
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
                    value={props.order}
                    onChange={(_, newValue) => {
                        handleOrder(newValue as OrderOption);
                    }}
                    defaultValue={OrderOption.DESCENDING}
                    disableClearable
                    size={'small'}
                    getOptionLabel={(option) => capitalize(option)}
                    renderOption={(boxProps, option) => (
                        <Box component={'li'} {...boxProps}>
                            <Typography flex={1} textTransform={'capitalize'}>{option}</Typography>
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
        </>
    );
}
