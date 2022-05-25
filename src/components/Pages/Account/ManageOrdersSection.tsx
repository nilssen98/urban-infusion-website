import React from 'react';
import {OrderDto} from '../../../api/urbaninfusion/dto/order-dto';
import Orders from './Orders';

interface Props {
    orders: OrderDto[];
}

export default function ManageOrdersSection(props: Props) {
    return (
        <>
            <Orders orders={props.orders}/>
        </>
    );
}
