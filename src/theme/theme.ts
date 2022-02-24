import {createTheme} from "@mui/material/styles";

export const getTheme = (theme: 'light' | 'dark') => {
    return createTheme({
        palette: {
            mode: theme,
            primary: {
                main: '#1B472E',
            },
            secondary: {
                main: '#F5A623',
            },
        },
    });
}
