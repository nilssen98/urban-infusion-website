import {Avatar, Button, Divider, Stack, Tooltip, Typography} from '@mui/material';
import {formatDate} from '../../../utils/dateParser';
import {stringToColor} from '../../../utils/avatarUtils';

interface Props {
    id?: number;
    username?: string;
    text?: string;
    lastUpdated?: string;
    created?: string;
}

export default function Comment(props: Props) {

    return (
        <>
            <Stack direction={'column'} minHeight={200} width={'100%'} gap={3}>
                <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2} margin={3} marginBottom={1}>
                    <Tooltip arrow title={props.username as string}>
                        <Avatar
                            sx={{bgcolor: `${stringToColor(props.username)}`}}
                        >
                            {props.username?.[0]}
                        </Avatar>
                    </Tooltip>
                    <Stack direction={'column'}>
                        <Typography variant={'body1'}>
                            {`${props.username} on ${formatDate(props.created as string)}`}
                        </Typography>
                        <Typography variant={'body2'}>
                            {`Last updated: ${props.lastUpdated ? formatDate(props.lastUpdated) : 'Never'}`}
                        </Typography>
                    </Stack>
                </Stack>
                <Divider variant={'middle'}/>
                <Typography variant={'body2'} ml={3} mr={3} mb={1} flexGrow={2} sx={{fontStyle: 'italic'}}>
                    {`'${props.text}'`}
                </Typography>
                <Stack direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
                    <Button variant={'outlined'}>Edit comment</Button>
                </Stack>
            </Stack>
        </>
    );
}
