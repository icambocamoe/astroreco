import { StyleSheet } from "react-native"
import { ThemeContext } from "../context/ThemeContext"
import { useContext } from "react"


export const dynamicStylesAppTheme = (themeData/* : ThemeData */) => {

    return StyleSheet.create({
        dynamicScrollViewStyle: {
            backgroundColor: themeData.fondo,
        },

        dynamicMainContainer: {
            backgroundColor: themeData.contenedorPrincipal,
        },

        dynamicViewContainer: {
            backgroundColor: themeData.vistas,
        },
        dynamicText: {
            color: themeData.texto,
        },
        dynamicBorder: {
            borderColor: themeData.texto,
            borderWidth: 1,
        },
        dynamicButton: {
            backgroundColor: themeData.contenedorPrincipal,
        }
    })
}