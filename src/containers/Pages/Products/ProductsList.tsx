import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";

type Props = {

}

export function ProductsList(props: Props) {
    const {id} = useParams();

    return (
        <>
            <Typography>{id}</Typography>
        </>
    )
}
