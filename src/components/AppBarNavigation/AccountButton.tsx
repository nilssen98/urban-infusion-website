import {Avatar, IconButton, Tooltip, useTheme} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {stringToColor} from '../../utils/utils';

interface Props {
    img: string;
    name: string;
}

export default function AccountButton(props: Props) {
    const navigate = useNavigate();
    const theme = useTheme();
    return (
        <>
            <Tooltip arrow title={'Account'}>
                <IconButton onClick={() => navigate('/account/')}>
                    <Avatar
                        src={props.img}
                        sx={{
                            width: 32,
                            height: 32,
                            background: props.img ? 'transparent' : stringToColor(props.name)
                        }}
                    >
                        {props.name[0]}
                    </Avatar>
                </IconButton>
            </Tooltip>
        </>
    );
}
