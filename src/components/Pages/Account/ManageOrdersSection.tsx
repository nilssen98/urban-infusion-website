import React from 'react';
import {OrderDto, OrderStatus, OrderStatusUpdateDto} from '../../../api/urbaninfusion/dto/order-dto';
import Orders from './Orders';
import {useUpdateOrderStatus} from '../../../hooks/orders/useUpdateOrderStatus';

interface Props {
    orders?: OrderDto[];
}

export default function ManageOrdersSection(props: Props) {
    const useUpdateOrderStatusMutation = useUpdateOrderStatus();

    const onOrderStatusChange = (newOrder: OrderStatusUpdateDto) => {
        useUpdateOrderStatusMutation.mutate(newOrder);
    };

    return (
        <>
            <Orders
                orders={props.orders}
                admin
                onChangeStatus={onOrderStatusChange}
            />
        </>
    );
}
