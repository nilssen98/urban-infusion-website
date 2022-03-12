import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";

type Props = {
    id?: string;
}

export function ProductsList(props: Props) {
    return (
        <>
            <Typography>{props.id}</Typography>
        </>
    )
}
