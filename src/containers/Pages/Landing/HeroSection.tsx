import {Button, Container, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function HeroSection() {

    const imageURL: string = 'https://picsum.photos/1600/900/?blur';

    const navigate = useNavigate();

    return (
        <>
            <Container
                sx={{
                    height: '40vw',
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
                    sx={{
                        top: 0,
                        left: 0,
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 54,
                    }}>
                    Find your herbal friend
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/products')
                    }>
                    Check out our products
                </Button>
            </Container>
        </>
    );
}