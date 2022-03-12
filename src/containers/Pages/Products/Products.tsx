import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import {getProducts} from "../../../api/urbaninfusion/public/products";
import {ProductDto} from "../../../api/urbaninfusion/dto/product-dto";
import Categories from "./Categories";
import {ProductsList} from "./ProductsList";

export default function Products() {
    const [products, setProducts] = useState<ProductDto[]>([]);

    useEffect(() => {
        void (async () => {
            const products = await getProducts();
            setProducts(products);
        })();
    }, []);

    return (
        <>
            <Box sx={{
                display: 'flex',
                width: '100%'
            }}>
                <Categories/>
                <ProductsList/>
            </Box>
        </>
    )
}
