import Section from '../../Wrappers/Section';
import {Box, Button, Grid, Typography, useTheme} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import ProductCardNew from '../../Cards/ProductCardNew';
import {getProducts} from '../../../api/urbaninfusion/public/products';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import {useQuery} from 'react-query';
import {defaultProductImageURL, getProductImageURL} from '../../../utils/productImageUtils';
import useProducts from '../../../hooks/products/useProducts';
import ProductCard from '../../Cards/ProductCard';

export default function FeaturedProductsSection() {
    const theme = useTheme();

    const productsToShow = 4;

    const navigate = useNavigate();
    const {data: products} = useProducts();

    function getRandomProductIndexes(numberOfProducts: number, productsSize: number): Array<number> {
        if (numberOfProducts > productsSize) {
            return new Array(productsSize).fill(0);
        }
        const nums = new Set<number>();
        while (nums.size !== numberOfProducts) {
            nums.add(randomInteger(0, productsSize - 1));
        }
        return Array.of(...nums);
    }

    /**
     * Random int between min and max, inclusive.
     */
    function randomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <>
            <Section bgColor={theme.palette.primary.light} sx={{my: 16}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Typography
                        variant={'h4'}
                        sx={{
                            textAlign: 'center',
                            marginBottom: 12,
                        }}
                    >
                        Featured products
                    </Typography>
                    <Grid
                        container
                        sx={{
                            justifyContent: 'space-around',
                            width: '100%',
                            marginBottom: 16,
                            rowGap: 12,
                        }}
                    >
                        {
                            products && (getRandomProductIndexes(productsToShow, products.length)
                                .map(index => products[index])
                                .map(product => (
                                    <Grid
                                        container
                                        key={product.id}
                                        item
                                        xs={12} sm={6} lg={3}
                                        sx={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <ProductCard
                                            key={product.id}
                                            data={product}
                                            img={product.imageId
                                                ? getProductImageURL(product.imageId)
                                                : defaultProductImageURL}
                                        />
                                    </Grid>
                                ))
                            )
                        }
                    </Grid>
                    <Button
                        variant={'contained'}
                        size={'large'}
                        onClick={() => navigate('/products')}
                    >
                        Shop all
                    </Button>
                </Box>
            </Section>
        </>
    );
}
