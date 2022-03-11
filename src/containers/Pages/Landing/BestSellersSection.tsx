import Section from "../../../components/Wrappers/Section";
import {Box, Button, Skeleton, Stack, Typography} from "@mui/material";
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
                            paddingBottom: 12
                        }}
                    >
                        Best sellers
                    </Typography>
                    <Stack
                        gap={5}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            flexWrap: 'nowrap',
                            width: '100%',
                            paddingBottom: 16,
                            overflowX: 'scroll',
                            overflowY: 'hidden',
                        }}
                    >
                        {
                            range(4).map((index: number) => {
                                return (
                                    <Skeleton
                                        key={index}
                                        variant="rectangular"
                                        width={400}
                                        height={420}
                                        sx={{
                                            flexShrink: 0
                                        }}
                                    >
                                    </Skeleton>
                                );
                            })
                        }
                    </Stack>
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