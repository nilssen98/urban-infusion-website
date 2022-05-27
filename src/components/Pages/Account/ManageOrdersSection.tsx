import React from 'react';
import {OrderDto, OrderStatusUpdateDto} from '../../../api/urbaninfusion/dto/order-dto';
import Orders from './Orders';

interface Props {
    orders?: OrderDto[];
    onChangeStatus?: (newOrder: OrderStatusUpdateDto) => void;
}

export default function ManageOrdersSection(props: Props) {
    return (
        <>
            <Orders
                orders={props.orders}
                admin
                onChangeStatus={props.onChangeStatus}
            />
        </>
    );
}
