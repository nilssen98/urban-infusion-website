import {Grid} from "@mui/material";
import {ReactNode} from "react";

interface Props {
    children?: ReactNode;
    height?: number;
    bgColor?: string;
}

export default function Section(props: Props) {
    return (
        <>
            <Grid
                container
                sx={{
                    height: props.height || undefined,
                    backgroundColor: props.bgColor || undefined,
                    justifyContent: 'center',
                }}
            >
                <Grid item sx={{width: '60%'}}>
                    {props.children}
                </Grid>
            </Grid>
        </>
    )
}
