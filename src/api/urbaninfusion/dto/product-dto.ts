import {CommentDto} from './comment-dto';
import {Category} from './categories-dto';

export interface ProductDto {
    id: number;
    price: number;
    discount: number;
    imageId: number | null;
    title: string;
    description: string;
    weight: string;
    comments: CommentDto[];
    category: string;
}
