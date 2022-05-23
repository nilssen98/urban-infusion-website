import {CommentDto} from '../../../api/urbaninfusion/dto/comment-dto';
import Comment from './Comment';
import {Stack, Typography} from '@mui/material';

interface Props {
    comments?: CommentDto[];
}

export default function Comments(props: Props) {
    return (
        <>
            <Stack
                direction={'column'}
                gap={2}
            >
                {
                    props.comments && props.comments.length !== 0 ? (
                        <>
                            <Typography variant={'body1'}>
                                {`${props.comments.length} comment${props.comments.length !== 1 ? 's' : ''}`}
                            </Typography>
                            {
                                props.comments.map(comment => (
                                    <Comment
                                        key={comment.id}
                                        id={comment.id}
                                        username={comment.user.username}
                                        text={comment.text}
                                        lastUpdated={comment.lastUpdated}
                                        created={comment.created}
                                    />
                                ))
                            }
                        </>
                    ) : (
                        <Stack
                            direction={'row'}
                            justifyContent={'flex-start'}
                            alignItems={'center'}
                            height={150}
                        >
                            <Typography>No comments yet</Typography>
                        </Stack>
                    )
                }
            </Stack>
        </>
    );
}
