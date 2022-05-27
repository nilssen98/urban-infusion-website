import {ProductDto, UpdateProductPictureDto} from '../dto/product-dto';
import axios from 'axios';
import {baseUrl} from './public';
import {store} from '../../../state/store';

export async function getProducts(): Promise<ProductDto[]> {
    return (await axios.get<ProductDto[]>(`${baseUrl}/products`)).data;
}

export async function getProductById(id: string): Promise<ProductDto> {
    return (await axios.get<ProductDto>(`${baseUrl}/products/${id}`)).data;
}

export async function updateProduct(data: Partial<ProductDto>): Promise<any> {
    const jwt = store.getState().user.jwt || '';
    return (await axios.patch(`${baseUrl}/products`,
        {...data},
        {headers: {Authorization: jwt}}
    ));
}

export async function deleteProduct(id: number): Promise<any> {
    const jwt = store.getState().user.jwt || '';
    return (await axios.delete(`${baseUrl}/products/${id}`,
        {headers: {Authorization: jwt}}
    ));
}

export async function updateProductPicture(data: UpdateProductPictureDto): Promise<any> {
    const jwt = store.getState().user.jwt || '';
    return (await axios.post(`${baseUrl}/product-images/${data.id}`,
        {data: data.data},
        {headers: {Authorization: jwt}}
    ));
}
