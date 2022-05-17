import useCategories from '../hooks/categories/useCategories';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Stack, Typography, useTheme} from '@mui/material';

export default function ProductNavigation() {
    const [categories, setCategories] = useState<string[]>(['ALL']);

    const {data: fetchedCategories} = useCategories();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const theme = useTheme();

    useEffect(() => {
        if (fetchedCategories) {
            setCategories(['ALL', ...(fetchedCategories as Array<string>)]);
        }
    }, [fetchedCategories]);

    const handleTabChange = (newValue: string) => {
        navigate(`/products/${newValue.toLowerCase()}`);
    };

    const isActiveCategory = (category: string) => {
        return pathname.toLowerCase().indexOf(category.toLowerCase()) > -1;
    };

    return (
        <>
            <Stack flex={1} direction={'row'} alignItems={'center'} spacing={2}>
                {
                    categories.map(category => (
                        <Stack
                            key={category}
                            onClick={() => handleTabChange(category)}
                            height={32}
                            borderBottom={'2px solid'}
                            borderColor={isActiveCategory(category) ? theme.palette.primary.main : 'transparent'}
                            px={4}
                            my={2}
                            sx={{
                                transition: 'all .2s ease',
                                cursor: 'pointer',
                                userSelect: 'none',
                                '&:hover': {
                                    borderColor: theme.palette.primary.main,
                                }
                            }}
                        >
                            <Typography
                                textTransform={'capitalize'}
                                variant={'body2'}
                            >
                                {category.toLowerCase()}
                            </Typography>
                        </Stack>
                    ))
                }
            </Stack>
        </>
    );
}
