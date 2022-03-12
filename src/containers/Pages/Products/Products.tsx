import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import {getProducts} from "../../../api/urbaninfusion/public/products";
import {ProductDto} from "../../../api/urbaninfusion/dto/product-dto";
import Categories from "./Categories";

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
                {
                    /*
                    products.map(product => (
                        <Card key={product.id}>
                            <CardContent>
                                <Typography>{product.price}$</Typography>
                                <Typography>{product.title}</Typography>
                                <Typography>{product.description}</Typography>
                                <Typography>{product.weigh}</Typography>
                            </CardContent>
                        </Card>
                    ))
                     */
                }
            </Box>
        </>
    )
}
