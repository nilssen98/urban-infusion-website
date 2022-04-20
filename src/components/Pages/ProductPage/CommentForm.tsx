import {Button, Stack, TextField, Typography} from '@mui/material';

export default function CommentForm() {
    return (
        <>
            <Stack
                direction={'column'}
                justifyContent={'center'}
                alignItems={{xs: 'center', md: 'flex-start'}}
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
                        alignSelf={{xs: 'center', md: 'flex-start'}}
                    >
                        Write a comment
                    </Typography>
                    <TextField
                        required
                        variant={'outlined'}
                        id={'comment-title'}
                        label={'Comment title'}
                        placeholder={'Give your comment a title'}
                        inputProps={{maxLength: 50}}
                        sx={{width: '100%'}}
                    />
                    <TextField
                        required
                        multiline
                        variant={'outlined'}
                        rows={4}
                        id={'comment-body'}
                        label={'Comment body'}
                        placeholder={'Write your comment here'}
                        inputProps={{maxLength: 1000}}
                        sx={{width: '100%'}}
                    />
                    <Button
                        variant={'contained'}
                        type={'submit'}
                    >
                        Submit Comment
                    </Button>
                </Stack>
            </Stack>
        </>
    );
}
