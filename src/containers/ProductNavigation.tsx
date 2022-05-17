import useCategories from '../hooks/categories/useCategories';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Stack, Typography, useTheme} from '@mui/material';

export default function ProductNavigation() {
    const [tab, setTab] = useState<number | undefined>(undefined);
    const [categories, setCategories] = useState<string[]>(['ALL']);

    const {data: fetchedCategories} = useCategories();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const theme = useTheme();

    useEffect(() => {
    }, [pathname]);

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
                            onClick={() => handleTabChange(category)}
                            height={32}
                            borderBottom={isActiveCategory(category) ? '2px solid' : 'default'}
                            borderColor={theme.palette.secondary.main}
                            px={4}
                            my={2}
                            sx={{
                                cursor: 'pointer',
                                userSelect: 'none',
                                '&:hover': {
                                    borderBottom: '2px solid',
                                    borderColor: theme.palette.secondary.main,
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
