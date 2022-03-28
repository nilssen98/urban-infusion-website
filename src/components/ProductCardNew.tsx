import {Box, Button, CardActionArea, Grow, Typography} from '@mui/material';
import {useState} from 'react';

interface Props {
    title?: string;
    price?: number;
    image_url?: string;
}

ProductCardNew.defaultProps = {
    title: '',
};

export default function ProductCardNew(props: Props) {
    const [onCardHover, setOnCardHover] = useState<boolean>(false);

    return (
        <>
            <CardActionArea
                component={'div'}
                onMouseEnter={() => setOnCardHover(!onCardHover)}
                onMouseLeave={() => setOnCardHover(!onCardHover)}
                sx={{
                    height: 320,
                    width: 200,
                    boxShadow: 1,
                    position: 'relative',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {transform: 'scale3d(1.025, 1.025, 1)', boxShadow: 3},
                }}
            >
                <Box
                    height={'inherit'}
                    width={'inherit'}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        height={200}
                        sx={{
                            objectFit: 'contain',
                        }}
                    >
                        <img
                            src={props.image_url}
                            alt={'Product image'}
                            style={{objectFit: 'contain', height: 'inherit'}}
                            draggable={false}
                        />
                    </Box>
                    <Box paddingBottom={6}>
                        <Typography
                            variant={'h4'}
                            paddingBottom={2}
                            textAlign={'center'}
                            sx={{
                                userSelect: 'text',
                            }}
                        >
                            {props.title}
                        </Typography>
                        <Typography
                            variant={'h5'}
                            textAlign={'center'}
                            sx={{
                                userSelect: 'text',
                            }}
                        >
                            ${props.price}
                        </Typography>
                        {
                            onCardHover ? (
                                <Grow in={onCardHover}>
                                    <Button
                                        variant={'contained'}
                                        size={'small'}
                                        sx={{
                                            position: 'absolute',
                                            top: 265,
                                            left: 45,
                                        }}
                                    >
                                        Add to cart
                                    </Button>
                                </Grow>
                            ) : (
                                <></>
                            )
                        }
                    </Box>
                </Box>
            </CardActionArea>
        </>
    );
}
