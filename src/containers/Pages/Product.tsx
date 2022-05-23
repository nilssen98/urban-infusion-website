import {useParams} from 'react-router-dom';
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
import {defaultProductImageURL, getProductImageURL} from '../../utils/productImageUtils';
import useProduct from '../../hooks/products/useProduct';

interface Props {
    image_url?: string;
}

Product.defaultProps = {
    image_url: defaultProductImageURL,
};

export default function Product(props: Props) {
    const {id} = useParams();
    const theme = useTheme();

    const [showForm, setShowForm] = useState<boolean>(false);

    const {isLoading, data} = useProduct(id);

    return (
        <>
            <Page isLoading={isLoading}>
                <Section
                    sx={{marginTop: 16}}
                >
                    {
                        data && (
                            <Stack width={'100%'} gap={15}>
                                <Stack
                                    direction={{xs: 'column', md: 'row'}}
                                >
                                    <Stack
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                    >
                                        <PictureBox
                                            height={400}
                                            image={data.imageId ? getProductImageURL(data.imageId) : props.image_url}
                                            sx={{
                                                paddingLeft: {xs: 0, md: 6, lg: 28}
                                            }}
                                        />
                                    </Stack>
                                    <Stack
                                        direction={'column'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
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
                                                sx={{
                                                    transform: `rotate(${showForm ? 180 : 0}deg)`,
                                                    transition: 'all 0.2s ease-in-out'
                                                }}
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
