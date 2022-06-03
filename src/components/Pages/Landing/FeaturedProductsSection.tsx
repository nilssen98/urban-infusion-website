import Section from '../../Wrappers/Section';
import {Stack, useTheme} from '@mui/material';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import {defaultProductImageURL, getProductImageURL} from '../../../utils/productImageUtils';
import ProductCard from '../../Cards/product-card/ProductCard';
import {range, sampleSize} from 'lodash-es';

interface Props {
    products: ProductDto[];
}

export default function FeaturedProductsSection(props: Props) {
    const theme = useTheme();

    const getFeaturedProducts = (amount: number): ProductDto[] => {
        return sampleSize(range(amount), amount)
            .map(index => props.products[index])
            .filter(Boolean);
    };

    return (
        <>
            <Section bgColor={theme.palette.primary.light} sx={{my: 16}} label={'Featured'}>
                <Stack
                    direction={{md: 'row', xs: 'column'}}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    width={'100%'}
                    flexWrap={'wrap'}
                    gap={4}
                >
                    {
                        getFeaturedProducts(4)?.map(product => (
                            <ProductCard
                                key={product.id}
                                data={product}
                                img={product.imageId
                                    ? getProductImageURL(product.imageId)
                                    : defaultProductImageURL}
                            />
                        ))
                    }
                </Stack>
            </Section>
        </>
    );
}
