import {createTheme} from '@mui/material/styles';

export const getTheme = (theme: 'light' | 'dark') => {
    return createTheme({
        spacing: 4,
        palette: {
            mode: theme,
            primary: {
                main: '#122e1e',
                light: '#e3f4eb',
                dark: '#1b472e',
            },
            secondary: {
                main: '#F5A623',
                light: '#FDF5E6'
            },
        },
    });
};
