import {CommentDto} from './comment-dto';

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

export interface UpdateProductPictureDto {
    data: any;
    id: number;
}
