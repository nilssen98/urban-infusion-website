import {
    Alert,
    Box,
    Button,
    CircularProgress,
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
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import {useState} from 'react';
import {register} from '../../api/urbaninfusion/public/register';
import {isEmailAddress} from '../../utils/emailVerifier';
import {green} from '@mui/material/colors';

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const theme = useTheme();
    const navigate = useNavigate();

    const handleRegister = async () => {
        setLoading(true);

        await register({
            username,
            email,
            password
        })
            .then(() => {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
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
            {
                success && (
                    <Snackbar
                        open={success}
                        autoHideDuration={6000}
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    >
                        <Alert severity={'success'}>Registered successfully! Redirecting</Alert>
                    </Snackbar>
                )
            }
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
                            <Box sx={{margin: 1, position: 'relative'}}>
                                <Button
                                    variant={'contained'}
                                    sx={{width: '100%'}}
                                    disabled={success || loading}
                                    onClick={handleRegister}
                                >
                                    Register
                                </Button>
                                {loading && !error && (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: green[500],
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                        }}
                                    />
                                )}
                            </Box>
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
