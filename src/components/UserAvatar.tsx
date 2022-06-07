import {Avatar, AvatarProps} from '@mui/material';
import {stringToColor} from '../utils/utils';
import {omit} from 'lodash-es';

type Props = {
    name?: string;
} & AvatarProps;

export function UserAvatar(props: Props) {
    const avatarProps = omit(props, 'name');
    return (
        <>
            <Avatar
                sx={{
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
