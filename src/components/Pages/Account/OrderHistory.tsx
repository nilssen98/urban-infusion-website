import {
    Box,
    Grid,
    Typography,
    Paper,
    TableContainer,
    TableCell,
    Table,
    TableHead,
    TableRow,
    TableBody
} from "@mui/material";

enum Status {
    IDLE,
    PROCESSING,
    SENT,
    DELIVERED
}

interface OrderProps {
    status?: Status;
    orderNumber?: number;
    totalPrice?: number;
    date?: Date;
}

export default function OrderHistory() {
    return (
        <>
            <TableContainer sx={{}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ordered</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Order&nbsp;number</TableCell>
                            <TableCell>Total&nbsp;price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}


/*
<Grid
    container
    sx={{
        pt: 5,
        width: 'md',
        justifyContent: 'center',

        border: '1px solid red'

    }}
>
    <Typography
        component={'h1'}
        variant={'h3'}
    >
        Order history
    </Typography>
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column'
        }}
    >

    </Box>
</Grid>*/
