import {useParams} from 'react-router-dom';
import {useQuery} from "react-query";
import {getProductById} from "../../api/urbaninfusion/public/products";
import {useEffect} from "react";
import Section from "../../components/Wrappers/Section";
import {Stack} from "@mui/material";

export default function Product() {
    const {id} = useParams();

    const {isLoading, data} = useQuery(
        'product',
        () => getProductById(id || '')
    )

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <>
            <Section>
                <Stack direction={'column'}>
                    <h1>This is the product page!</h1>
                    <h2>Product ID = {id}</h2>
                </Stack>
            </Section>
        </>
    );
}
