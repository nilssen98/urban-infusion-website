import {CategoriesDto} from '../dto/categories-dto';
import axios from 'axios';
import {baseUrl} from './public';
import {store} from '../../../state/store';
import {OrderDto} from '../dto/order-dto';

export async function getUserOrders(id: number): Promise<OrderDto[]> {
    const jwt = store.getState().user.jwt;
    return (await axios.get<OrderDto[]>(`${baseUrl}/orders/users/${id}`, { headers: { Authorization: jwt || '' } })).data;
}
