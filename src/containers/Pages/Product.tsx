import {useParams} from 'react-router-dom';
import {useQuery} from 'react-query';
import {getProductById} from '../../api/urbaninfusion/public/products';
import Section from '../../components/Wrappers/Section';
import {Box, Button, Stack, Typography} from '@mui/material';
import Page from '../../components/Wrappers/Page';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Comment from '../../components/Pages/ProductPage/Comment';
import PictureBox from '../../components/PictureBox';

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
                            <Stack width={'100%'} gap={15}>
                                <Stack
                                    direction={{xs: 'column', md: 'row'}}
                                    sx={{
                                        border: '1px solid red',
                                    }}
                                >
                                    <Stack
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                    >
                                        <PictureBox height={400} image={props.image_url}/>
                                    </Stack>
                                    <Stack
                                        direction={'column'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        sx={{
                                            flexGrow: '1',
                                            border: '1px solid blue',
                                        }}
                                    >
                                        <Typography
                                            variant={'h3'}
                                            marginBottom={4}
                                        >
                                            {data.title}
                                        </Typography>
                                        <Typography
                                            variant={'h5'}
                                            marginBottom={8}
                                        >
                                            {`${data.price}$ / ${data.weight}`}
                                        </Typography>
                                        <Stack
                                            direction={'row'}
                                        >
                                            <Typography
                                                variant={'h6'}
                                                marginBottom={4}
                                            >
                                                Quantity:
                                            </Typography>
                                            <Typography
                                                variant={'h6'}
                                                color={'red'}
                                            >
                                                Quantity selector goes here
                                            </Typography>
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
                                <Stack>
                                    <Typography variant={'h4'} marginBottom={2}>Description</Typography>
                                    <Typography variant={'h6'}>{data.description}</Typography>
                                </Stack>
                                <Stack>
                                    <Typography variant={'h4'} marginBottom={2}>Comments</Typography>
                                    <Button variant={'contained'} sx={{width: '160px'}}>Add a comment</Button>
                                    <Box>
                                        {
                                            data.comments && data.comments.length !== 0 ? (
                                                data.comments.map(comment => (
                                                    <Comment
                                                        key={comment.id}
                                                        id={comment.id}
                                                        username={comment.user.username}
                                                        text={comment.text}
                                                        lastUpdated={comment.lastUpdated}
                                                        created={comment.created}
                                                    />
                                                ))
                                            ) : (
                                                <Stack
                                                    direction={'row'}
                                                    justifyContent={'flex-start'}
                                                    alignItems={'center'}
                                                    height={150}
                                                >
                                                    <Typography>No comments yet</Typography>
                                                </Stack>
                                            )
                                        }
                                    </Box>
                                </Stack>
                            </Stack>
                        )
                    }
                </Section>
            </Page>
        </>
    );
}
