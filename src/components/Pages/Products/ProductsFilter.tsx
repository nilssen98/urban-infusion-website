import {Autocomplete, Box, InputAdornment, Stack, TextField, Typography, useTheme} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import SortByAlphaOutlinedIcon from '@mui/icons-material/SortByAlphaOutlined';
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import {capitalize} from 'lodash-es';

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

const orderOptions = [
    {name: 'ascending', icon: <ArrowUpwardIcon/>},
    {name: 'descending', icon: <ArrowDownwardIcon/>}
];

const sortOptions = [
    {name: 'price', icon: <AttachMoneyOutlinedIcon/>},
    {name: 'name', icon: <SortByAlphaOutlinedIcon/>},
    {name: 'discount', icon: <LocalOfferOutlinedIcon/>},
    {name: 'weight', icon: <MonitorWeightOutlinedIcon/>},
];

export default function ProductsFilter() {
    const theme = useTheme();
    // @ts-ignore
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
                        disableClearable
                        size={'small'}
                        getOptionLabel={(option) => capitalize(option.name)}
                        renderOption={(props, option) => (
                            <Box component={'li'} {...props}>
                                <Typography flex={1} textTransform={'capitalize'}>{option.name}</Typography>
                                {option.icon}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{width: 175}}
                                label={'Sort by'}
                            />
                        )}
                        options={sortOptions}
                    />
                    <Autocomplete
                        disableClearable
                        size={'small'}
                        getOptionLabel={(option) => capitalize(option.name)}
                        renderOption={(props, option) => (
                            <Box component={'li'} {...props}>
                                <Typography flex={1} textTransform={'capitalize'}>{option.name}</Typography>
                                {option.icon}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{width: 175}}
                                label={'Order by'}
                            />
                        )}
                        options={orderOptions}
                    />
                </Stack>
            </Stack>
        </>
    );
}
