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
                backgroundUrl={imageURL}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'center',
                    width: '90%',
                }}
            >
                <Typography
                    variant={'h2'}
                    component={'h1'}
                    sx={{
                        color: 'white',
                        textAlign: 'left',
                        pb: 16
                    }}>
                    Find your herbal friend
                </Typography>
                <Button
                    variant={"contained"}
                    size={'large'}
                    onClick={() => navigate('/products')}
                >
                    Get started
                </Button>
            </Section>
        </>
    );
}
