import {Box, Container, Typography} from "@mui/material";
import CoffeeOutlinedIcon from '@mui/icons-material/CoffeeOutlined';

export default function Logo() {
    return (
        <>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    userSelect: 'none'
                }}
            >
                <Box
                    sx={{ textAlign: 'right'}}
                >
                    <Typography variant={'h4'}>
                        Urban
                    </Typography>
                    <Typography marginTop={-3} variant={'h6'} style={{color: '#7DDC6A'}}>
                        Infusion
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: '2.2em',
                        height: '2.2em'
                    }}
                    component={CoffeeOutlinedIcon}
                />
            </Container>
        </>
    )
}
