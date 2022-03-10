import Section from "../../../components/Wrappers/Section";
import {Box, Button, Grid, Skeleton, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function BestSellersSection() {
    const navigate = useNavigate();

    return (
        <>
            <Section>
                <Box
                    sx={theme => ({
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                    })}
                >
                    <Typography
                        variant={'h4'}
                        component={'h2'}
                        sx={theme => ({
                            textAlign: 'center',
                            paddingBottom: 12
                        })}
                    >
                        Best sellers
                    </Typography>
                    <Grid
                        container
                        gap={5}
                        sx={theme => ({
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            paddingBottom: 16
                        })}
                    >
                        {
                            [0, 1, 2, 3].map((index: number) => {
                                return (
                                    <Skeleton
                                        key={index}
                                        variant="rectangular"
                                        width={400}
                                        height={420}
                                    >
                                    </Skeleton>
                                );
                            })
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