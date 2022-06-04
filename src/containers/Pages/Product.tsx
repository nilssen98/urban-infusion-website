import {useNavigate, useParams} from 'react-router-dom';
import Section from '../../components/Wrappers/Section';
import {Button, Collapse, Stack, Typography, useTheme} from '@mui/material';
import Page from '../../components/Wrappers/Page';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PictureBox from '../../components/PictureBox';
import Comments from '../../components/Pages/Product/Comments';
import {hexToRgb} from '../../utils/utils';
import {useEffect, useState} from 'react';
import CommentForm from '../../components/Pages/Product/CommentForm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {defaultProductImageURL, getProductImageURL} from '../../utils/productImageUtils';
import useProduct from '../../hooks/products/useProduct';
import {round} from 'lodash-es';

interface Props {
    image_url?: string;
}

Product.defaultProps = {
    image_url: defaultProductImageURL,
};

export default function Product(props: Props) {
    const {id} = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState<boolean>(false);
    const priceTextColor = theme.palette.mode === 'light' ? `rgb(${hexToRgb(theme.palette.primary.main)})` : '';

    const {isLoading, isError, data} = useProduct(id);

    useEffect(() => {
        if (isError) {
            navigate('/products');
        }
    }, [isError]);

    function calcDiscountedPrice(starting: number, discount: number) {
        return round(starting * (1 - discount), 2);
    }

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
                                        sx={{
                                            paddingLeft: {xs: 0, md: 6, lg: 28},
                                    }}
                                    >
                                        {
                                            data.discount !== 0 && (
                                                <Stack sx={{position: 'relative', top: 20, right: 160}}>
                                                    <Typography variant={'h5'} color={'error'}>
                                                        -{round(data.discount * 100, 2)}%
                                                    </Typography>
                                                </Stack>
                                            )
                                        }
                                        <PictureBox
                                            height={400}
                                            image={data.imageId ? getProductImageURL(data.imageId) : props.image_url}
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
                                        {
                                            data.discount ? (
                                                <Stack direction={'row'} alignItems={'center'} spacing={1} mb={4}>
                                                    <Typography
                                                        variant={'h5'}
                                                        color={priceTextColor}
                                                        sx={{textDecorationLine: 'line-through'}}
                                                    >
                                                        ${data.price}
                                                    </Typography>
                                                    <Typography
                                                        variant={'h4'}
                                                        color={priceTextColor}
                                                    >
                                                        ${calcDiscountedPrice(data.price, data.discount)}
                                                    </Typography>
                                                </Stack>
                                            ) : (
                                                <Typography
                                                    variant={'h4'}
                                                    marginBottom={4}
                                                    color={priceTextColor}
                                                >
                                                    ${data.price}
                                                </Typography>
                                            )
                                        }
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
