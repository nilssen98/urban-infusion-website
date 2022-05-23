import {Box, CircularProgress, Stack} from '@mui/material';
import {ReactNode} from 'react';
import {SxProps} from '@mui/system';

interface Props {
    isLoading?: boolean;
    children?: ReactNode;
    sx?: SxProps;
}

export default function Page(props: Props) {
    return (
        <>
            <Box
                sx={{
                    overflow: 'auto',
                    ...props.sx
                }}
            >
                {
                    props.isLoading
                        ? (
                            <Stack alignItems={'center'} justifyContent={'center'}>
                                <CircularProgress size={64}/>
                            </Stack>
                        )
                        : props.children
                }
            </Box>
        </>
    );
}
