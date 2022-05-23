import Section from '../../Wrappers/Section';
import {Box, Button, Grid, Typography, useTheme} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import {defaultProductImageURL, getProductImageURL} from '../../../utils/productImageUtils';
import ProductCard from '../../Cards/ProductCard';
import {range, sampleSize} from 'lodash-es';

interface Props {
    products: ProductDto[];
}

export default function FeaturedProductsSection(props: Props) {
    const theme = useTheme();

    const getFeaturedProducts = (amount: number): ProductDto[] => {
        return sampleSize(range(0, amount), amount)
            .map(index => props.products[index])
            .filter(Boolean);
    };

    return (
        <>
            <Section bgColor={theme.palette.primary.light} sx={{my: 16}} label={'Featured'}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Grid
                        container
                        sx={{
                            justifyContent: 'space-around',
                            width: '100%',
                            rowGap: 12,
                        }}
                    >
                        {
                            props.products &&
                            getFeaturedProducts(4)?.map(product => (
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
                        }
                    </Grid>
                </Box>
            </Section>
        </>
    );
}
