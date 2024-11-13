import React, { createContext, useState, ReactNode } from 'react';

/* export interface ThemeData {
    fondo: string,
    contenedorPrincipal: string,
    vistas: string,
    texto: string,
    isDarkMode: boolean,
} */

/* export interface ThemeContextType {
    themeData: ThemeData | null;
    setThemeData: (data: ThemeData | null) => void;
} */

const defaultTheme/* : ThemeData */ = {
    fondo: "#f0f6fc",
    contenedorPrincipal: "#f0f6fc",
    vistas: "white",
    texto: "#002959",
    isDarkMode: false,
    
}

export const ThemeContext = createContext/* <ThemeContextType | undefined> */(undefined);

export const ThemeProvider/* : React.FC<{ children: ReactNode }> */ = ({ children }) => {
    const [themeData, setThemeData] = useState/* <ThemeData | null> */(defaultTheme);


    return (
        <ThemeContext.Provider value={{ themeData, setThemeData }}>
            {children}
        </ThemeContext.Provider>
    );
};