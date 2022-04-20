import {Box, Button, Stack, TextField, Typography, useTheme} from '@mui/material';
import {UserDto} from '../../../api/urbaninfusion/dto/user-dto';

interface CardProps {
    header: string;
    children?: any;
}

const userData: UserDto = {
    id: 666,
    username: 'TestUser',
    admin: false,
    email: 'something@something.com',
    password: 'secret'
};


function AccountCard(props: CardProps) {
    const theme = useTheme();
    /*
    const handleSave = (data: UserDto) => {
        await saveUserData(data);
    }

     */
    return (
        <>
            <Stack
                direction={'column'}
                sx={{
                    padding: 10,
                    maxWidth: 'lg',
                    border: '1px solid red',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        flex: {md: 1}
                    }}>
                    <Typography
                        variant={'h4'}
                        sx={{
                            py: 10,
                            px: 5,
                            width: '100%',
                            textAlign: 'center',
                            backgroundColor: 'oldlace',
                        }}
                    >{props.header}</Typography>
                </Box>
                <Box
                    sx={{
                        backgroundColor: '',
                        flex: {md: '2'},
                        py: 10,
                        px: 5,
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: 250
                        }}>
                        {props.children}
                    </Box>
                </Box>
            </Stack>
        </>
    );
}

interface ShippingInformationProps {
    data: UserDto;
}

// City, zipcode, address
// TODO: Change fields when userDto is updated
function ShippingInformationFields(props: ShippingInformationProps) {
    return (
        <>
            <Box
                component='form'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    '& .MuiTextField-root': {m: 1, minWidth: '25ch'},
                    alignItems: {xs: 'center', md: 'start'}
                }}
            >
                <TextField
                    required
                    id='city'
                    label='City'
                    defaultValue={props.data.id}
                />
                <TextField
                    required
                    id='zip'
                    label='Zip-code'
                    defaultValue={props.data.id}
                />
                <TextField
                    required
                    id='address'
                    label='Address'
                    defaultValue={props.data.id}
                />
                <Box
                    sx={{
                        pt: 4,
                        display: 'flex',
                        width: '100%',
                        justifyContent:'center'
                    }}
                >
                    <Button
                        variant={'contained'}
                        size={'medium'}
                        color={'secondary'}
                    >
                        save
                    </Button>
                </Box>

            </Box>
        </>
    );
}


interface PersonalInformationProps {
    data: UserDto;
}

// Email, phone number and 'password'
// TODO: Change fields when userDto is updated
function PersonalInformationFields(props: PersonalInformationProps) {
    return (
        <>
            <Box
                component='form'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    '& .MuiTextField-root': {m: 1, minWidth: '25ch'},
                    alignItems: {xs: 'center', md: 'start'}
                }}
            >
                <TextField
                    required
                    id='name'
                    label='Name'
                    defaultValue={props.data.id}
                />
                <TextField
                    required
                    label='email'
                    defaultValue={props.data.id}
                />
                <TextField
                    required
                    id='phone'
                    label='Phone number'
                    defaultValue={props.data.id}
                />
                <Box
                    sx={{
                        pt: 4,
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        variant={'contained'}
                        size={'medium'}
                        color={'secondary'}
                    >
                        save
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default function ProfilePage() {
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}>

                <AccountCard header={'Personal Information'}>
                    <PersonalInformationFields data={userData}/>
                </AccountCard>

                <AccountCard
                    header={'Shipping Information'}>
                    <ShippingInformationFields data={userData}/>
                </AccountCard>

            </Box>
        </>
    );
}

