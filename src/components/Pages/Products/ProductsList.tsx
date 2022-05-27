import ProductCard from '../../Cards/ProductCard';
import {ProductDto} from '../../../api/urbaninfusion/dto/product-dto';
import {Stack} from '@mui/material';
import {defaultProductImageURL, getProductImageURL} from '../../../utils/productImageUtils';
import EditableProductCard from '../../Cards/EditableProductCard';

interface Props {
    products?: ProductDto[];
    admin?: boolean;
    onUpdateProduct?: (data: Partial<ProductDto>) => void;
    onDeleteProduct?: (id: number) => void;
    isLoading?: boolean;
}

export function ProductsList(props: Props) {
    return (
        <>
            <Stack
                flexWrap={'wrap'}
                direction={'row'}
                gap={4}
                overflow={'auto'}
            >
                {
                    props.products?.map(product => {
                            return props.admin
                                ? (<EditableProductCard
                                        data={product}
                                        isLoading={props.isLoading}
                                        onDeleteProduct={props.onDeleteProduct}
                                        onUpdateProduct={props.onUpdateProduct}
                                        key={product.id}
                                        img={product.imageId
                                            ? getProductImageURL(product.imageId)
                                            : defaultProductImageURL}
                                    />
                                )
                                : (<ProductCard
                                    data={product}
                                    key={product.id}
                                    img={product.imageId
                                        ? getProductImageURL(product.imageId)
                                        : defaultProductImageURL}
                                />);
                        }
                    )
                }
            </Stack>
        </>
    );
}
