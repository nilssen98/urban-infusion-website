import {Avatar, IconButton, Tooltip, useTheme} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {stringToColor} from '../../utils/avatarUtils';

interface Props {
    name: string;
}

export default function AccountButton(props: Props) {
    const navigate = useNavigate();
    const theme = useTheme();
    return (
        <>
            <Tooltip arrow title={'Account'}>
                <IconButton
                    onClick={() => navigate('/account/')}
                    sx={{
                        width: theme.mixins.toolbar.minHeight,
                        height: theme.mixins.toolbar.minHeight,
                    }}
                >
                    <Avatar sx={{width: 32, height: 32, background: stringToColor(props.name)}}>{props.name[0]}</Avatar>
                </IconButton>
            </Tooltip>
        </>
    );
}
