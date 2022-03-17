import Section from "../../../components/Wrappers/Section";
import {Box, Divider, Grid, Typography} from "@mui/material";
import PersonalInformation from ".//PersonalInformation";
import OrderHistory from ".//OrderHistory";
import SideNavigation from '../../../components/SideNavigation';

const navigation = {
    profile: [],
    orders: []
};

export default function Account() {
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
                <PersonalInformation/>
                <Divider/>
                <OrderHistory/>
                <Divider/>
            </Box>
        </>
    );
}
