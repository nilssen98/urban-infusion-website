import Section from '../../../components/Wrappers/Section';
import {Box, Button, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {range} from 'lodash-es';
import ProductCard from '../../../components/ProductCard';

export default function FeaturedProductsSection() {
    const navigate = useNavigate();

    return (
        <>
            <Section>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Typography
                        variant={'h4'}
                        component={'h4'}
                        sx={{
                            textAlign: 'center',
                            marginBottom: 12,
                        }}
                    >
                        Featured products
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            marginBottom: 16,
                        }}
                    >
                        {
                            range(4).map((i) => (
                                <ProductCard
                                    key={i}
                                    title={'Title'}
                                    price={9.99}
                                    image_url={'https://i.imgur.com/ZG4W7Le.jpg'}
                                />
                            ))
                        }
                    </Box>
                    <Button
                        variant={'contained'}
                        size={'large'}
                        onClick={() => navigate('/products')}
                    >
                        Shop all
                    </Button>
                </Box>
            </Section>
        </>
    );
}
