import {Container, CssBaseline, FormControlLabel, Switch, ThemeProvider, Typography,} from "@mui/material";
import {useState} from "react";
import {getTheme} from "../../theme/theme";

export default function App() {
    const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('light');

    const handleChangeTheme = () => {
        setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    }

    return (
        <ThemeProvider theme={getTheme(currentTheme)}>
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
