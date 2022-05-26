import {Avatar, IconButton, Tooltip, useTheme} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {firstLetterOfUsername, stringToColor} from '../../utils/avatarUtils';

interface Props {
    name: string;
}

export default function AccountButton(props: Props) {
    const navigate = useNavigate();
    const theme = useTheme();
    return (
        <>
            <Tooltip arrow title={'Account'}>
                <IconButton onClick={() => navigate('/account/')}>
                    <Avatar sx={{width: 32, height: 32, background: stringToColor(props.name)}}>
                        {firstLetterOfUsername(props.name)}
                    </Avatar>
                </IconButton>
            </Tooltip>
        </>
    );
}
