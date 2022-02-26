import {Grid} from "@mui/material";
import {ReactNode} from "react";

interface Props {
    children?: ReactNode;
    height?: number;
    bgColor?: string;
    backgroundImageURL?: string;
    sx?: any;
}

export default function Section(props: Props) {
    return (
        <>
            <Grid
                container
                sx={{
                    ...props.sx,
                    height: props.height || undefined,
                    backgroundColor: props.bgColor || undefined,
                    justifyContent: 'center',
                    backgroundImage: `url(${props.backgroundImageURL || undefined})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <Grid item sx={{width: '60%'}}>
                    {props.children}
                </Grid>
            </Grid>
        </>
    )
}
