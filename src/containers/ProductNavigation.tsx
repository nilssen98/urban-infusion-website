import useCategories from '../hooks/categories/useCategories';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Stack, Typography, useTheme} from '@mui/material';
import UnstyledLink from '../components/UnstyledLink';

export default function ProductNavigation() {
    const [categories, setCategories] = useState<string[]>(['ALL']);

    const {data: fetchedCategories} = useCategories();
    const {pathname} = useLocation();
    const theme = useTheme();

    useEffect(() => {
        if (fetchedCategories) {
            setCategories(['ALL', ...(fetchedCategories as Array<string>)]);
        }
    }, [fetchedCategories]);

    const isActiveCategory = (category: string) => {
        return pathname.toLowerCase().indexOf(category.toLowerCase()) > -1;
    };

    return (
        <>
            <Stack flex={1} direction={'row'} alignItems={'center'} spacing={2}>
                {
                    categories.map(category => (
                        <UnstyledLink to={`/products/${category.toLowerCase()}`} key={category}>
                            <Stack
                                key={category}
                                height={32}
                                px={4}
                                my={1}
                                alignItems={'center'}
                                justifyContent={'center'}
                                borderBottom={'2px solid'}
                                borderColor={isActiveCategory(category) ? theme.palette.primary.main : 'transparent'}
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
                        </UnstyledLink>
                    ))
                }
            </Stack>
        </>
    );
}
