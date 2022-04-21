import {useParams} from 'react-router-dom';
import {useQuery} from 'react-query';
import {getProductById} from '../../api/urbaninfusion/public/products';
import Section from '../../components/Wrappers/Section';
import {Button, Collapse, Stack, Typography, useTheme} from '@mui/material';
import Page from '../../components/Wrappers/Page';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PictureBox from '../../components/PictureBox';
import Comments from '../../components/Pages/ProductPage/Comments';
import {hexToRgb} from '../../utils/utils';
import {useState} from 'react';
import CommentForm from '../../components/Pages/ProductPage/CommentForm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
    image_url?: string;
}

Product.defaultProps = {
    image_url: 'https://i.imgur.com/ZG4W7Le.jpg',
};

export default function Product(props: Props) {
    const {id} = useParams();
    const theme = useTheme();

    const [showForm, setShowForm] = useState<boolean>(false);

    const iconRotation = showForm ? 'rotate(180deg)' : 'rotate(0)';

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
                                            marginBottom={14}
                                        >
                                            {data.title}
                                        </Typography>
                                        <Typography
                                            variant={'h4'}
                                            marginBottom={4}
                                            color={theme.palette.mode === 'light'
                                                ? `rgb(${hexToRgb(theme.palette.primary.main)})` : ''}
                                        >
                                            {`$${data.price}`}
                                        </Typography>
                                        <Button
                                            variant={'contained'}
                                            size={'large'}
                                            startIcon={<AddShoppingCartIcon/>}
                                            sx={{width: '80%', maxWidth: '350px'}}
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
                                    <Comments comments={data.comments}/>
                                    <Button
                                        variant={'contained'}
                                        sx={{width: '200px'}}
                                        endIcon={
                                            <ExpandMoreIcon
                                                sx={{transform: `${iconRotation}`, transition: 'all 0.2s ease-in-out'}}
                                            />}
                                        onClick={() => setShowForm(!showForm)}
                                    >
                                        Write a comment
                                    </Button>
                                    <Collapse orientation={'vertical'} in={showForm}>
                                        <CommentForm/>
                                    </Collapse>
                                </Stack>
                            </Stack>
                        )
                    }
                </Section>
            </Page>
        </>
    );
}
