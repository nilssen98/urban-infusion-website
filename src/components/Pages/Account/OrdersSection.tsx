import React from 'react';
import {OrderDto, OrderStatus} from '../../../api/urbaninfusion/dto/order-dto';
import {Divider, Paper, Stack, Typography} from '@mui/material';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import SendAndArchiveOutlinedIcon from '@mui/icons-material/SendAndArchiveOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';

interface Props {
    orders: OrderDto[];
}

export default function OrdersSection(props: Props) {
    const {orders} = props;

    const getStatusIcon = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.IDLE:
                return (
                    <HourglassBottomOutlinedIcon color={'disabled'}/>
                );
            case OrderStatus.PROCESSING:
                return (
                    <SendAndArchiveOutlinedIcon color={'info'}/>
                );
            case OrderStatus.SENT:
                return (
                    <SendOutlinedIcon color={'warning'}/>
                );
            case OrderStatus.DELIVERED:
                return (
                    <DoneOutlineOutlinedIcon color={'success'}/>
                );
        }
    };

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
                                    <Typography flex={1} textAlign={'right'} fontWeight={600}>Total
                                        ${order.totalPrice}
                                    </Typography>
                                </Stack>
                                <Divider/>
                                <Stack p={4} direction={'row'}>
                                    <Stack alignItems={'center'} direction={'row'} spacing={2}>
                                        {getStatusIcon(order.status)}
                                        <Typography textTransform={'capitalize'} flex={1}>{order.status.toLowerCase()}</Typography>
                                    </Stack>
                                    <Stack flex={1} spacing={2}>
                                        {
                                            order.products.map(({product, quantity}) => (
                                                <Typography textAlign={'right'} key={product.id}>
                                                    {product.title} x{quantity}
                                                </Typography>
                                            ))
                                        }
                                    </Stack>
                                    <Stack flex={1} spacing={2}>
                                        {
                                            order.products.map(({product, quantity}) => (
                                                <Typography textAlign={'right'} key={product.id}>
                                                    ${product.price * quantity}
                                                </Typography>
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
