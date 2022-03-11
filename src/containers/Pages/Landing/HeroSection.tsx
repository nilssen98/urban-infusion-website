import {Box, Button, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Section from "../../../components/Wrappers/Section";

export default function HeroSection() {
    const imageURL: string = 'https://picsum.photos/1600/900/?blur';
    const navigate = useNavigate();

    return (
        <>
            <Section
                backgroundUrl={imageURL}
            >
                <Box
                    sx={theme => ({
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'start',
                        width: '100%',
                        [theme.breakpoints.down('md')]: {
                            alignItems: 'center',
                        }
                    })}
                >
                    <Box
                        sx={theme => ({
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: 500,
                            alignItems: 'flex-start',
                            [theme.breakpoints.down('md')]: {
                                alignItems: 'center',
                            }
                        })}
                    >
                        <Typography
                            variant={'h2'}
                            component={'h1'}
                            sx={theme => ({
                                color: 'white',
                                textAlign: 'left',
                                paddingBottom: 8,
                                [theme.breakpoints.down('md')]: {
                                    textAlign: 'center',
                                }
                            })}
                        >
                            Find your herbal friend
                        </Typography>
                        <Typography
                            variant={'h5'}
                            component={'h4'}
                            sx={theme => ({
                                color: 'white',
                                textAlign: 'left',
                                paddingBottom: 8,
                                [theme.breakpoints.down('md')]: {
                                    textAlign: 'center',
                                }
                            })}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Typography>
                        <Button
                            variant={"contained"}
                            size={'large'}
                            onClick={() => navigate('/products')}
                        >
                            Get started
                        </Button>
                    </Box>
                </Box>
            </Section>
        </>
    );
};
