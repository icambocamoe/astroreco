import React, { useContext } from 'react'
import { View, Text, /* TextStyle */ } from 'react-native'
import { ThemeContext } from '../context/ThemeContext'
import { dynamicStylesAppTheme } from '../theme/DynamicAppTheme'
import { stylesAppTheme } from '../theme/AppTheme'

/* interface TextComponentProps {
    text: string | number | undefined,
    bold?: boolean,
    italic?: boolean,
    underline?: boolean,
} */

export const TextComponent/* : React.FC<TextComponentProps> */ = ({ text, bold, italic, underline }) => {

    const context = useContext(ThemeContext); // Obtiene el contexto
    const themeData = context?.themeData; // Obtiene themeData del contexto

    if (!themeData) {
        return null; // Puedes manejar la carga o estado por defecto aquí
    }
    // Genera los estilos dinámicos pasando themeData
    const dynamicStyles = dynamicStylesAppTheme(themeData);

    const additionalStyles/* : TextStyle */ = {
        fontWeight: bold ? "bold" : "normal",
        fontStyle: italic ? 'italic' : "normal",
        textDecorationLine: underline ? 'underline' : 'none',
    }

    return (
        <View>
            <Text style={[dynamicStyles.dynamicText, stylesAppTheme.textInfoAnime, additionalStyles]}>{text}</Text>
        </View>
    )
}
