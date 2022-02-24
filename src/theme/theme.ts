import {createTheme} from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface Theme {
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
    }
}

export const theme = createTheme({
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
