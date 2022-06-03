import Page from '../../../components/Wrappers/Page';
import React, {useEffect, useMemo, useState} from 'react';
import useProducts from '../../../hooks/products/useProducts';
import {useDeleteProduct} from '../../../hooks/products/useDeleteProduct';
import {useUpdateProduct} from '../../../hooks/products/useUpdateProduct';
import {useUpdateProductPicture} from '../../../hooks/products/useUpdateProductPicture';
import {Dialog, Fab, Stack, Tooltip} from '@mui/material';
import {defaultProductImageURL, getProductImageURL} from '../../../utils/productImageUtils';
import EditableProductCard from '../../../components/Cards/product-card/EditableProductCard';
import {ProductDto, UpdateProductPictureDto} from '../../../api/urbaninfusion/dto/product-dto';
import {useAddProduct} from '../../../hooks/products/useAddProduct';
import AddIcon from '@mui/icons-material/Add';
import CreatableProductCard from '../../../components/Cards/product-card/CreatableProductCard';

export default function ManageProducts() {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [addingProduct, setAddingProduct] = useState<boolean>(false);

    const {isLoading: isLoadingProducts, data: products} = useProducts();

    const addProductMutation = useAddProduct();
    const deleteProductMutation = useDeleteProduct();
    const updateProductMutation = useUpdateProduct();
    const updateProductPictureMutation = useUpdateProductPicture();

    const isError = useMemo(() => {
            return updateProductMutation.isError
                || deleteProductMutation.isError
                || updateProductPictureMutation.isError
                || addProductMutation.isError;
        }, [
            updateProductMutation.isError,
            deleteProductMutation.isError,
            updateProductPictureMutation.isError,
            addProductMutation.isError
        ]
    );

    useEffect(() => {
            if (isError) {
                const err: any = [
                    updateProductMutation.error,
                    deleteProductMutation.error,
                    updateProductPictureMutation.error,
                    addProductMutation.error,
                ].find(Boolean) || 'An error occured, please try again...';
                setErrorMessage(err as string);
                setError(true);
            }
        }, [isError]
    );

    const handleOpenAddProduct = () => {
        setAddingProduct(true);
        // addProductMutation.mutate();
    };

    const handleCloseAddProduct = () => {
        setAddingProduct(false);
    };

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
                <Tooltip title={'Add product'} placement={'left'}>
                    <Fab
                        color={'secondary'}
                        sx={{
                            position: 'fixed',
                            bottom: 25, right: 25,
                        }}
                        onClick={handleOpenAddProduct}
                    >
                        <AddIcon/>
                    </Fab>
                </Tooltip>
                <Dialog open={addingProduct} onClose={handleCloseAddProduct}>
                    <CreatableProductCard/>
                </Dialog>
                <Stack
                    flexWrap={'wrap'}
                    direction={'row'}
                    gap={4}
                    alignItems={'start'}
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
