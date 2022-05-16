import {Alert, Button, InputAdornment, Paper, Snackbar, Stack, TextField, Typography, useTheme} from '@mui/material';
import Page from '../../components/Wrappers/Page';
import {NavLink, useNavigate} from 'react-router-dom';
import Background from '../../assets/images/teashop-background.jpg';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import {useState} from 'react';
import {register} from '../../api/urbaninfusion/public/register';
import {isEmailAddress} from '../../utils/emailVerifier';

export default function Register() {
    const [error, setError] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const theme = useTheme();
    const navigate = useNavigate();

    const handleRegister = async () => {
        await register({
            username,
            email,
            password
        })
            .then(e => navigate('/login'))
            .catch(e => setError(true));
    };

    function checkPassword(input: String): string | null {
        if (input == null) {
            return 'Password is invalid';
        }
        if (input.length === 0) {
            return null;
        }
        if (input.length < 8) {
            return 'Password is too short';
        }
        if (input.length > 20) {
            return 'Password is too long';
        }
        return null;
    }

    return (
        <>
            <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={() => setError(false)}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert severity={'error'}>Could not register, please try again!</Alert>
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
                            <Typography variant={'h4'}>Register</Typography>
                            <Stack width={'100%'} spacing={4}>
                                <TextField
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    error={!isEmailAddress(email)}
                                    helperText={isEmailAddress(email) ? '' : 'Must be a valid email!'}
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
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
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
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                    error={checkPassword(password) !== null}
                                    helperText={checkPassword(password)}
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
                                onClick={handleRegister}
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
