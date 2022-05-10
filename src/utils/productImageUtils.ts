import {baseUrl} from '../api/urbaninfusion/public/public';

export const defaultProductImageURL = 'https://i.imgur.com/ZG4W7Le.jpg';

const productImagesEndpoint = 'product-images';

export function getProductImageURL(productID: number): string {
    return `${baseUrl}/${productImagesEndpoint}/${productID}`;
}
