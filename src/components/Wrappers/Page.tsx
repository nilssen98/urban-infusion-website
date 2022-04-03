import {CircularProgress, Stack} from '@mui/material';
import {ReactNode} from 'react';

interface Props {
    isLoading?: boolean;
    children?: ReactNode;
}

export default function Page(props: Props) {
    return (
        <>
            <Stack alignItems={'center'} justifyContent={'center'}>
                {
                    props.isLoading
                        ? (
                            <CircularProgress size={64}/>
                        )
                        : props.children
                }
            </Stack>
        </>
    );
}
