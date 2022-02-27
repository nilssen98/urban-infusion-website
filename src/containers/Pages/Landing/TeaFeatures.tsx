import {Box, Button, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Section from "../../../components/Wrappers/Section";


export default function TeaFeatures() {

    const imageURL: string = 'https://picsum.photos/570/350?grayscale';

    return (
        <>

            <Section
                height={800}

                sx={{
                    mt: 15
                }}
            >
                <Grid
                    container
                    spacing={2}
                    rowSpacing={5}
                >
                    <Grid
                        item
                        xs={6}
                        border={1}
                        height={400}
                    >
                        <img
                            src={imageURL}
                            alt="Placeholder Image"
                        />
                    </Grid>
                    <Grid
                        item xs={6}
                        border={1}
                        height={400}
                    >
                        <Typography
                            variant={'h4'}
                            component={'h3'}
                            sx={{
                                color: 'black',
                                textAlign: 'center',
                                pb: 16
                            }}
                        >
                            Benefits of green tea
                        </Typography>

                        <Typography
                            marginLeft={10}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur.
                        </Typography>
                        <Box
                            border={1}
                            justifyContent={'flex-end'}
                        >
                            <Button
                                variant={'outlined'}
                                size={'medium'}
                                onClick={() => useNavigate()('/products')}
                            >
                                <strong>
                                    Products
                                </strong>
                            </Button>
                        </Box>

                    </Grid>
                </Grid>
            </Section>
        </>
    )
}