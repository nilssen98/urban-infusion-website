import {useParams} from 'react-router-dom';

export default function ProductPage() {
    const params = useParams();

    return (
        <>
            <h1>This is the product page!</h1>
            <h2>Product ID = {params.id}</h2>
        </>
    );
}
