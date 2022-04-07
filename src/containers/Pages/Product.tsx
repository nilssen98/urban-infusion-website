import {useParams} from 'react-router-dom';
import {useQuery} from 'react-query';
import {getProductById} from '../../api/urbaninfusion/public/products';
import Section from '../../components/Wrappers/Section';
import {Box, Button, Stack, Typography} from '@mui/material';
import Page from '../../components/Wrappers/Page';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface Props {
    image_url?: string;
}

Product.defaultProps = {
    image_url: 'https://i.imgur.com/ZG4W7Le.jpg',
};

export default function Product(props: Props) {
    const {id} = useParams();

    const {isLoading, data} = useQuery(
        'product',
        () => getProductById(id || '')
    );

    return (
        <>
            <Page isLoading={isLoading}>
                <Section>
                    {
                        data && (
                            <Stack
                                direction={{xs: 'column', md: 'row'}}
                                width={'100%'}
                                sx={{
                                    border: '1px solid red',
                                }}
                            >
                                <Box
                                    height={400}
                                    sx={{
                                        objectFit: 'contain',
                                    }}
                                >
                                    <img
                                        src={props.image_url}
                                        alt={'Product image'}
                                        draggable={false}
                                        style={{objectFit: 'contain', height: 'inherit'}}
                                    />
                                </Box>
                                <Stack
                                    direction={'column'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    sx={{
                                        flexGrow: '1',
                                        border: '1px solid blue',
                                    }}
                                >
                                    <Typography variant={'h1'} marginBottom={4}>{data.title}</Typography>
                                    <Typography variant={'h3'} marginBottom={8}>{`${data.price}$ / ${data.weight}`}</Typography>
                                    <Stack
                                        direction={'row'}
                                    >
                                        <Typography variant={'h5'} marginBottom={4}>Quantity: </Typography>
                                        <Typography variant={'h5'} color={'red'}>Quantity selector goes here</Typography>
                                    </Stack>
                                    <Button
                                        variant={'contained'}
                                        size={'large'}
                                        startIcon={<AddShoppingCartIcon/>}
                                        sx={{width: '80%'}}
                                    >
                                        Add to cart
                                    </Button>
                                </Stack>
                            </Stack>
                        )
                    }
                </Section>
                <Section>
                    {
                        data && (
                            <Stack>
                                <Typography variant={'h3'} marginBottom={2}>Description</Typography>
                                <Typography variant={'h5'}>{data.description}</Typography>
                            </Stack>
                        )
                    }
                </Section>
            </Page>
        </>
    );
}
