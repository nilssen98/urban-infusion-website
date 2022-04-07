import {Box, Stack, Typography} from '@mui/material';
import {getProducts} from '../../api/urbaninfusion/public/products';
import {ProductsList} from '../../components/Pages/Products/ProductsList';
import {useParams} from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import Page from '../../components/Wrappers/Page';
import {useQuery} from 'react-query';

const categories = {
    teas: [
        'black tea',
        'green tea',
        'white tea'
    ],
    accessories: [
        'cups'
    ],
    'gift cards': []
};

export default function Products() {
    const {id} = useParams();

    const {isLoading, data: products} = useQuery(
        'products',
        () => getProducts()
    );

    return (
        <>
            <Page isLoading={isLoading}>
                <Box sx={{
                    display: 'flex',
                    width: '100%'
                }}>
                    <SideNavigation
                        items={categories}
                        header={'Products'}
                        path={'products'}
                    />
                    {
                        products ? (
                            <ProductsList products={products} id={id}/>
                        ) : (
                            <Stack
                                direction={'column'}
                                justifyContent={'center'}
                                alignItems={'center'}
                                width={'100%'}
                            >
                                <Typography variant={'h5'} component={'h1'}>No products to show!</Typography>
                            </Stack>
                        )
                    }
                </Box>
            </Page>
        </>
    );
}
