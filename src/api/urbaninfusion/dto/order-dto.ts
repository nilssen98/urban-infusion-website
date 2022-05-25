import {ProductDto} from './product-dto';
import {UserDto} from './user-dto';

export enum OrderStatus {
    IDLE = 'IDLE',
    PROCESSING = 'PROCESSING',
    SENT = 'SENT',
    DELIVERED = 'DELIVERED',
}

export interface OrderProduct {
    quantity: number;
    id: number;
    product: ProductDto;
}

export interface OrderDto {
    products: OrderProduct[];
    status: OrderStatus;
    user: UserDto;
    totalPrice: number;
    date: string;
    orderId: number;
}


export interface OrderUpdateDto {
    id: number,
    status: OrderStatus,
}
