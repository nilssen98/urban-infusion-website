import {Box} from '@mui/material';
import {ReactNode, useState} from 'react';
import {useParams} from 'react-router-dom';
import OrderHistory from '../../components/Pages/Account/OrderHistory';
import ProfilePage from '../../components/Pages/Account/ProfilePage';
import TabNavigation from '../../components/TabNavigation';

const navigation = [
    'profile',
    'orders',
    'admin'
];

function displayPageId(pageId: number): ReactNode {
    console.log('Page ID: ' + pageId);
    switch (pageId) {
        case 0: {
            return (<ProfilePage/>);
        }
        case 1: {
            return (<OrderHistory/>);
        }
        case 2: {
            return (<></>);
        }
        default: {
            throw new Error('Invalid index!');
        }
    }
}


export default function Account() {

    const [currentTab, setCurrentTab] = useState<number>(0);

    return (
        <>
            <Box sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column'
            }}>
                <TabNavigation
                    tabs={navigation}
                    currentTab={currentTab}
                    onChange={(newValue) => {
                        setCurrentTab(newValue);
                        displayPageId(newValue || 0);
                    }}
                />
                {displayPageId(currentTab || 0)}
            </Box>
        </>
    );
}
