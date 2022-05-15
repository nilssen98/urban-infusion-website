import {Button, InputAdornment, Paper, Stack, TextField, Typography, useTheme} from '@mui/material';
import Page from '../../components/Wrappers/Page';
import {NavLink} from 'react-router-dom';
import Background from '../../assets/images/teashop-background.jpg';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';

export default function Register() {
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
                    <Paper sx={{py: 4, px: 8, width: 400}}>
                        <Stack alignItems={'center'} spacing={8}>
                            <Typography variant={'h4'}>Register</Typography>
                            <Stack width={'100%'} spacing={4}>
                                <TextField
                                    required
                                    label={'Email'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position={'start'}>
                                                <EmailOutlinedIcon/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    required
                                    label={'Username'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position={'start'}>
                                                <AccountCircleOutlinedIcon/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    required
                                    label={'Password'}
                                    type={'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position={'start'}>
                                                <PasswordOutlinedIcon/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Stack>
                            <Button
                                variant={'contained'}
                                sx={{width: '100%'}}
                            >
                                Register
                            </Button>
                            <Typography>
                                <span>Already have an account? </span>
                                <NavLink to={'/login'}>Login</NavLink>
                            </Typography>
                        </Stack>
                    </Paper>
                </Stack>
            </Page>
        </>
    );
}
