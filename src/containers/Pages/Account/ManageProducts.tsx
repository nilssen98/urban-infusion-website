import Page from '../../../components/Wrappers/Page';
import React, {useEffect, useState} from 'react';
import useProducts from '../../../hooks/products/useProducts';
import {useDeleteProduct} from '../../../hooks/products/useDeleteProduct';
import {useUpdateProduct} from '../../../hooks/products/useUpdateProduct';
import {useUpdateProductPicture} from '../../../hooks/products/useUpdateProductPicture';
import {Alert, Dialog, DialogTitle, Fab, Snackbar, Stack, Tooltip} from '@mui/material';
import {defaultProductImageURL, getProductImageURL} from '../../../utils/productImageUtils';
import EditableProductCard from '../../../components/Cards/product-card/EditableProductCard';
import {AddProductDto, ProductDto, UpdateProductPictureDto} from '../../../api/urbaninfusion/dto/product-dto';
import {useAddProduct} from '../../../hooks/products/useAddProduct';
import AddIcon from '@mui/icons-material/Add';
import CreatableProductCard from '../../../components/Cards/product-card/CreatableProductCard';
import useCategories from '../../../hooks/categories/useCategories';

export default function ManageProducts() {
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [addingProduct, setAddingProduct] = useState<boolean>(false);

    const {isLoading: isLoadingProducts, data: products} = useProducts();
    const {isLoading: isLoadingCategories, data: categories} = useCategories();

    const isLoading = isLoadingProducts || isLoadingCategories;

    const addProductMutation = useAddProduct();
    const deleteProductMutation = useDeleteProduct();
    const updateProductMutation = useUpdateProduct();
    const updateProductPictureMutation = useUpdateProductPicture();

    const mutations = [
        updateProductMutation,
        deleteProductMutation,
        updateProductPictureMutation,
        addProductMutation
    ];

    const isError = mutations.map(m => m.isError).find(Boolean);
    const isSuccess = mutations.map(m => m.isSuccess).find(Boolean);

    useEffect(() => {
            if (isError) {
                const err = mutations.map(m => m.error)
                    .find(Boolean) || 'An error occured, please try again...';
                setErrorMessage(err as string);
                setError(true);
            }
        }, [isError]
    );

    useEffect(() => {
            if (isSuccess) {

            }
        }, [isSuccess]
    );

    const handleAddProduct = (data: AddProductDto) => {
        addProductMutation.mutate(data);
        handleCloseAddProduct();
    };

    const handleOpenAddProduct = () => {
        setAddingProduct(true);
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
            <Snackbar
                open={error}
                autoHideDuration={6000}
                onClose={() => setError(false)}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert severity={'error'}>{errorMessage}</Alert>
            </Snackbar>
            <Page isLoading={isLoading}>
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
                    <DialogTitle>Add a product</DialogTitle>
                    <CreatableProductCard
                        onCancel={handleCloseAddProduct}
                        onAdd={handleAddProduct}
                        categories={categories}
                    />
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
