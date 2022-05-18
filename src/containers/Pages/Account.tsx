import {
    Avatar, Button,
    Divider,
    FormControl,
    InputBase, InputLabel,
    OutlinedInput,
    Stack,
    Tab,
    Tabs, TextField,
    Typography,
    useTheme
} from '@mui/material';
import {ReactNode, useState} from 'react';
import {stringToColor} from '../../utils/avatarUtils';
import Page from '../../components/Wrappers/Page';
import SectionCard, {SectionCardItem} from '../../components/Pages/Account/SectionCard';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

const navigation = [
    'profile',
    'orders',
    'admin'
];

const initialData = {
    id: 0,
    username: 'Kasper',
    admin: true,
    email: 'kasper@gmail.com',
    password: 'kasper.n',
};

export default function Account() {
    const user = initialData;

    const [currentTab, setCurrentTab] = useState<number>(0);

    const theme = useTheme();

    const renderSection = (name: string): ReactNode => {
        switch (name) {
            case 'profile':
                return <ProfileSection/>;
            case 'orders':
                return <OrdersSection/>;
            case 'admin':
                return <AdminSection/>;
            default:
                return <></>;
        }
    };

    return (
        <>
            <Page sx={{height: '100vh'}}>
                <Stack alignItems={'center'} px={4} py={8}>
                    <Stack spacing={8} width={'100%'} maxWidth={'lg'}>
                        <Stack direction={'row'} alignItems={'center'} spacing={4}>
                            <Avatar sx={{height: 64, width: 64, background: stringToColor(user.username)}}>
                                <Typography variant={'h4'}>{user.username[0]}</Typography>
                            </Avatar>
                            <Stack>
                                <Typography variant={'h5'}>{user.username}</Typography>
                                <Typography color={theme.palette.text.secondary}>{user.email}</Typography>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)}>
                                {
                                    navigation.map(name => (
                                        <Tab
                                            label={<Typography textTransform={'capitalize'}>{name}</Typography>}
                                            key={name}
                                        />
                                    ))
                                }
                            </Tabs>
                            <Divider flexItem/>
                            {
                                navigation.map((name, index) => (
                                    <Stack
                                        pt={4}
                                        sx={{display: currentTab === index ? 'default' : 'none'}}
                                        key={`${name}${index}`}
                                    >
                                        {renderSection(name)}
                                    </Stack>
                                ))
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </Page>
        </>
    );
}

function ProfileSection() {
    return (
        <>
            <Stack spacing={4}>
                <SectionCard header={'Personal information'}>
                    <SectionCardItem>
                        <TextField label={'Email'}/>
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField label={'Username'} disabled/>
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField label={'Password'}/>
                    </SectionCardItem>
                    <SectionCardItem sx={{alignItems: 'start'}}>
                        <Button startIcon={<SaveOutlinedIcon/>} variant={'contained'}>Save changes</Button>
                    </SectionCardItem>
                </SectionCard>
                <SectionCard header={'Contact information'}>
                    <SectionCardItem>
                        <TextField label={'City'}/>
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField label={'Zipcode'}/>
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField label={'Address'}/>
                    </SectionCardItem>
                    <SectionCardItem>
                        <TextField label={'Phone number'}/>
                    </SectionCardItem>
                    <SectionCardItem sx={{alignItems: 'start'}}>
                        <Button startIcon={<SaveOutlinedIcon/>} variant={'contained'}>Save changes</Button>
                    </SectionCardItem>
                </SectionCard>
            </Stack>
        </>
    );
}

function OrdersSection() {
    return (
        <>
        </>
    );
}

function AdminSection() {
    return (
        <>
        </>
    );
}
