import axios from 'axios';
import {baseUrl} from './public';
import {store} from '../../../state/store';
import {OrderDto, OrderStatusUpdateDto} from '../dto/order-dto';

const jwt = store.getState().user.jwt;
const authHeaders = {
    Authorization: jwt || ''
};

export async function getUserOrders(id: number): Promise<OrderDto[]> {
    return (await axios.get<OrderDto[]>(`${baseUrl}/orders/users/${id}`,
        {headers: authHeaders}
    )).data;
}

export async function getOrders(): Promise<OrderDto[]> {
    return (await axios.get<OrderDto[]>(`${baseUrl}/orders`,
        {headers: authHeaders}
    )).data;
}

export async function updateOrderStatus(data: OrderStatusUpdateDto): Promise<any> {
    return (await axios.patch(`${baseUrl}/orders`,
        {...data},
        {headers: authHeaders}
    ));
}
