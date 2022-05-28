import Page from '../../../components/Wrappers/Page';
import React from 'react';
import useProducts from '../../../hooks/products/useProducts';
import {useDeleteProduct} from '../../../hooks/products/useDeleteProduct';
import {useUpdateProduct} from '../../../hooks/products/useUpdateProduct';
import {useUpdateProductPicture} from '../../../hooks/products/useUpdateProductPicture';
import {Stack} from '@mui/material';
import {defaultProductImageURL, getProductImageURL} from '../../../utils/productImageUtils';
import EditableProductCard from '../../../components/Cards/EditableProductCard';
import {ProductDto, UpdateProductPictureDto} from '../../../api/urbaninfusion/dto/product-dto';

export default function ManageProducts() {
    const {isLoading: isLoadingProducts, data: products} = useProducts();

    const deleteProductMutation = useDeleteProduct();
    const updateProductMutation = useUpdateProduct();
    const updateProductPictureMutation = useUpdateProductPicture();

    const handleDeleteProduct = (id: number) => {
        deleteProductMutation.mutate(id);
    };

    const handleUpdateProduct = (data: Partial<ProductDto>) => {
        updateProductMutation.mutate(data);
    };

    const handleUpdateProductPicture = (data: UpdateProductPictureDto) => {
        updateProductPictureMutation.mutate(data);
    };

    return (
        <>
            <Page isLoading={isLoadingProducts}>
                <Stack
                    flexWrap={'wrap'}
                    direction={'row'}
                    gap={4}
                    overflow={'auto'}
                >
                    {
                        products?.map(product => (<EditableProductCard
                            data={product}
                            onDeleteProduct={handleDeleteProduct}
                            onUpdateProduct={handleUpdateProduct}
                            onUpdateProductPicture={handleUpdateProductPicture}
                            key={product.id}
                            img={product.imageId
                                ? `${getProductImageURL(product.imageId)}#${Math.random()}`
                                : defaultProductImageURL}
                        />))
                    }
                </Stack>
            </Page>
        </>
    );
}
