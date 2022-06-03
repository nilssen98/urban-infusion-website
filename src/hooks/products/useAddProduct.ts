import {useMutation, useQueryClient} from 'react-query';
import {addProduct, deleteProduct} from '../../api/urbaninfusion/public/products';
import {AddProductDto, ProductDto} from '../../api/urbaninfusion/dto/product-dto';

export const useAddProduct = () => {
    const query = useQueryClient();

    return useMutation(
        (data: AddProductDto) => addProduct(data), {
            onSuccess: () => query.invalidateQueries(['products'])
        }
    );
};
