import Section from '../../components/Wrappers/Section';
import {Box, Divider, Grid, Typography} from '@mui/material';
import SideNavigation from '../../components/SideNavigation';
import {ReactNode, useState} from 'react';
import {useParams} from 'react-router-dom';
import PersonalInformation from '../../components/Pages/Account/ProfilePage';
import OrderHistory from '../../components/Pages/Account/OrderHistory';
import ProfilePage from "../../components/Pages/Account/ProfilePage";

const navigation = {
    profile: [],
    orders: []
};


function displayPage(id: string): ReactNode {
    switch (id) {
        case 'orders': {
            return (<OrderHistory/>);
        }
        default: {
            return (<ProfilePage/>);
        }
    }
}

export default function Account() {
    const {id} = useParams();

    return (
        <>
            <Box sx={{
                display: 'flex',
                width: '100%'
            }}>
                <SideNavigation
                    items={navigation}
                    header={'Account'}
                    path={'account'}
                />
                {displayPage(id || '')}
            </Box>
        </>
    );
}
