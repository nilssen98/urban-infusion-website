import {useParams} from 'react-router-dom';
import {useQuery} from "react-query";
import {getProductById} from "../../api/urbaninfusion/public/products";
import {useEffect} from "react";
import Section from "../../components/Wrappers/Section";
import {Stack, Typography} from "@mui/material";

export default function Product() {
    const {id} = useParams();

    const {isLoading, data} = useQuery(
        'product',
        () => getProductById(id || '')
    )

    return (
        <>
            <Section>
                {
                    data && <Stack direction={'column'} spacing={4}>
                        <Typography variant={'h3'}>This is the product page!</Typography>
                        <Typography variant={'h5'}>id: {data.id}</Typography>
                        <Typography variant={'h5'}>title: {data.title}</Typography>
                        <Typography variant={'h5'}>description: {data.description}</Typography>
                        <Typography variant={'h5'}>category: {data.category}</Typography>
                        <Typography variant={'h5'}>price: {data.price}</Typography>
                        <Typography variant={'h5'}>discount: {data.discount}</Typography>
                        <Typography variant={'h5'}>weight: {data.weight}</Typography>
                    </Stack>
                }
            </Section>
        </>
    );
}
