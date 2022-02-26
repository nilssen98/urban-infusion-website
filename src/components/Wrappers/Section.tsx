import {Grid, GridTypeMap} from "@mui/material";
import {ReactNode} from "react";
import {OverridableComponent} from "@mui/material/OverridableComponent";

type Props = {
    children?: ReactNode;
    height?: number;
    bgColor?: string;
    sx?: any;
} & OverridableComponent<GridTypeMap>

export default function Section(props: Props) {
    return (
        <>
            <Grid
                {...props}
                container
                sx={{
                    ...props.sx,
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
