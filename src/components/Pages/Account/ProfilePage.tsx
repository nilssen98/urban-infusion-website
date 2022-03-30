import {Box, Stack, TextField, Typography, useTheme} from "@mui/material";
import {UserDto} from "../../../api/urbaninfusion/dto/user-dto";

interface CardProps {
    header: string;
    children?: any;
}

const userData: UserDto = {id: 666, admin: false, email: 'something@something.com', password: 'secret'}


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
                direction={{xs: 'column', md: 'row'}}
                sx={{
                    padding: 10,
                    width: '100%',
                    border: '1px solid red'
                }}
            >
                <Box
                    sx={{
                        border: '1px solid blue',
                        backgroundColor: '',
                        flex: {md: 1}
                    }}>
                    <Typography
                        variant={'h4'}
                        sx={{
                            py: 10,
                            px: 5,
                            width: '100%',
                            textAlign: 'center'
                        }}
                    >{props.header}</Typography>
                </Box>
                <Box
                    sx={{
                        border: '1px solid orange',
                        flex: {md: '2'},
                        py: 10,
                        px: 5,
                    }}
                >
                    {props.children}
                </Box>
            </Stack>
        </>
    );
}

interface ShippingInformationProps {
    data: UserDto;
}

//City, zipcode, address
//TODO: Change fields when userDto is updated
function ShippingInformationFields(props: PersonalInformationProps) {
    return (
        <>
            <Box
                component='form'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    '& .MuiTextField-root': {m: 2, width: '25ch'}
                }}
            >
                <TextField
                    required
                    id='outlined-required'
                    label='City'
                    defaultValue={props.data.id}
                />
                <TextField
                    required
                    id='outlined-required'
                    label='Zip-code'
                    defaultValue={props.data.id}
                />
                <TextField
                    required
                    id='outlined-required'
                    label='Address'
                    defaultValue={props.data.id}
                />
            </Box>
        </>
    );
}

interface PersonalInformationProps {
    data: UserDto;
}

//Email, phone number and 'password'
//TODO: Change fields when userDto is updated
function PersonalInformationFields(props: PersonalInformationProps) {
    return (
        <>
            <Box
                component='form'
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '25ch'}
                }}
            >
                <TextField
                    required
                    id='outlined-required'
                    label='E-mail'
                    defaultValue={''}
                />
                <TextField
                    required
                    id='outlined-required'
                    label='E-mail address'
                    defaultValue={props.data.id}
                />
            </Box>
        </>
    );
}

export default function ProfilePage() {
    return (
        <>
            <AccountCard
                header={'Shipping Information'}
            >
                <ShippingInformationFields data={userData}/>
            </AccountCard>
        </>
    );
}

