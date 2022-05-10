import {baseUrl} from '../api/urbaninfusion/public/public';

const productImagesEndpoint = 'product-images';

export function getProductImageURL(productID: number): string {
    return `${baseUrl}/${productImagesEndpoint}/${productID}`;
}
