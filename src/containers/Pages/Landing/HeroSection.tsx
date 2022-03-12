import {Box, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Section from "../../../components/Wrappers/Section";
import StyledButton from "../../../components/StyledButton";

export default function HeroSection() {
    //const imageURL = 'https://i.imgur.com/PHyNjTQ.jpg'; // Original
    //const imageURL = 'https://i.imgur.com/vviNIXW.jpg'; // Dark1
    //const imageURL = 'https://i.imgur.com/QZNYFC7.jpg'; // Dark2
    //const imageURL = 'https://i.imgur.com/pwGUzIn.jpg'; // Dark3
    //const imageURL = 'https://i.imgur.com/QXqQueZ.jpg'; // Dark4
    const imageURL = 'https://i.imgur.com/Q57AWAs.jpg'; // Dark5
    const navigate = useNavigate();

    return (
        <>
            <Section backgroundUrl={imageURL}>
                <Box
                    sx={{
                        py: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: {md: 'start', xs: 'center'},
                        width: '100%',
                    }}
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
                                paddingBottom: 16,
                                [theme.breakpoints.down('md')]: {
                                    textAlign: 'center',
                                }
                            })}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Typography>
                        <StyledButton
                            onClick={() => navigate('/products')}
                        >
                            Get started
                        </StyledButton>
                    </Box>
                </Box>
            </Section>
        </>
    );
};
