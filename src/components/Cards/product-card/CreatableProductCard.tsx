import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import {Button, Divider, Paper, Stack} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Input from '../../Input';
import {useState} from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {CategoriesDto} from '../../../api/urbaninfusion/dto/categories-dto';

interface Props {
    onAdd: (data: Partial<ProductDto>) => void;
    onCancel: () => void;
    categories: CategoriesDto;
}

export default function CreatableProductCard(props: Props) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [weight, setWeight] = useState<number>(0);
    const [category, setCategory] = useState<string>('');

    const handleAdd = () => {
        props.onAdd({
            title,
            description,
            price,
            discount: discount / 100,
            weight: `${weight}oz`,
            category: category.toUpperCase()
        });
    };

    const handleCancel = () => {
        props.onCancel();
    };

    return (
        <>
            <Paper
                variant={'outlined'}
                sx={{width: 387.5, background: 'transparent', border: 'none'}}
            >
                <Stack
                    textAlign={'center'} alignItems={'center'} justifyContent={'center'}
                    height={'100%'}
                >
                    <Divider flexItem/>
                    <Input
                        editing
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        size={'small'}
                        label={'title'}
                    />
                    <Divider flexItem/>
                    <Input
                        editing
                        multiline
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        type={'number'}
                        size={'small'}
                        label={'description'}
                    />
                    <Divider flexItem/>
                    <Input
                        editing
                        value={price}
                        type={'number'}
                        onChange={(e) =>
                            setPrice(Number(e.target.value))
                        }
                        size={'small'}
                        adornment={'$'}
                        label={'price'}
                    />
                    <Divider flexItem/>
                    <Input
                        editing
                        value={discount}
                        onChange={(e) =>
                            setDiscount(Number(e.target.value))
                        }
                        type={'number'}
                        size={'small'}
                        adornment={'%'}
                        label={'discount'}
                    />
                    <Divider flexItem/>
                    <Input
                        editing
                        value={weight}
                        onChange={(e) =>
                            setWeight(Number(e.target.value))
                        }
                        type={'number'}
                        size={'small'}
                        adornment={'oz'}
                        label={'weight'}
                    />
                    <Divider flexItem/>
                    <Input
                        editing
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        size={'small'}
                        label={'category'}
                    />
                    <Divider flexItem/>
                    <Stack alignSelf={'end'} direction={'row'} spacing={2} p={2}>
                        <Button
                            startIcon={<CancelOutlinedIcon/>}
                            color={'error'}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant={'contained'}
                            startIcon={<AddOutlinedIcon/>}
                            onClick={handleAdd}
                        >
                            Add
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </>
    );
}
