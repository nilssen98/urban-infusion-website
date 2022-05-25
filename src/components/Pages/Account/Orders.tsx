import {Divider, Paper, Stack, Typography, useTheme} from '@mui/material';
import React from 'react';
import {OrderDto, OrderStatus} from '../../../api/urbaninfusion/dto/order-dto';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import SendAndArchiveOutlinedIcon from '@mui/icons-material/SendAndArchiveOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import {round} from 'lodash-es';

interface Props {
    orders?: OrderDto[];
    admin?: boolean;
}

export default function Orders(props: Props) {
    const theme = useTheme();

    const getStatusIcon = (status: OrderStatus) => {
        return {
            [OrderStatus.IDLE]: <HourglassBottomOutlinedIcon color={'disabled'}/>,
            [OrderStatus.PROCESSING]: <SendAndArchiveOutlinedIcon color={'disabled'}/>,
            [OrderStatus.SENT]: <SendOutlinedIcon color={'disabled'}/>,
            [OrderStatus.DELIVERED]: <DoneOutlineOutlinedIcon color={'disabled'}/>,
        }[status] || <></>;
    };

    return (
        <Stack spacing={4}>
            {
                props.orders && props.orders.length > 0
                    ? (
                        props.orders?.map(order => (
                            <Paper key={order.orderId} variant={'outlined'}>
                                <Stack>
                                    <Stack p={4} direction={'row'} bgcolor={theme.palette.primary.light}>
                                        <Typography flex={1} fontWeight={600}>
                                            {order.date}
                                        </Typography>
                                        {
                                            props.admin ?? (
                                                <Typography flex={1} textAlign={'right'} fontWeight={600}>
                                                    Order ID
                                                </Typography>
                                            )
                                        }
                                        {
                                            props.admin ?? (
                                                <Typography flex={1} textAlign={'right'} fontWeight={600}>
                                                    User
                                                </Typography>
                                            )
                                        }
                                        <Typography flex={1} textAlign={'right'} fontWeight={600}>
                                            Products
                                        </Typography>
                                        <Typography flex={1} textAlign={'right'} fontWeight={600}>
                                            Total ${order.totalPrice}
                                        </Typography>
                                    </Stack>
                                    <Divider/>
                                    <Stack p={4} direction={'row'}>
                                        <Stack flex={1} alignItems={'center'} direction={'row'} spacing={2}>
                                            {getStatusIcon(order.status)}
                                            <Typography
                                                textTransform={'capitalize'}
                                                flex={1}>
                                                {order.status.toLowerCase()}
                                            </Typography>
                                        </Stack>
                                        {
                                            props.admin ?? (
                                                <Stack flex={1} spacing={2}>
                                                    <Typography textAlign={'right'}>
                                                        {order.orderId}
                                                    </Typography>
                                                </Stack>
                                            )
                                        }
                                        {
                                            props.admin ?? (
                                                <Stack flex={1} spacing={2}>
                                                    <Typography textAlign={'right'}>
                                                        {order.user.username}
                                                    </Typography>
                                                </Stack>
                                            )
                                        }
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
                                                        ${round((product.price * quantity), 2)}
                                                    </Typography>
                                                ))
                                            }
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Paper>
                        )))
                    : (
                        <Stack
                            color={theme.palette.text.disabled}
                            width={'100%'}
                        >
                            <Typography variant={'h5'}>No orders</Typography>
                        </Stack>
                    )
            }
        </Stack>
    );
}
