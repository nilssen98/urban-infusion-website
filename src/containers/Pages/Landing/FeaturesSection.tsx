import {Box, Button, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Section from "../../../components/Wrappers/Section";

interface FeatureProps {
    flipped?: boolean;
    image_url: string;
    onClick: () => void;
}

function Feature(props: FeatureProps) {
    return (
        <>
            <Grid
                container

                spacing={8}
                py={16}
                sx={{
                    flexDirection: props.flipped ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
            >
                <Grid
                    md={6}
                    item
                >
                    <Box>
                        <img
                            src={props.image_url}
                            style={{width: '100%', height: '100%', minWidth: 1}}
                            alt="Placeholder Image"
                        />
                    </Box>
                </Grid>
                <Grid
                    md={6}
                    item

                >
                    <Typography
                        variant={'h4'}
                        component={'h3'}
                        sx={theme => ({
                            display: 'flex',
                            [theme.breakpoints.down('md')]: {
                                justifyContent: 'center'
                            }
                        })}
                    >
                        Benefits of green tea
                    </Typography>
                    <Box
                         sx={theme => ({
                             //Margin Y axis
                             my: "15px",
                             display: 'flex',
                             [theme.breakpoints.down('md')]: {
                                 justifyContent: 'center'
                             }
                         })}
                    >
                    <Typography

                                sx={theme => ({
                                    [theme.breakpoints.down('md')]: {
                                        maxWidth: "80%",
                                    }
                                })}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur.
                    </Typography>
                    </Box>
                    <Box
                        sx={theme => ({
                            display: 'flex',
                            justifyContent: props.flipped ? 'flex-start' : 'flex-end',
                            [theme.breakpoints.down('md')]: {
                                justifyContent: 'center'
                            }
                        })}
                    >
                        <Button
                            variant={'contained'}
                            size={'large'}
                            onClick={props.onClick}
                        >
                            shop now
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}


export default function FeaturesSection() {
    const imageURL: string = 'https://picsum.photos/570/350?grayscale';

    const navigate = useNavigate();

    return (
        <>
            <Section sx={{py: 16}}>
                <Box>
                    <Feature onClick={() => navigate('/products')} image_url={imageURL + "&" + Math.random()}/>
                    <Feature flipped onClick={() => navigate('/products')} image_url={imageURL + "&" + Math.random()}/>
                    <Feature onClick={() => navigate('/products')} image_url={imageURL + "&" + Math.random()}/>
                    <Feature flipped onClick={() => navigate('/products')} image_url={imageURL + "&" + Math.random()}/>
                </Box>
            </Section>
        </>
    )
}
