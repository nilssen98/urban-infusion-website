import {Box, Card, CardContent, Typography} from "@mui/material";
import Section from "../../../components/Wrappers/Section";
import {useEffect, useState} from "react";
import {getProducts} from "../../../api/urbaninfusion/public/products";
import {ProductDto} from "../../../api/urbaninfusion/dto/product-dto";

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
            <Section>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    {
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
                    }
                </Box>
            </Section>
        </>
    )
}
