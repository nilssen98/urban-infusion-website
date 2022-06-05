import {useNavigate, useParams} from 'react-router-dom';
import Section from '../../components/Wrappers/Section';
import {Button, Chip, Collapse, Divider, Stack, Typography, useTheme} from '@mui/material';
import Page from '../../components/Wrappers/Page';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PictureBox from '../../components/PictureBox';
import {hexToRgb} from '../../utils/utils';
import {useEffect, useState} from 'react';
import CommentForm from '../../components/Pages/Product/CommentForm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useProduct from '../../hooks/products/useProduct';
import {capitalize, round} from 'lodash-es';
import {getProductImageURL} from '../../api/urbaninfusion/public/products';
import Counter from '../../components/Counter';
import {cartSlice} from '../../state/slices/cart';
import {connect} from 'react-redux';
import {RootState} from '../../state/store';
import Comment from '../../components/Pages/Product/Comment';
import useMe from '../../hooks/users/useMe';
import {UserRole} from '../../api/urbaninfusion/dto/user-dto';

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.user.jwt !== undefined,
    };
};

const mapDispatchToProps = {
    addMany: cartSlice.actions.addMany
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

function Product(props: Props) {
    const {id} = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    const [count, setCount] = useState<number>(0);
    const [showForm, setShowForm] = useState<boolean>(false);

    const {isLoading: isLoadingProduct, isError, data: product} = useProduct(id);
    const {isLoading: isLoadingMe, data: me} = useMe();

    const isLoading = isLoadingProduct || isLoadingMe;

    useEffect(() => {
        if (isError) {
            navigate('/products');
        }
    }, [isError]);

    const handleAddToCart = () => {
        if (product) {
            props.addMany(Array(count).fill(product));
            setCount(0);
        }
    };

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    return (
        <>
            <Page isLoading={isLoading}>
                <Section>
                    {
                        product && me && (
                            <Stack width={'100%'} spacing={16}>
                                <Stack direction={{md: 'row', xs: 'column'}} spacing={8}>
                                    <Stack flex={1} alignItems={'center'} justifyContent={'center'}>
                                        <img
                                            style={{height: 320, width: 320}}
                                            src={getProductImageURL(product.id)}
                                            alt={''}
                                        />
                                    </Stack>
                                    <Stack spacing={4} flex={1} justifyContent={'space-between'}>
                                        <Chip
                                            label={capitalize(product.category)}
                                            sx={{alignSelf: 'start'}}
                                            variant={'outlined'}
                                        />
                                        <Typography variant={'h3'}>{product.title}</Typography>
                                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                            <Typography variant={'h5'}>${product.price}</Typography>
                                            <Typography variant={'body2'} color={theme.palette.text.secondary}>
                                                {product.weight ? `/ ${product.weight}` : null}
                                            </Typography>
                                        </Stack>
                                        <Typography py={8}>{product.description}</Typography>
                                        <Stack direction={'row'} alignItems={'center'} spacing={4}>
                                            <Counter
                                                count={count}
                                                onIncrement={handleIncrement}
                                                onDecrement={handleDecrement}
                                            />
                                            <Button
                                                startIcon={<AddShoppingCartIcon/>}
                                                variant={'contained'}
                                                size={'large'}
                                                onClick={handleAddToCart}
                                            >
                                                Add to cart
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Divider/>
                                <Stack spacing={8}>
                                    <Typography variant={'h5'}>Comments</Typography>
                                    {
                                        props.isAuthenticated && (
                                            <Stack width={'100%'} spacing={4} alignItems={'start'}>
                                                <Button
                                                    variant={'contained'}
                                                    endIcon={
                                                        <ExpandMoreIcon
                                                            sx={{
                                                                transform: `rotate(${showForm ? 180 : 0}deg)`,
                                                                transition: 'all 0.2s ease-in-out'
                                                            }}
                                                        />}
                                                    onClick={() => setShowForm(!showForm)}
                                                >
                                                    Add a comment
                                                </Button>
                                                <Collapse orientation={'vertical'} in={showForm}>
                                                    <CommentForm/>
                                                </Collapse>
                                            </Stack>
                                        )
                                    }
                                    <Stack spacing={2}>
                                        {
                                            product.comments.length > 0 ? (
                                                <>
                                                    <Typography variant={'body1'}>
                                                        {`${product.comments.length} comment${product.comments.length !== 1 ? 's' : ''}`}
                                                    </Typography>
                                                    {
                                                        product.comments.map(comment => (
                                                            <Comment
                                                                key={comment.id}
                                                                comment={comment}
                                                                isAdmin={me?.role === UserRole.ADMIN}
                                                                isMe={me?.id === comment.user.id}
                                                                onEdit={() => {}}
                                                                onDelete={() => {}}
                                                            />
                                                        ))
                                                    }
                                                </>
                                            ) : (
                                                <Stack direction={'row'}>
                                                    <Typography>No comments yet</Typography>
                                                </Stack>
                                            )
                                        }
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

function Product2() {
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
                                            image={getProductImageURL(data.imageId)}
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
