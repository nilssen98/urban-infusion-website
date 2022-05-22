import {Button, Stack, TextField, Typography} from '@mui/material';
import useMe from '../../../hooks/users/useMe';

export default function CommentForm() {

    const {data: user} = useMe();

    return (
        <>
            <Stack
                direction={'column'}
                justifyContent={'center'}
                alignItems={{xs: 'center', sm: 'flex-start'}}
                width={'100%'}
            >
                <Stack
                    component={'form'}
                    direction={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    margin={4}
                    gap={4}
                    width={{xs: 300, md: '50%'}}
                >
                    <Typography
                        variant={'h6'}
                        alignSelf={{xs: 'center', sm: 'flex-start'}}
                    >
                        Write a comment
                    </Typography>
                    <Typography
                        variant={'body2'}
                        alignSelf={{xs: 'center', sm: 'flex-start'}}
                        margin={0}
                        sx={{fontStyle: 'italic'}}
                    >
                        {user ? `Commenting as ${user.username}` : `You must be logged in to post a comment!`}
                    </Typography>
                    <TextField
                        required
                        multiline
                        variant={'outlined'}
                        rows={4}
                        id={'comment-body'}
                        label={'Comment body'}
                        placeholder={'Write your comment here'}
                        inputProps={{maxLength: 1000}}
                        disabled={user == null}
                        sx={{width: '100%'}}
                    />
                    <Button
                        variant={'contained'}
                        type={'submit'}
                        disabled={user == null}
                    >
                        Submit Comment
                    </Button>
                </Stack>
            </Stack>
        </>
    );
}
