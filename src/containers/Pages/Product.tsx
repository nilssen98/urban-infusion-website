import {useParams} from 'react-router-dom';
import {useQuery} from 'react-query';
import {getProductById} from '../../api/urbaninfusion/public/products';
import Section from '../../components/Wrappers/Section';
import {Box, Stack, Typography} from '@mui/material';
import Page from '../../components/Wrappers/Page';

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
                        data && <Stack direction={'column'} spacing={4}>
                            <Typography variant={'h3'}>This is the product page!</Typography>
                            <Typography variant={'h5'}>id: {data.id}</Typography>
                            <Typography variant={'h5'}>title: {data.title}</Typography>
                            <Typography variant={'h5'}>description: {data.description}</Typography>
                            <Typography variant={'h5'}>category: {data.category}</Typography>
                            <Typography variant={'h5'}>price: {data.price}</Typography>
                            <Typography variant={'h5'}>discount: {data.discount}</Typography>
                            <Typography variant={'h5'}>weight: {data.weight}</Typography>
                        </Stack>
                    }
                </Section>
                <Section>
                    {
                        data && (
                            <Stack
                                direction={'row'}
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
                                        style={{objectFit: 'contain', height: 'inherit'}}
                                    />
                                </Box>
                                <Stack
                                    direction={'column'}
                                    justifyContent={'flex-start'}
                                    alignItems={'end'}
                                    sx={{
                                        flexGrow: '1',
                                        width: '100%',
                                        border: '1px solid blue',
                                    }}
                                >
                                    <Typography variant={'h1'} marginBottom={4}>{data.title}</Typography>
                                    <Typography variant={'h2'} marginBottom={8}>{`${data.price}$ / ${data.weight}`}</Typography>
                                    <Stack>
                                        <Typography variant={'h4'} marginBottom={4}>Quantity: </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        )
                    }
                </Section>
            </Page>
        </>
    );
}
