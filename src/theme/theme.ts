import {createTheme} from "@mui/material/styles";

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1B472E',
        },
        secondary: {
            main: '#F5A623',
        },
    },
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1B472E',
        },
        secondary: {
            main: '#F5A623',
        },
    },
});
