import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Section from "../../../components/Wrappers/Section";

export default function HeroSection() {

    const imageURL: string = 'https://picsum.photos/1600/900/?blur';

    const navigate = useNavigate();

    return (
        <>
            <Section
                height={700}
                backgroundImageURL={imageURL}
                sx={{
                    minWidth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
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
            </Section>
        </>
    );
}