<<<<<<< HEAD
import {Box, Grid, Stack, Typography, useTheme} from "@mui/material";
=======
import {Box, Typography} from '@mui/material';
>>>>>>> 56baf5cdf1d63451b506de8468310a7926cfab41


export default function PersonalInformation() {
    const theme = useTheme();
    return (
        <>
            <Stack
                direction={{xs: 'column', md: 'row'}}
                sx={{
                    padding: 10,
                    width: '100%',
                    border: '1px solid red'
                }}
            >
                <Box
                    sx={{
                        border: '1px solid blue',
                        backgroundColor: theme.palette.secondary.light,
                        flex: {md: 1}
                    }}>
                    <Typography
                        variant={'h4'}
                        sx={{
                            py: 10,
                            px: 5,
                            width: '100%',
                            textAlign: 'center'
                        }}
                    >Personal Information</Typography>
                </Box>
                <Box
                    sx={{
                        border: '1px solid yellow',
                        flex: {md: '2'},
                    }}
                >
                    <Typography
                        align={'center'}
                        sx={{
                            width: '100%'
                        }}
                    >Hi</Typography>
                </Box>
            </Stack>
        </>
    );
}
