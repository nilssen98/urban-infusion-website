import {Autocomplete, Stack, TextField, useTheme} from '@mui/material';

export default function ProductsFilter() {
    const theme = useTheme();
    return (
        <>
            <Stack width={'100%'} alignItems={'center'}>
                <Stack py={2} maxWidth={theme.breakpoints.values.lg} width={'100%'} alignItems={'start'}>
                    <Autocomplete
                        size={'small'}
                        renderInput={(params) => (
                            <TextField {...params} sx={{width: 200}} label={'Sort by'}/>
                        )}
                        options={['Price asc', 'Price desc', 'Name A-Z', 'Name Z-E']}
                    />
                </Stack>
            </Stack>
        </>
    );
}
