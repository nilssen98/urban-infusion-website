import {Button, Card, CardActionArea, CardActions, CardContent, Skeleton, Typography} from '@mui/material';
import {useState} from 'react';

interface Props {
    title?: string;
    price?: number;
    image_url?: string;
}

ProductCard.defaultProps = {
    title: '',
};

export default function ProductCard(props: Props) {
    const [loaded, setLoaded] = useState<boolean>(false);

    return (
        <>
            <Card
                sx={{width: 200, height: 320}}
            >
                <CardActionArea>
                    {
                        loaded ? (
                            <img
                                height={200}
                                src={props.image_url}
                                draggable={false}
                                alt={'Product image'}
                                onLoad={() => setLoaded(true)}
                                style={{
                                    objectFit: 'contain'
                                }}
                            />
                        ) : (
                            <>
                                <Skeleton variant='rectangular' animation={'wave'} height={200}/>
                                <img
                                    src={props.image_url}
                                    alt={'Product image'}
                                    onLoad={() => setLoaded(true)}
                                    style={{
                                        display: 'none',
                                    }}
                                />
                            </>
                        )
                    }
                    <CardContent
                        sx={{
                            padding: 0,
                        }}
                    >
                        <Typography
                            variant={'h5'}
                            paddingBottom={1.5}
                            textAlign={'center'}
                            sx={{
                                userSelect: 'text',
                            }}
                        >
                            {props.title}
                        </Typography>
                        <Typography
                            variant={'h6'}
                            textAlign={'center'}
                            sx={{
                                userSelect: 'text',
                            }}
                        >
                            ${props.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        variant={'contained'}
                        size={'small'}
                    >
                        Add to cart
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}
