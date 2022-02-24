import {Container, CssBaseline, FormControlLabel, Switch, ThemeProvider,} from "@mui/material";
import {useState} from "react";
import {darkTheme, lightTheme} from "../../theme/theme";

export default function App() {
    const [currentTheme, setCurrentTheme] = useState<string>('light');

    const handleChangeTheme = () => {
        setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    }

    return (
        <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
            <CssBaseline/>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <FormControlLabel
                    sx={{
                        display: 'block',
                    }}
                    control={
                        <Switch
                            checked={currentTheme !== 'light'}
                            onChange={handleChangeTheme}
                            color={"primary"}
                        />
                    }
                    label={currentTheme + ' theme'}
                />
            </Container>
        </ThemeProvider>
    )
}
