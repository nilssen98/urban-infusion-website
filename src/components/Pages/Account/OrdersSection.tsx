import React from 'react';
import {OrderDto} from '../../../api/urbaninfusion/dto/order-dto';
import {Divider, Paper, Stack, Typography} from '@mui/material';

interface Props {
    orders: OrderDto[];
}

export default function OrdersSection(props: Props) {
    const {orders} = props;

    return (
        <>
            <Stack spacing={4}>
                {
                    orders.map(order => (
                        <Paper key={order.orderId} variant={'outlined'}>
                            <Stack>
                                <Stack p={4} direction={'row'}>
                                    <Typography flex={1} fontWeight={600}>{order.date}</Typography>
                                    <Typography flex={1} textAlign={'right'} fontWeight={600}>Products</Typography>
                                    <Typography flex={1} textAlign={'right'} fontWeight={600}>Total ${order.totalPrice}</Typography>
                                </Stack>
                                <Divider/>
                                <Stack p={4} direction={'row'}>
                                    <Typography flex={1}>{order.status}</Typography>
                                    <Stack flex={1} spacing={2}>
                                        {
                                            order.products.map(({product, quantity}) => (
                                                <Typography textAlign={'right'} key={product.id}>{product.title} x{quantity}</Typography>
                                            ))
                                        }
                                    </Stack>
                                    <Stack flex={1} spacing={2}>
                                        {
                                            order.products.map(({product, quantity}) => (
                                                <Typography textAlign={'right'} key={product.id}>${product.price * quantity}</Typography>
                                            ))
                                        }
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Paper>
                    ))
                }
            </Stack>
        </>
    );
}
