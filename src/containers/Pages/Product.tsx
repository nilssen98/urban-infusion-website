import {useNavigate, useParams} from 'react-router-dom';
import Section from '../../components/Wrappers/Section';
import {Alert, Button, Chip, Collapse, Divider, Snackbar, Stack, Typography, useTheme} from '@mui/material';
import Page from '../../components/Wrappers/Page';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React, {useEffect, useState} from 'react';
import CommentForm from '../../components/Pages/Product/CommentForm';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useProduct from '../../hooks/products/useProduct';
import {capitalize} from 'lodash-es';
import {getProductImageURL} from '../../api/urbaninfusion/public/products';
import Counter from '../../components/Counter';
import {cartSlice} from '../../state/slices/cart';
import {connect} from 'react-redux';
import {RootState} from '../../state/store';
import Comment from '../../components/Pages/Product/Comment';
import useMe from '../../hooks/users/useMe';
import {UserRole} from '../../api/urbaninfusion/dto/user-dto';
import {useAddComment} from '../../hooks/comments/useAddComment';
import {useUpdateComment} from '../../hooks/comments/useUpdateComment';
import {useDeleteComment} from '../../hooks/comments/useDeleteComment';
import {AddCommentDto, UpdateCommentDto} from '../../api/urbaninfusion/dto/comment-dto';

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
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const addCommentMutation = useAddComment();
    const updateCommentMutation = useUpdateComment();
    const deleteCommentMutation = useDeleteComment();
    const mutations = [addCommentMutation, updateCommentMutation, deleteCommentMutation];
    const isMutationError = mutations.filter(m => m.isError).length > 0;

    const {isLoading: isLoadingProduct, isError, data: product} = useProduct(id);
    const {isLoading: isLoadingMe, data: me} = useMe();
    const isLoading = isLoadingProduct || isLoadingMe;

    useEffect(() => {
            if (isMutationError) {
                const err: any = mutations.find((m: any) => m.error)?.error;
                const msg = err?.response?.data || 'Unknown error occured, please try again...';
                setErrorMessage(msg);
                setError(true);
            }
        }, [isMutationError]
    );

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

    const handleDeleteComment = (commentId: number) => {
        deleteCommentMutation.mutate(commentId);
    };

    const handleUpdateComment = (data: UpdateCommentDto) => {
        updateCommentMutation.mutate(data);
    };

    const handleAddComment = (data: AddCommentDto) => {
        addCommentMutation.mutate(data);
    };

    return (
        <>
            <Snackbar
                open={error}
                autoHideDuration={5000}
                onClose={() => setError(false)}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert severity={'error'}>{errorMessage}</Alert>
            </Snackbar>
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
                                    <Stack spacing={4}>
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
                                                                onEdit={handleUpdateComment}
                                                                onDelete={handleDeleteComment}
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
