import Section from "../../../components/Wrappers/Section";
import {Box, Grid, Skeleton, Typography} from "@mui/material";

export default function BestSellersSection() {

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
                        variant={'h3'}
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
                </Box>
            </Section>
        </>
    );
}