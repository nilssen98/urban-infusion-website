import {Button, Divider, InputBase, Paper, PaperProps, Stack, Typography, useTheme} from '@mui/material';
import {capitalize, omit} from 'lodash-es';
import {ProductDto, UpdateProductPictureDto} from '../../../api/urbaninfusion/dto/product-dto';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import {useState} from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {InputBaseProps} from '@mui/material/InputBase/InputBase';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Input from '../../Input';

const acceptedFormats = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp'];

type Props = {
    data: ProductDto;
    img?: string;
    onUpdateProduct: (data: Partial<ProductDto>) => void;
    onDeleteProduct: (id: number) => void;
    onUpdateProductPicture: (data: UpdateProductPictureDto) => void;
    isLoading?: boolean;
} & PaperProps;

export default function EditableProductCard(props: Props) {
    const paperProps = omit(props, ['data', 'img', 'onUpdateProduct', 'onDeleteProduct', 'onUpdateProductPicture', 'isLoading']);

    const [title, setTitle] = useState<string>(props.data.title || '');
    const [description, setDescription] = useState<string>(props.data.description || '');
    const [price, setPrice] = useState<number>(props.data.price || 0);
    const [discount, setDiscount] = useState<number>(props.data.discount * 100 || 0);
    const [weight, setWeight] = useState<number>(Number(props.data.weight.replace('oz', '')) || 0);
    const [category, setCategory] = useState<string>(capitalize(props.data.category) || '');

    const [editing, setEditing] = useState<boolean>(false);

    const theme = useTheme();

    const handleUpdateProduct = () => {
        props.onUpdateProduct({
            id: props.data.imageId || -1,
            title,
            description,
            price,
            discount: discount / 100,
            weight: `${weight}oz`,
            category: category.toUpperCase()
        });
    };

    const handleDeleteProduct = () => {
        props.onDeleteProduct(props.data.id);
    };

    const handleUpdateProductPicture = (event: any) => {
        props.onUpdateProductPicture({
            id: props.data.id,
            file: event.target.files[0]
        });
    };

    return (
        <>
            <Paper
                variant={'outlined'}
                {...paperProps}
                sx={{width: 387.5}}
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
                                left: '90%',
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
                                        accept={acceptedFormats.toString()}
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
                    <Stack flex={1} alignItems={'start'} width={'100%'}>
                        <Input
                            editing={editing}
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            size={'small'}
                            label={'Title'}
                        />
                        <Divider flexItem/>
                        <Input
                            editing={editing}
                            multiline
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            type={'number'}
                            size={'small'}
                            label={'Description'}
                        />
                        <Divider flexItem/>
                        <Input
                            editing={editing}
                            value={price}
                            type={'number'}
                            onChange={(e) =>
                                setPrice(Number(e.target.value))
                            }
                            size={'small'}
                            adornment={'$'}
                            label={'Price'}
                        />
                        <Divider flexItem/>
                        <Input
                            editing={editing}
                            value={discount}
                            onChange={(e) =>
                                setDiscount(Number(e.target.value))
                            }
                            type={'number'}
                            size={'small'}
                            adornment={'%'}
                            label={'Discount'}
                        />
                        <Divider flexItem/>
                        <Input
                            editing={editing}
                            value={weight}
                            onChange={(e) =>
                                setWeight(Number(e.target.value))
                            }
                            type={'number'}
                            size={'small'}
                            adornment={'oz'}
                            label={'Weight'}
                        />
                        <Divider flexItem/>
                        <Input
                            editing={editing}
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                            size={'small'}
                            label={'Category'}
                        />
                        <Divider flexItem/>
                        <Stack alignSelf={'end'} direction={'row'} spacing={2} p={2}>
                            <Button
                                startIcon={editing
                                    ? <CancelOutlinedIcon/>
                                    : <DeleteForeverOutlinedIcon/>
                                }
                                onClick={editing
                                    ? () => setEditing(false)
                                    : handleDeleteProduct
                                }
                                color={'error'}
                                disabled={props.isLoading}
                            >
                                {editing ? 'Cancel' : 'Delete'}
                            </Button>
                            <Button
                                variant={'contained'}
                                onClick={editing
                                    ? handleUpdateProduct
                                    : () => setEditing(true)
                                }
                                startIcon={editing
                                    ? <SaveOutlinedIcon/>
                                    : <EditOutlinedIcon/>
                                }
                                disabled={props.isLoading}
                            >
                                {editing ? 'Save' : 'Edit'}
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Paper>
        </>
    );
}
