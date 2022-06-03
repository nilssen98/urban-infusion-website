import {OrderDto, OrderStatus, OrderStatusUpdateDto} from '../../../api/urbaninfusion/dto/order-dto';
import {Divider, MenuItem, Paper, Stack, TextField, Typography, useTheme} from '@mui/material';
import {capitalize, round} from 'lodash-es';
import React, {ChangeEvent} from 'react';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {enumValues} from '../../../utils/utils';

interface Props {
    order: OrderDto;
    admin?: boolean;
    onChangeStatus?: (newOrder: OrderStatusUpdateDto) => void;
}

export default function Order(props: Props) {
    const theme = useTheme();

    const getStatusIcon = (status: OrderStatus) => {
        return {
            [OrderStatus.RECEIVED]: <PendingOutlinedIcon color={'disabled'}/>,
            [OrderStatus.PROCESSING]: <HourglassBottomOutlinedIcon color={'info'}/>,
            [OrderStatus.SENT]: <LocalShippingOutlinedIcon color={'warning'}/>,
            [OrderStatus.DELIVERED]: <DoneOutlineOutlinedIcon color={'success'}/>,
            [OrderStatus.CANCELED]: <CancelOutlinedIcon color={'error'}/>,
        }[status] || <></>;
    };

    const handleChangeOrderStatus = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (props.onChangeStatus) {
            props.onChangeStatus({
                id: props.order.orderId,
                status: event.target.value as OrderStatus
            });
        }
    };

    return (
        <>
            <Paper variant={'outlined'}>
                <Stack p={4} direction={'row'} bgcolor={theme.palette.primary.light}>
                    <Typography flex={1} fontWeight={600}>
                        {props.order.date}
                    </Typography>
                    <Typography flex={1} textAlign={'right'} fontWeight={600}>
                        Order ID
                    </Typography>
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
                    {
                        props.admin && props.onChangeStatus
                            ? (
                                <Stack flex={1}>
                                    <TextField
                                        select
                                        value={props.order.status}
                                        onChange={handleChangeOrderStatus}
                                    >
                                        {
                                            enumValues(OrderStatus).map(option => (
                                                <MenuItem key={option} value={option}>
                                                    <Stack direction={'row'} spacing={2}>
                                                        {getStatusIcon(option as OrderStatus)}
                                                        <Typography>{capitalize(option)}</Typography>
                                                    </Stack>
                                                </MenuItem>
                                            ))
                                        }
                                    </TextField>
                                </Stack>
                            )
                            : (
                                <Stack flex={1} alignItems={'center'} direction={'row'} spacing={2}>
                                    {getStatusIcon(props.order.status)}
                                    <Typography textTransform={'capitalize'} flex={1}>
                                        {props.order.status.toLowerCase()}
                                    </Typography>
                                </Stack>
                            )
                    }
                    <Stack flex={1} spacing={2}>
                        <Typography textAlign={'right'}>
                            {props.order.orderId}
                        </Typography>
                    </Stack>
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
                                <Stack alignItems={'center'} direction={'row'} alignSelf={'end'} spacing={1} key={product.id}>
                                    <Typography>
                                        {product.title} {quantity > 1 ? `x${quantity}` : null}
                                    </Typography>
                                    <Typography color={'error'} variant={'subtitle2'}>
                                        {product.discount > 0 ? `-${product.discount * 100}%` : null}
                                    </Typography>
                                </Stack>
                            ))
                        }
                    </Stack>
                    <Stack flex={1} spacing={2}>
                        {
                            props.order.products.map(({product, quantity}) => (
                                product.discount > 0
                                    ? (
                                        <Stack alignSelf={'end'} direction={'row'} alignItems={'center'} spacing={1}>
                                            <Typography variant={'subtitle2'} sx={{textDecorationLine: 'line-through'}}>
                                                ${product.price}
                                            </Typography>
                                            <Typography variant={'subtitle1'}>
                                                ${round(product.price - (product.price * product.discount), 2)}
                                            </Typography>
                                        </Stack>
                                    )
                                    : (
                                        <Typography textAlign={'right'} key={product.id}>
                                            ${round((product.price * quantity), 2)}
                                        </Typography>
                                    )
                            ))
                        }
                    </Stack>
                </Stack>
            </Paper>
        </>
    );
}
