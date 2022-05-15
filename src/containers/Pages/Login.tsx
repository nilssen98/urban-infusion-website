import {Button, Paper, Stack, TextField, Typography, useTheme} from '@mui/material';
import Page from '../../components/Wrappers/Page';
import {NavLink} from 'react-router-dom';
import Background from '../../assets/images/teashop-background.jpg';

export default function Login() {
    const theme = useTheme();
    return (
        <>
            <Page>
                <Stack
                    sx={{
                        backgroundImage: `url(${Background})`,
                        backgroundSize: 'cover',
                    }}
                    width={'100%'}
                    height={`calc(100vh - ${theme.mixins.toolbar.minHeight}px)`}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Paper sx={{py: 4, px: 8, width: 350}}>
                        <Stack alignItems={'center'} spacing={6}>
                            <Typography variant={'h4'}>Login</Typography>
                            <TextField
                                sx={{width: '100%'}}
                                label={'Username'}
                            />
                            <TextField
                                sx={{width: '100%'}}
                                label={'Password'}
                                type={'password'}
                            />
                            <Button
                                variant={'contained'}
                                sx={{width: '100%'}}
                            >
                                Login
                            </Button>
                            <Typography>
                                <span>Not a member? </span>
                                <NavLink to={'/register'}>Sign up</NavLink>
                            </Typography>
                        </Stack>
                    </Paper>
                </Stack>
            </Page>
        </>
    );
}
