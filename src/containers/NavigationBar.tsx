import {AppBar, Slide, Toolbar, useScrollTrigger} from "@mui/material";
import Logo from "../components/Logo";
import {ReactElement} from "react";

interface Props {
    children?: ReactElement;
}

function HideOnScroll(props: Props) {
    const trigger = useScrollTrigger({
        target: window,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {props.children || <></>}
        </Slide>
    );
}

export default function NavigationBar(props: Props) {
    return (
        <>
            <HideOnScroll {...props}>
                <AppBar color={'primary'}>
                    <Toolbar>
                        <Logo/>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </>
    )
}
