import {Button, Divider, Paper, PaperProps, Stack, Typography, useTheme} from '@mui/material';
import {omit} from 'lodash-es';
import {ProductDto} from '../../api/urbaninfusion/dto/product-dto';
import UnstyledLink from '../UnstyledLink';

type Props = {
    data: ProductDto;
    img?: string;
} & PaperProps;

ProductCard.defaultProps = {
    title: '',
};

export default function ProductCard(props: Props) {
    const paperProps = omit(props, ['data']);

    const theme = useTheme();

    return (
        <>
            <Paper
                variant={'outlined'}
                {...paperProps}
            >
                <Stack
                    width={'100%'}
                    height={'100%'}
                    maxWidth={200}
                    maxHeight={400}
                >
                    {
                        props.img && (
                            <UnstyledLink to={`/products/${props.data.id}`}>
                                <Stack p={4}>
                                    <img src={props.img} style={{width: '100%'}} alt={''}/>
                                </Stack>
                            </UnstyledLink>
                        )
                    }
                    <Stack flex={1} p={4} alignItems={'center'}>
                        <Typography variant={'h6'}>{props.data.title}</Typography>
                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                            <Typography variant={'subtitle1'}>
                                ${props.data.price}
                            </Typography>
                            <Typography
                                variant={'subtitle2'}
                                color={theme.palette.text.secondary}
                            >
                                / {props.data.weight}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Divider/>
                    <Stack>
                        <Button
                            variant={'contained'}
                            sx={{
                                boxShadow: 'none',
                                height: '100%',
                                borderRadius: '0 0 4px 4px',
                                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                                background: theme.palette.secondary.light,
                                color: theme.palette.getContrastText(theme.palette.secondary.light),
                                '&:hover': {
                                    background: theme.palette.secondary.main
                                }
                            }}
                        >
                            add to cart
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </>
    );
}
