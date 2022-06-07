import {Avatar, AvatarProps, useTheme} from '@mui/material';
import {stringToColor} from '../utils/utils';
import {omit} from 'lodash-es';

type Props = {
    name?: string;
} & AvatarProps;

export function UserAvatar(props: Props) {
    const avatarProps = omit(props, 'name');
    const theme = useTheme()
    return (
        <>
            <Avatar
                sx={{
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                    background: props.src !== undefined
                        ? 'transparent'
                        : stringToColor(props.name || '')
                }}
                {...avatarProps}
            >
                {props.children}
            </Avatar>
        </>
    );
}
