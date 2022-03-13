import {Box, Button, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Section from "../../../components/Wrappers/Section";

export default function FeaturesSection() {
    const imageURL: string = 'https://picsum.photos/570/350?grayscale';
    const headerPlaceholder: string = 'Benefits of green tea';
    const bodyPlaceholder: string =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'
        + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris'
        + 'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in'
        + 'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla'
        + 'pariatur.';
    const navigate = useNavigate();

    return (
        <>
            <Section>
                <Box>
                    <Feature
                        header={headerPlaceholder}
                        body={bodyPlaceholder}
                        image_url={imageURL + "&" + Math.random()}
                        onClick={() => navigate('/products')}
                    />
                    <Feature
                        flipped
                        header={headerPlaceholder}
                        body={bodyPlaceholder}
                        image_url={imageURL + "&" + Math.random()}
                        onClick={() => navigate('/products')}
                    />
                    <Feature
                        header={headerPlaceholder}
                        body={bodyPlaceholder}
                        image_url={imageURL + "&" + Math.random()}
                        onClick={() => navigate('/products')}
                    />
                    <Feature
                        flipped
                        header={headerPlaceholder}
                        body={bodyPlaceholder}
                        image_url={imageURL + "&" + Math.random()}
                        onClick={() => navigate('/products')}
                    />
                </Box>
            </Section>
        </>
    );
}

interface FeatureProps {
    flipped?: boolean;
    header?: string;
    body?: string;
    image_url?: string;
    onClick?: () => void;
}

function Feature(props: FeatureProps) {
    return (
        <>
            <Grid
                container
                spacing={8}
                pb={24}
                sx={{
                    flexDirection: props.flipped ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Grid
                    md={6}
                    item
                    container
                >
                    <img
                        src={props.image_url}
                        style={{width: '100%', minWidth: 1}}
                        alt="Placeholder Image"
                    />
                </Grid>
                <Grid
                    md={6}
                    item
                    container
                    sx={theme => ({
                        [theme.breakpoints.down('md')]: {
                            justifyContent: 'center'
                        }
                    })}
                >
                    <Typography
                        variant={'h4'}
                        component={'h3'}
                        sx={theme => ({
                            [theme.breakpoints.down('md')]: {
                                textAlign: "center"
                            }
                        })}
                    >
                        {
                            props.header
                        }
                    </Typography>
                    <Typography
                        my={8}
                        sx={theme => ({
                            [theme.breakpoints.down('md')]: {
                                textAlign: "center"
                            }
                        })}
                    >
                        {
                            props.body
                        }
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: props.flipped ? 'flex-start' : 'flex-end',
                        }}
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
    );
}


