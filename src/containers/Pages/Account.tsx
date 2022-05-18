import {
    Avatar,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    Stack,
    Tab,
    Tabs,
    Typography,
    useTheme
} from '@mui/material';
import React, {ReactElement, ReactNode, useEffect, useState} from 'react';
import {stringToColor} from '../../utils/avatarUtils';
import Page from '../../components/Wrappers/Page';
import {connect} from 'react-redux';
import {RootState} from '../../state/store';
import useMe from '../../hooks/users/useMe';
import {useNavigate} from 'react-router-dom';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import {userSlice} from '../../state/slices/user';
import ProfileSection from '../../components/Pages/Account/ProfileSection';
import OrdersSection from '../../components/Pages/Account/OrdersSection';
import AdminSection from '../../components/Pages/Account/AdminSection';
import {useUpdateUser} from '../../hooks/users/useUpdateUser';
import {UserDto, UserRole} from '../../api/urbaninfusion/dto/user-dto';

const navigation = [
    'profile',
    'orders',
    'admin'
];

const mapStateToProps = (state: RootState) => {
    return {
        jwt: state.user.jwt
    };
};

const mapDispatchToProps = {
    clearJwtToken: userSlice.actions.clearJwtToken,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {
    children?: ReactElement;
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);

function Account(props: Props) {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState<number>(0);
    const {isLoading, isError, data: user} = useMe();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const accountActionsOpen = Boolean(anchorEl);
    const updateMutation = useUpdateUser(user?.id || -1);

    const handleUpdate = (data: Partial<UserDto>) => {
        updateMutation.mutate(data);
    };

    useEffect(() => {
        if (isError || !props.jwt) {
            navigate('/login');
        }
    }, [isError, props.jwt]);

    const renderSection = (name: string): ReactNode => {
        switch (name) {
            case 'profile':
                return <ProfileSection onUpdate={handleUpdate} {...user!}/>;
            case 'orders':
                return <OrdersSection/>;
            case 'admin':
                return <AdminSection/>;
            default:
                return <></>;
        }
    };

    const handleAccountActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAccountActionsClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Page sx={{height: '100vh'}} isLoading={isLoading}>
                <Stack alignItems={'center'} px={4} py={8}>
                    <Stack spacing={8} width={'100%'} maxWidth={'lg'}>
                        <Stack direction={'row'} alignItems={'center'} spacing={4}>
                            <Avatar sx={{height: 64, width: 64, background: stringToColor(user?.username)}}>
                                <Typography variant={'h4'}>{user?.username[0]}</Typography>
                            </Avatar>
                            <Stack flex={1}>
                                <Typography variant={'h5'}>{user?.username}</Typography>
                                <Typography color={theme.palette.text.secondary}>{user?.email}</Typography>
                            </Stack>
                            <Stack>
                                <IconButton onClick={handleAccountActionsClick}>
                                    <MoreHorizOutlinedIcon sx={{width: 28, height: 28}}/>
                                </IconButton>
                                <Popover
                                    open={accountActionsOpen}
                                    anchorEl={anchorEl}
                                    onClose={handleAccountActionsClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                >
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={() => props.clearJwtToken()}>
                                                <ListItemIcon><LogoutIcon/></ListItemIcon>
                                                <ListItemText primary={'Sign out'}/>
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </Popover>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)}>
                                {
                                    navigation.map(name => (
                                        name === 'admin' && user?.role !== UserRole.ADMIN
                                            ? []
                                            : <Tab
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
