import Page from '../../../components/Wrappers/Page';
import {ProductsList} from '../../../components/Pages/Products/ProductsList';
import React from 'react';
import useProducts from '../../../hooks/products/useProducts';
import {useDeleteProduct} from '../../../hooks/products/useDeleteProduct';
import {useUpdateProduct} from '../../../hooks/products/useUpdateProduct';
import {useUpdateProductPicture} from '../../../hooks/products/useUpdateProductPicture';

export default function ManageProducts() {
    const {isLoading: isLoadingProducts, data: products} = useProducts();

    const deleteProductMutation = useDeleteProduct();
    const updateProductMutation = useUpdateProduct();
    const updateProductPictureMutation = useUpdateProductPicture();

    return (
        <>
            <Page isLoading={isLoadingProducts}>
                <ProductsList
                    products={products}
                    onDeleteProduct={deleteProductMutation.mutate}
                    onUpdateProduct={updateProductMutation.mutate}
                    onUpdateProductPicture={updateProductPictureMutation.mutate}
                    isLoading={deleteProductMutation.isLoading || updateProductMutation.isLoading || updateProductPictureMutation.isLoading}
                    admin
                />
            </Page>
        </>
    );
}
