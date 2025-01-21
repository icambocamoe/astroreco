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

export const TextComponent/* : React.FC<TextComponentProps> */ = ({ text, bold, italic, underline, typeText, align }) => {

    const context = useContext(ThemeContext); // Obtiene el contexto
    const themeData = context?.themeData; // Obtiene themeData del contexto

    if (!themeData) {
        return null; // Puedes manejar la carga o estado por defecto aquí
    }
    // Genera los estilos dinámicos pasando themeData
    const dynamicStyles = dynamicStylesAppTheme(themeData);

    const fontSize = typeText === "header" ? 24 : typeText ==="subheader" ? 20 : 18;
    const textAlign = align === 'center' ? "center" : align === 'right' ? "right" : align === "justify" ? "justify" : "left";

    const marginT = typeText === "header" ? 0 : typeText ==="subheader" ? 20 : 5;
    const marginB = typeText === "header" ? 10 : typeText ==="subheader" ? 10 : 5;

    const additionalStyles/* : TextStyle */ = {
        fontWeight: bold ? "bold" : "normal",
        fontStyle: italic ? 'italic' : "normal",
        textDecorationLine: underline ? 'underline' : 'none',
        fontSize: fontSize,
        textAlign: textAlign,
        marginBottom: marginB,
        marginTop: marginT,
    }

    return (
        <View>
            <Text style={[dynamicStyles.dynamicText, stylesAppTheme.textInfoAnime, additionalStyles]}>{text}</Text>
        </View>
    )
}
