import {Alert, Button, InputAdornment, Paper, Snackbar, Stack, TextField, Typography, useTheme} from '@mui/material';
import Page from '../../components/Wrappers/Page';
import {NavLink, useNavigate} from 'react-router-dom';
import Background from '../../assets/images/teashop-background.jpg';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import {login} from '../../api/urbaninfusion/public/login';
import {useEffect, useState} from 'react';
import {RootState} from '../../state/store';
import {connect} from 'react-redux';
import {userSlice} from '../../state/slices/user';

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.user.jwt !== undefined,
    };
};

const mapDispatchToProps = {
    setJwtToken: userSlice.actions.setJwtToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function Login(props: Props) {
    const [error, setError] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        if (props.isAuthenticated) {
            navigate('/');
        }
    }, [props.isAuthenticated]);

    const handleLogin = async () => {
        await login({
            username: username,
            password: password,
        })
            .then(e => {
                props.setJwtToken(e);
            })
            .catch(_ => setError(true));
    };

    return (
        <>
            <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={() => setError(false)}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert severity={'error'}>Invalid username or password!</Alert>
            </Snackbar>
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
                            <Typography variant={'h4'}>Login</Typography>
                            <Stack width={'100%'} spacing={4}>
                                <TextField
                                    required
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
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
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
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
                                onClick={() => handleLogin()}
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
