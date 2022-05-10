import {ProductImageDto} from '../dto/product-image-dto';
import axios from 'axios';
import {baseUrl} from './public';

export async function getProductImageById(id: number): Promise<ProductImageDto> {
    return (await axios.get<ProductImageDto>(`${baseUrl}/product-images/${id}`)).data;
}
