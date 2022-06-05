import {Avatar, IconButton, Paper, Stack, Tooltip, Typography, useTheme} from '@mui/material';
import {stringToColor} from '../../../utils/utils';
import {CommentDto} from '../../../api/urbaninfusion/dto/comment-dto';
import {formatDate} from '../../../utils/dateParser';
import TimeAgo from 'react-timeago';
import {useEffect} from 'react';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface Props {
    comment: CommentDto;
    onEdit: () => void;
    onDelete: (id: number) => void;
    isAdmin: boolean;
    isMe: boolean;
}

export default function Comment(props: Props) {
    const theme = useTheme();

    useEffect(() => {
        console.log(props.comment.lastUpdated);
    });

    const handleDelete = () => {
        props.onDelete(props.comment.id);
    };

    const handleEdit = () => {
    };

    return (
        <>
            <Paper sx={{p: 4, position: 'relative'}} variant={'outlined'}>
                <Stack
                    sx={{
                        position: 'absolute',
                        right: 10,
                        bottom: 10,
                    }}
                >
                    {
                        props.comment.lastUpdated && (
                            <Typography variant={'body2'} color={theme.palette.text.secondary}>
                                updated <TimeAgo date={props.comment.lastUpdated}/>
                            </Typography>
                        )
                    }
                </Stack>
                <Stack
                    direction={'row'}
                    spacing={2}
                    sx={{
                        position: 'absolute',
                        right: 10,
                        top: 10,
                    }}
                >
                    {
                        props.isMe && (
                            <Tooltip title={'Edit'}>
                                <IconButton onClick={handleEdit}>
                                    <ModeEditOutlineOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                        )
                    }
                    {
                        props.isAdmin && (
                            <Tooltip title={'Delete'}>
                                <IconButton color={'error'} onClick={handleDelete}>
                                    <DeleteOutlineOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                        )
                    }
                </Stack>
                <Stack spacing={4}>
                    <Stack
                        direction={'row'}
                        justifyContent={'flex-start'}
                        alignItems={'center'}
                        spacing={4}
                    >
                        <Avatar sx={{bgcolor: `${stringToColor(props.comment.user.username)}`}}>
                            {props.comment.user.username?.[0]}
                        </Avatar>
                        <Stack>
                            <Typography>
                                {props.comment.user.username}
                            </Typography>
                            <Typography variant={'body2'} color={theme.palette.text.secondary}>
                                {formatDate(props.comment.created)}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Typography variant={'subtitle1'}>
                        {`${props.comment.text}`}
                    </Typography>
                </Stack>
            </Paper>
        </>
    );
}
