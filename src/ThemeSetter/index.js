import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createContext, useContext, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

const themeContext = createContext()

export const ThemeToggle = () => {
    const { toggleTheme } = useContext(themeContext)
    const [darkmode, setDarkMode] = useState(document.documentElement.getAttribute("data-theme") === "dark")

    const clickHandler = () => {
        toggleTheme()
        setDarkMode(prev => !prev)
    }
    return <IconButton onClick={clickHandler} color="inherit">
        {darkmode ? < NightlightOutlinedIcon fontSize="inherit" /> : <LightModeOutlinedIcon fontSize="inherit" />}
    </IconButton>
}

const ThemeSetter = ({ children }) => {
    const [darkmode, setDarkmode] = useState(false)

    const toggleTheme = () => {
        const curTheme = document.documentElement.getAttribute("data-theme")
        document.documentElement.setAttribute("data-theme", curTheme === "light" ? "dark" : "light")
        setDarkmode(curTheme === "light")
    }

    useEffect(() => {
        if (!window || !document) return
        const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
        document.documentElement.setAttribute("data-theme", matchMedia?.matches ? "dark" : "light")
        setDarkmode(matchMedia?.matches)

        const matchMode = (e) => document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
        matchMedia.addEventListener("change", matchMode);

        return () => matchMedia.removeEventListener("change", matchMode);
    }, []);

    return <ThemeProvider theme={darkmode ? darkTheme : lightTheme}>
        <themeContext.Provider value={{toggleTheme}}>
            {children}
        </themeContext.Provider>
    </ThemeProvider>
}

export default ThemeSetter