import {Box} from '@mui/material';
import {useEffect, useState} from 'react';
import {getProducts} from '../../../api/urbaninfusion/public/products';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import Categories from './Categories';
import {ProductsList} from './ProductsList';
import {useParams} from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const {id} = useParams();

    useEffect(() => {
        void (async () => {
            const data = await getProducts();
            setProducts(data);
        })();
    }, []);

    return (
        <>
            <Box sx={{
                display: 'flex',
                width: '100%'
            }}>
                <Categories/>
                <ProductsList id={id}/>
            </Box>
        </>
    );
}
