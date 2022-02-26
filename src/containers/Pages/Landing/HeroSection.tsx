import {Button, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function HeroSection() {

    const imageURL: string = 'https://picsum.photos/1600/900/?blur';

    const navigate = useNavigate();

    return (
        <>
            <Container
                sx={{
                    height: '700px',
                    minWidth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url(${imageURL})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}>
                <Typography
                    variant={'h1'}
                    sx={{
                        color: 'white',
                        textAlign: 'center'
                    }}>
                    Find your herbal friend
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/products')}
                >
                    Check out our products
                </Button>
            </Container>
        </>
    );
}