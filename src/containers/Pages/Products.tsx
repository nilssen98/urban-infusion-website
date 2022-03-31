import {Box} from '@mui/material';
import {useEffect, useState} from 'react';
import {getProducts} from '../../api/urbaninfusion/public/products';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';
import {ProductsList} from '../../components/Pages/Products/ProductsList';
import {useParams} from 'react-router-dom';
import SideNavigation from '../../components/SideNavigation';
import {useQuery} from "react-query";

const categories = {
    teas: [
        'black tea',
        'green tea',
        'white tea'
    ],
    accessories: [
        'cups'
    ],
    'gift cards': []
};

export default function Products() {
    const {id} = useParams();

    const {data: products} = useQuery(
        'products',
        () => getProducts()
    )

    return (
        <>
            <Box sx={{
                display: 'flex',
                width: '100%'
            }}>
                <SideNavigation
                    items={categories}
                    header={'Products'}
                    path={'products'}
                />
                {
                    products && <ProductsList products={products} id={id}/>
                }
            </Box>
        </>
    );
}
