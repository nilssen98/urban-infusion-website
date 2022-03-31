import {useParams} from 'react-router-dom';
import {useQuery} from "react-query";
import {getProductById} from "../../api/urbaninfusion/public/products";
import {useEffect} from "react";
import Section from "../../components/Wrappers/Section";

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
                <h1>This is the product page!</h1>
                <h2>Product ID = {id}</h2>
            </Section>
        </>
    );
}
