import {Button, Grid, Typography} from "@mui/material";
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
            >
                <Grid
                    sx={theme => ({
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'start',
                        marginLeft: '2rem',
                        width: '100%',
                        [theme.breakpoints.down('md')]: {
                            alignItems: 'center',
                            margin: '0',
                        }
                    })}
                >
                    <Typography
                        variant={'h2'}
                        component={'h1'}
                        sx={theme => ({
                            color: 'white',
                            textAlign: 'left',
                            paddingBottom: 16,
                            [theme.breakpoints.down('md')]: {
                                textAlign: 'center',
                            }
                        })}
                    >
                        Find your herbal friend
                    </Typography>
                    <Button
                        variant={"contained"}
                        size={'large'}
                        onClick={() => navigate('/products')}
                    >
                        Get started
                    </Button>
                </Grid>
            </Section>
        </>
    );
}
