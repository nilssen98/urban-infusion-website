import {useMutation, useQueryClient} from 'react-query';
import {addProduct, deleteProduct} from '../../api/urbaninfusion/public/products';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';

export const useAddProduct = () => {
    const query = useQueryClient();

    return useMutation(
        (data: Partial<ProductDto> & Pick<ProductDto, 'title' | 'price'>) => addProduct(data), {
            onSuccess: () => query.invalidateQueries(['products'])
        }
    );
};
