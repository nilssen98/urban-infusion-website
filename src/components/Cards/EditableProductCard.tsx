import {Button, Divider, InputAdornment, Paper, PaperProps, Stack, TextField, useTheme} from '@mui/material';
import {capitalize, omit, toNumber} from 'lodash-es';
import {ProductDto, UpdateProductPictureDto} from '../../api/urbaninfusion/dto/product-dto';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import {useEffect, useState} from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

type Props = {
    data: ProductDto;
    img?: string;
    onUpdateProduct?: (data: Partial<ProductDto>) => void;
    onDeleteProduct?: (id: number) => void;
    onUpdateProductPicture?: (data: UpdateProductPictureDto) => void;
    isLoading?: boolean;
} & PaperProps;

export default function EditableProductCard(props: Props) {
    const paperProps = omit(props, ['data', 'img', 'onUpdateProduct', 'onDeleteProduct', 'onUpdateProductPicture', 'isLoading']);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [category, setCategory] = useState<string>('');

    const theme = useTheme();


    useEffect(() => {
        setTitle(props.data.title);
        setDescription(props.data.description);
        setPrice(props.data.price);
        setDiscount(props.data.discount * 100);
        setWeight(toNumber(props.data.weight.replace('oz', '')));
        setCategory(capitalize(props.data.category));
    }, []);

    const handleUpdateProduct = () => {
        if (props.onUpdateProduct) {
            props.onUpdateProduct({
                id: props.data.imageId || -1,
                title,
                description,
                price,
                discount: discount / 100,
                weight: `${weight}oz`,
                category: category.toUpperCase()
            });
        }
    };

    const handleDeleteProduct = () => {
        if (props.onDeleteProduct) {
            props.onDeleteProduct(props.data.id);
        }
    };

    const handleUpdateProductPicture = (event: any) => {
        if (props.onUpdateProductPicture) {
            props.onUpdateProductPicture({
                id: props.data.id,
                file: event.target.files[0]
            });
        }
    };

    return (
        <>
            <Paper
                variant={'outlined'}
                {...paperProps}
            >
                <Stack
                    textAlign={'center'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    height={'100%'}
                >
                    <Stack
                        position={'relative'}
                        p={4}
                        alignItems={'center'}
                        justifyContent={'center'}
                        width={'100%'}
                    >
                        <img
                            loading={'lazy'}
                            src={props.img}
                            style={{width: 175, height: 175}}
                            alt={''}
                        />
                        <Stack
                            style={{
                                position: 'absolute',
                                top: '80%',
                                left: '85%',
                            }}
                        >
                            <Stack alignItems={'center'} justifyContent={'center'}>
                                <label>
                                    <input
                                        hidden
                                        style={{
                                            position: 'absolute',
                                        }}
                                        type={'file'}
                                        multiple={false}
                                        accept={'image/*'}
                                        onChange={handleUpdateProductPicture}
                                    />
                                    <AddPhotoAlternateOutlinedIcon
                                        style={{
                                            height: 32,
                                            width: 32,
                                            cursor: 'pointer',
                                            color: theme.palette.primary.main
                                        }}
                                    />
                                </label>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Divider flexItem/>
                    <Stack flex={1} p={4} spacing={4} alignItems={'start'} width={'100%'}>
                        <TextField
                            fullWidth
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            label={'Title'}
                            size={'small'}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            type={'number'}
                            label={'Description'}
                            size={'small'}
                        />
                        <TextField
                            fullWidth
                            value={price}
                            type={'number'}
                            onChange={(e) =>
                                setPrice(toNumber(e.target.value))
                            }
                            label={'Price'}
                            size={'small'}
                            InputProps={{
                                startAdornment: <InputAdornment position={'start'}>$</InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            value={discount}
                            onChange={(e) =>
                                setDiscount(toNumber(e.target.value))
                            }
                            type={'number'}
                            label={'Discount'}
                            size={'small'}
                            InputProps={{
                                startAdornment: <InputAdornment position={'start'}>%</InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            value={weight}
                            onChange={(e) =>
                                setWeight(toNumber(e.target.value))
                            }
                            type={'number'}
                            label={'Weight'}
                            size={'small'}
                            InputProps={{
                                startAdornment: <InputAdornment position={'start'}>oz</InputAdornment>,
                            }}
                        />
                        <TextField
                            fullWidth
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            label={'Category'}
                            size={'small'}
                        />
                        <Stack alignSelf={'end'} direction={'row'} spacing={2}>
                            <Button
                                startIcon={<DeleteForeverOutlinedIcon/>}
                                onClick={handleDeleteProduct}
                                color={'error'}
                                disabled={props.isLoading}
                            >
                                Delete
                            </Button>
                            <Button
                                variant={'contained'}
                                onClick={handleUpdateProduct}
                                startIcon={<SaveOutlinedIcon/>}
                                disabled={props.isLoading}
                            >
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        </>
    )
        ;
}
