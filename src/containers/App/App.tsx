import {CssBaseline, Divider, ThemeProvider, Toolbar} from "@mui/material";
import {getTheme} from "../../theme/theme";
import Landing from "../Pages/Landing/Landing";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Products from "../Pages/Products/Products";
import NotFound from "../Pages/NotFound/NotFound";
import {useState} from "react";

export default function App() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const handleChangeTheme = () => {
        setTheme((theme) => theme === 'light' ? 'dark' : 'light');
    }

    return (
        <ThemeProvider theme={getTheme(theme)}>
            <CssBaseline/>
            <BrowserRouter>
                <Toolbar/>
                <NavigationBar changeTheme={handleChangeTheme} theme={theme}/>
                <Routes>
                    <Route path={'/'} element={<Landing/>}/>
                    <Route path={'/products'} element={<Products/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
                <Divider/>
                <Footer/>
            </BrowserRouter>
        </ThemeProvider>
    )
}
