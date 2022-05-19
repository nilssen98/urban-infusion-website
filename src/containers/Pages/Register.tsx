import {
    Alert,
    Button,
    CircularProgress,
    IconButton,
    InputAdornment,
    Paper,
    Snackbar,
    Stack,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import Page from '../../components/Wrappers/Page';
import {NavLink, useNavigate} from 'react-router-dom';
import Background from '../../assets/images/teashop-background.jpg';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {useEffect, useState} from 'react';
import {register} from '../../api/urbaninfusion/public/register';
import {isEmailAddress} from '../../utils/emailVerifier';
import {passwordStrength, defaultOptions} from 'check-password-strength';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import ToggleIcon from '../../components/ToggleIcon';

export default function Register() {
    const [loading, setLoading] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [success, setSuccess] = useState<boolean>(false);

    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        if (success) {
            const timeout = setTimeout(() => {
                navigate('/login');
            }, 2000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [success]);

    const handleRegister = async () => {
        for (const length of [email.length, username.length, password.length]) {
            if (length === 0) {
                setErrorMessage('Input fields can not be blank!');
                setError(true);
                return;
            }
        }

        setLoading(true);

        await register({
            username,
            email,
            password
        })
            .then(() => {
                setSuccess(true);
            })
            .catch(e => {
                if (e.response.data.length > 0) {
                    setErrorMessage(e.response.data);
                } else {
                    setErrorMessage('Could not register!');
                }
                setError(true);
            });
        setLoading(false);
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

    function getPasswordStrength(input: String): string {
        if (input == null) {
            return '';
        }
        return input.length !== 0
            ? passwordStrength(password, [...defaultOptions, {
                id: 0,
                value: 'Very weak',
                minDiversity: 0,
                minLength: 0
            }]).value
            : '';
    }

    return (
        <>
            <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={() => setError(false)}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert severity={'error'}>{errorMessage}</Alert>
            </Snackbar>
            <Snackbar
                open={success}
                autoHideDuration={6000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert severity={'success'}>
                    Registration successful! Redirecting to the <NavLink to={'/login'}>login</NavLink> page
                </Alert>
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
                                    helperText={checkPassword(password) || getPasswordStrength(password)}
                                    label={'Password'}
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position={'end'}>
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <ToggleIcon
                                                        on={showPassword}
                                                        onIcon={<Visibility />}
                                                        offIcon={<VisibilityOff />}
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Stack>
                            <Stack width={'100%'}>
                                <Button
                                    endIcon={loading && (<CircularProgress color={'info'} size={24}/>)}
                                    variant={'contained'}
                                    disabled={success || loading}
                                    onClick={handleRegister}
                                >
                                    Register
                                </Button>
                            </Stack>
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
