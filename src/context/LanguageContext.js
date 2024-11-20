import React, { createContext, useState, ReactNode } from "react";

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

const defaultLanguage = { language: "spanish" }; // Define el estado por defecto claramente

export const LanguajeContext = createContext(
  /* <ThemeContextType | undefined> */ undefined
);

export const LanguageProvider /* : React.FC<{ children: ReactNode }> */ = ({
  children,
}) => {
  const [languageData, setLanguageData] = useState(
    /* <ThemeData | null> */ defaultLanguage
  );

  return (
    <LanguajeContext.Provider value={{ languageData, setLanguageData }}>
      {children}
    </LanguajeContext.Provider>
  );
};
