import {useQuery, UseQueryResult} from 'react-query';
import {CategoriesDto} from '../../api/urbaninfusion/dto/categories-dto';
import {getUserOrders} from '../../api/urbaninfusion/public/orders';
import {OrderDto} from '../../api/urbaninfusion/dto/order-dto';

export default function useUserOrders(id?: number): UseQueryResult<OrderDto[]> {
    return useQuery(
        'user_orders',
        () => getUserOrders(id!), {
            enabled: id !== undefined
        }
    );
}
