import {Autocomplete, Stack, TextField, useTheme} from '@mui/material';

enum Order {
    ASCENDING = 'ascending',
    DESCENDING = 'descending'
}

enum SortOption {
    PRICE = 'price',
    NAME = 'name',
    DISCOUNT = 'discount',
    WEIGHT = 'weight'
}

export default function ProductsFilter() {
    const theme = useTheme();
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
                        size={'small'}
                        renderInput={(params) => (
                            <TextField {...params} sx={{width: 175}} label={'Sort by'}/>
                        )}
                        options={[]}
                    />
                    <Autocomplete
                        size={'small'}
                        renderInput={(params) => (
                            <TextField {...params} sx={{width: 125}} label={'Order'}/>
                        )}
                        options={['Ascending', 'Descending']}
                    />
                </Stack>
            </Stack>
        </>
    );
}
