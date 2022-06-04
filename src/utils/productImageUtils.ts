import {baseUrl} from '../api/urbaninfusion/public/public';
import noImage from '../assets/images/no-image.svg';

export const defaultProductImageURL = noImage;

const productImagesEndpoint = 'product-images';

export function getProductImageURL(productID: number): string {
    return `${baseUrl}/${productImagesEndpoint}/${productID}`;
}
