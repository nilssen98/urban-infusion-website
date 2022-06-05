import {Button, Stack, TextField} from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';

export default function CommentForm() {
    return (
        <>
            <Stack spacing={4} component={'form'} alignItems={'start'} onClick={(e: any) => e.preventDefault()}>
                <TextField
                    sx={{width: 400}}
                    required
                    multiline
                    variant={'outlined'}
                    rows={4}
                    label={'Comment'}
                    placeholder={'Write your comment here'}
                    inputProps={{maxLength: 1000}}
                />
                <Button
                    startIcon={<PublishIcon/>}
                    variant={'contained'}
                    type={'submit'}
                >
                    Submit
                </Button>
            </Stack>
        </>
    );
}
