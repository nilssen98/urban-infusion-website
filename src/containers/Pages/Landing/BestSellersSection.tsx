import Section from "../../../components/Wrappers/Section";
import {Box, Button, Grid, Skeleton, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {range} from 'lodash-es';

export default function BestSellersSection() {
    const navigate = useNavigate();

    return (
        <>
            <Section>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
                    <Typography
                        variant={'h4'}
                        component={'h2'}
                        sx={{
                            textAlign: 'center',
                            marginBottom: 12
                        }}
                    >
                        Best sellers
                    </Typography>
                    <Grid
                        container
                        sx={{
                            justifyContent: 'space-between',
                            marginBottom: 16,
                        }}
                    >
                        {
                            range(4).map((index) => (
                                <Grid
                                    key={index}
                                    item
                                    container
                                    sm={3}
                                    xs={6}
                                    p={4}
                                    sx={{
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Skeleton
                                        variant={"rectangular"}
                                        height={225}
                                        width={200}
                                    >
                                    </Skeleton>
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Button
                        variant={"outlined"}
                        size={'medium'}
                        onClick={() => navigate('/products')}
                    >
                        Shop all
                    </Button>
                </Box>
            </Section>
        </>
    );
}