import {Avatar, Divider, Stack, Typography} from '@mui/material';

interface Props {
    id?: number;
    username?: string;
    text?: string;
    lastUpdated?: string;
    created?: string;
}

export default function Comment(props: Props) {

    function firstLetterOfUsername(username: string | undefined): string {
        return username ? username.charAt(0).toUpperCase() : '';
    }

    return (
        <>
            <Stack direction={'column'} minHeight={200} width={'100%'} gap={10} sx={{border: '1px solid grey'}}>
                <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2}>
                    <Avatar>{firstLetterOfUsername(props.username)}</Avatar>
                    <Stack direction={'column'}>
                        <Typography variant={'body1'}>
                            {`${props.username} on ${props.created}`}
                        </Typography>
                        <Typography variant={'body2'}>
                            {`Last updated: ${props.lastUpdated ? props.lastUpdated : 'Never'}`}
                        </Typography>
                    </Stack>
                </Stack>
                <Typography variant={'body2'} sx={{fontStyle: 'italic'}}>
                    {`'${props.text}'`}
                </Typography>
            </Stack>
        </>
    );
}
