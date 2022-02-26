import {Container, Grid, Typography} from "@mui/material";
import Section from "../../../components/Wrappers/Section";

export default function Products() {
    return (
        <>
            <Section height={800}>
                <Grid container sx={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                    <Typography variant={'h4'}>This is the products page</Typography>
                </Grid>
            </Section>
        </>
    )
}
