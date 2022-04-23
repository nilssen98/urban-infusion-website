import {Avatar, Button, Divider, Stack, Tooltip, Typography} from '@mui/material';
import {formatDate} from '../../../utils/dateParser';

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

    function stringToColor(string: string | undefined): string {
        if (!string) {
            return 'default';
        }

        let hash = 3;

        /* eslint-disable no-bitwise */
        for (let i = 0; i < string.length; i++) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    return (
        <>
            <Stack direction={'column'} minHeight={200} width={'100%'} gap={3}>
                <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={2} margin={3} marginBottom={1}>
                    <Tooltip title={props.username as string}>
                        <Avatar
                            sx={{bgcolor: `${stringToColor(props.username)}`}}
                        >
                            {firstLetterOfUsername(props.username)}
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
