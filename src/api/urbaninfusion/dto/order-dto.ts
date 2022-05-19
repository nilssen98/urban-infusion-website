import {ProductDto} from './product-dto';
import {UserDto} from './user-dto';

export interface OrderDto {
    products: ProductDto[] & {
        quantity: number,
        id: number
    };
    status: string;
    user: UserDto;
    totalPrice: number;
    date: string;
    orderId: number;
}
