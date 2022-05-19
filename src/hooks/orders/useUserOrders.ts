import {useQuery, UseQueryResult} from 'react-query';
import {CategoriesDto} from '../../api/urbaninfusion/dto/categories-dto';
import {getUserOrders} from '../../api/urbaninfusion/public/orders';

export default function useUserOrders(id?: number): UseQueryResult<CategoriesDto> {
    return useQuery(
        'user_orders',
        () => getUserOrders(id!), {
            enabled: id !== undefined
        }
    );
}
