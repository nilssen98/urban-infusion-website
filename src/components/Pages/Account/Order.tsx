import {OrderDto, OrderStatus} from '../../../api/urbaninfusion/dto/order-dto';
import {Divider, Paper, Stack, Typography, useTheme} from '@mui/material';
import {round} from 'lodash-es';
import React, {useMemo} from 'react';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';

interface Props {
    order: OrderDto;
    admin?: boolean;
}

export default function Order(props: Props) {
    const theme = useTheme();

    const statusIcon = useMemo(() => {
        return {
            [OrderStatus.RECEIVED]: <PendingOutlinedIcon color={'disabled'}/>,
            [OrderStatus.PROCESSING]: <HourglassBottomOutlinedIcon color={'warning'}/>,
            [OrderStatus.SENT]: <LocalShippingOutlinedIcon color={'info'}/>,
            [OrderStatus.DELIVERED]: <DoneOutlineOutlinedIcon color={'success'}/>,
        }[props.order.status] || <></>;
    }, [props.order.status]);

    return (
        <>
            <Paper variant={'outlined'}>
                <Stack p={4} direction={'row'} bgcolor={theme.palette.primary.light}>
                    <Typography flex={1} fontWeight={600}>
                        {props.order.date}
                    </Typography>
                    {
                        props.admin && (
                            <Typography flex={1} textAlign={'right'} fontWeight={600}>
                                Order ID
                            </Typography>
                        )
                    }
                    {
                        props.admin && (
                            <Typography flex={1} textAlign={'right'} fontWeight={600}>
                                User
                            </Typography>
                        )
                    }
                    <Typography flex={1} textAlign={'right'} fontWeight={600}>
                        Products
                    </Typography>
                    <Typography flex={1} textAlign={'right'} fontWeight={600}>
                        Total ${props.order.totalPrice}
                    </Typography>
                </Stack>
                <Divider/>
                <Stack p={4} direction={'row'} alignItems={'center'}>
                    <Stack flex={1} alignItems={'center'} direction={'row'} spacing={2}>
                        {statusIcon}
                        <Typography
                            textTransform={'capitalize'}
                            flex={1}>
                            {props.order.status.toLowerCase()}
                        </Typography>
                    </Stack>
                    {
                        props.admin && (
                            <Stack flex={1} spacing={2}>
                                <Typography textAlign={'right'}>
                                    {props.order.orderId}
                                </Typography>
                            </Stack>
                        )
                    }
                    {
                        props.admin && (
                            <Stack flex={1} spacing={2}>
                                <Typography textAlign={'right'}>
                                    {props.order.user.username}
                                </Typography>
                            </Stack>
                        )
                    }
                    <Stack flex={1} spacing={2}>
                        {
                            props.order.products.map(({product, quantity}) => (
                                <Typography textAlign={'right'} key={product.id}>
                                    {product.title} x{quantity}
                                </Typography>
                            ))
                        }
                    </Stack>
                    <Stack flex={1} spacing={2}>
                        {
                            props.order.products.map(({product, quantity}) => (
                                <Typography textAlign={'right'} key={product.id}>
                                    ${round((product.price * quantity), 2)}
                                </Typography>
                            ))
                        }
                    </Stack>
                </Stack>
            </Paper>
        </>
    );
}
