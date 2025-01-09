import React, { useContext, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { stylesAppTheme } from '../theme/AppTheme'
import { ThemeContext } from '../context/ThemeContext'
import { dynamicStylesAppTheme } from '../theme/DynamicAppTheme'
import Ionicons from '@expo/vector-icons/Ionicons';


/* interface TextInputProps {
    placeholderText: string,
    value: string,
    action: (text: string) => void,
    isPassword: boolean,
    isNumericKeybordType?: boolean,
    verified: boolean,
} */

export const InputTextComponent/* : React.FC<TextInputProps> */ = ({ placeholderText, value, action, isPassword, isNumericKeybordType = false, verified }) => {

    const context = useContext(ThemeContext); // Obtiene el contexto
    const themeData = context?.themeData; // Obtiene themeData del contexto

    const [passIsVisible, setPassIsVisible] = useState(false)

    // Determina el tipo de teclado basado en `isNumericKeybordType`
    const keyboardType = isNumericKeybordType ? 'numeric' : 'default';


    if (!themeData) {
        return null; // Puedes manejar la carga o estado por defecto aquí
    }
    // Genera los estilos dinámicos pasando themeData
    const dynamicStyles = dynamicStylesAppTheme(themeData);
    return (
        <View style={{ position: 'relative' }}>
            <TextInput style={[dynamicStyles.dynamicText, dynamicStyles.dynamicBorder, stylesAppTheme.textInput]}
                placeholderTextColor={themeData.texto}
                placeholder={placeholderText}
                value={value}
                //onChangeText={(text) => action(text)}
                onChangeText={action}
                secureTextEntry={isPassword && !passIsVisible}
                keyboardType={keyboardType}

            />
            {isPassword ? <TouchableOpacity style={{
                position: 'absolute', right: 10,
                top: '100%',
                /* backgroundColor: "red", */
                padding: 10,
                transform: [{ translateY: -55, }],
            }}
                onPress={() => setPassIsVisible(!passIsVisible)}
            >
                <Ionicons name={passIsVisible ? "eye-off" : "eye"} size={30} color={themeData.texto} />
            </TouchableOpacity> : null}

            {verified ? <TouchableOpacity style={{
                position: 'absolute',
                right: isPassword ? 45 : 10,
                top: '100%',
                /* backgroundColor: "red", */
                padding: 10,
                transform: [{ translateY: -55, }],
            }}
            //onPress={() => setPassIsVisible(!passIsVisible)}
            >
                <Ionicons name={"checkmark-circle"} size={30} color={themeData.texto} />
            </TouchableOpacity> : null}




        </View>
    )
}
