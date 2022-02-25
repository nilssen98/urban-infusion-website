import {CssBaseline, ThemeProvider, Toolbar} from "@mui/material";
import {getTheme} from "../../theme/theme";
import MainPage from "../Pages/Landing/Landing";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import Landing from "../Pages/Landing/Landing";

export default function App() {
    return (
        <ThemeProvider theme={getTheme('light')}>
            <CssBaseline/>
            <Toolbar/>
            <NavigationBar/>
            {
                // Router here to determine which page to display
                <Landing/>
            }
            <Footer/>
        </ThemeProvider>
    )
}
