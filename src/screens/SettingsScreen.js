import React, { useContext, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { TitleComponent } from "../components/TitleComponent";
import RNPickerSelect from 'react-native-picker-select';
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme";
import { stylesAppTheme } from "../theme/AppTheme";
import { ThemeContext } from "../context/ThemeContext";

export const SettingsScreen = () => {

  const [temaClaro, setTemaClaro] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState('claro00'); // Estado para el tema seleccionado en el picker


  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto
  const setThemeData = context?.setThemeData;



  if (!themeData || !setThemeData) {
      return null;
  }

  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);

  const TemaClaro00/* : ThemeData */ = {
      fondo: "#f0f6fc",
      contenedorPrincipal: "#f0f6fc",
      vistas: "white",
      texto: "#002959",
      isDarkMode: false,

  };

  const TemaClaro01/* : ThemeData */ = {
      fondo: "#fff9e6",  // Fondo suave y energético
      contenedorPrincipal: "#ff7f50",  // Coral brillante, optimista
      vistas: "#ffe4b5",  // Amarillo claro para contraste
      texto: "#c71585",  // Magenta oscuro, elegante
      isDarkMode: false,
  };  // Shonen – dinámico y lleno de acción

  const TemaClaro02/* : ThemeData */ = {
      fondo: "#fff0f5",  // Fondo rosado suave, romántico
      contenedorPrincipal: "#ff1493",  // Rosa vibrante, dulce
      vistas: "#ffb6c1",  // Rosa claro
      texto: "#c71585",  // Magenta oscuro, elegante
      isDarkMode: false,
  };  // Shojo – tierno, romántico

  const TemaClaro03/* : ThemeData */ = {
      fondo: "#e6f0ff",  // Azul muy claro, futurista y limpio
      contenedorPrincipal: "#1e90ff",  // Azul brillante, tecnológico
      vistas: "#add8e6",  // Azul claro futurista
      texto: "#003366",  // Azul oscuro, serio
      isDarkMode: false,
  };  // Sci-fi – frío, tecnológico, futurista

  const TemaClaro04/* : ThemeData */ = {
      fondo: "#f0f8ff",  // Fondo suave, etéreo
      contenedorPrincipal: "#9370db",  // Púrpura suave, mágico
      vistas: "#e6e6fa",  // Lavanda, mágica
      texto: "#4b0082",  // Índigo oscuro para el texto
      isDarkMode: false,
  };  // Fantasía – mágico, etéreo

  const TemaClaro05/* : ThemeData */ = {
      fondo: "#fffacd",  // Amarillo pálido, cálido
      contenedorPrincipal: "#ffeb3b",  // Amarillo vibrante y juvenil
      vistas: "#f0e68c",  // Amarillo pastel
      texto: "#9c640c",  // Amarillo oscuro
      isDarkMode: false,
  };  // Escolar – cálido, luminoso

  const TemaClaro06/* : ThemeData */ = {
      fondo: "#ffebee",  // Fondo suave, con energía
      contenedorPrincipal: "#f44336",  // Rojo intenso, enérgico
      vistas: "#ffccbc",  // Rosa claro pero vibrante
      texto: "#c62828",  // Rojo oscuro, para reflejar la intensidad
      isDarkMode: false,
  };  // Acción – rápido y enérgico

  const TemaClaro07/* : ThemeData */ = {
      fondo: "#f0f3f4",  // Azul grisáceo para un toque mecánico
      contenedorPrincipal: "#4682b4",  // Azul acero, tecnológico
      vistas: "#b0c4de",  // Azul claro para las vistas
      texto: "#2c3e50",  // Azul oscuro, firme
      isDarkMode: false,
  };  // Mecha – industrial, metálico

  const TemaClaro08/* : ThemeData */ = {
      fondo: "#f0fff0",  // Verde muy claro, naturaleza
      contenedorPrincipal: "#32cd32",  // Verde vibrante, lleno de vida
      vistas: "#98fb98",  // Verde suave y aventurero
      texto: "#006400",  // Verde oscuro, robusto
      isDarkMode: false,
  };  // Aventura – natural, lleno de vida

  const TemaClaro09/* : ThemeData */ = {
      fondo: "#fff0f5",  // Rosado suave, adorable
      contenedorPrincipal: "#ff69b4",  // Rosa fuerte, kawaii
      vistas: "#ffc0cb",  // Rosa pastel, adorable
      texto: "#b00068",  // Magenta oscuro para el texto
      isDarkMode: false,
  };  // Kawaii – vibrante y adorable

  const TemaClaro10/* : ThemeData */ = {
      fondo: "#f0f8ff",  // Azul claro, retro
      contenedorPrincipal: "#5f9ea0",  // Azul clásico, vibrante y limpio
      vistas: "#87ceeb",  // Azul cielo suave, nostálgico
      texto: "#2c3e50",  // Azul marino para el texto, clásico
      isDarkMode: false,
  };  // Anime Clásico – nostálgico, retro

  const TemaTwilight00 = {
      fondo: "#787878", // Un gris suave, el equilibrio entre la luz y la oscuridad.
      contenedorPrincipal: "#8D8D8D", // Gris intermedio.
      vistas: "#A2A2A2", // Gris más claro, representando el atardecer entre la luz y la noche.
      texto: "#1E1E1E", // Gris oscuro para el texto, cercano a la sombra.
      isDarkMode: false,
  };  // Crepúsculo del Amanecer

  const TemaOscuro00/* : ThemeData */ = {
      fondo: "#000000", // Fondo completamente negro.
      contenedorPrincipal: "#1B1B1B", // Negro ligeramente menos intenso.
      vistas: "#2C2C2C", // Un gris oscuro.
      texto: "#FFFFFF", // Blanco puro para máximo contraste.
      isDarkMode: true,
  };

  const TemaOscuro01/* : ThemeData */ = {
      fondo: "#0D0F12", // Un fondo gris oscuro con matices metálicos.
      contenedorPrincipal: "#1D1D1D", // Gris oscuro neutro.
      vistas: "#2A2D33", // Gris más claro con un toque metálico.
      texto: "#B8C6DB", // Azul claro-grisáceo, futurista y de alta tecnología.
      isDarkMode: true,
  };
  const TemaOscuro02/* : ThemeData */ = {
      fondo: "#0A0A1F", // Fondo casi negro con un toque de púrpura.
      contenedorPrincipal: "#2C2E40", // Gris oscuro con un tono frío.
      vistas: "#3A3D53", // Azul grisáceo para un efecto cyberpunk.
      texto: "#FF66C4", // Un rosa neón vibrante.
      isDarkMode: true,
  };
  const TemaOscuro03/* : ThemeData */ = {
      fondo: "#101820", // Un negro profundo y azulado para simular la noche.
      contenedorPrincipal: "#172336", // Azul oscuro, como el cielo nocturno.
      vistas: "#1F3A5B", // Azul más claro, cercano al tono de la luna.
      texto: "#D3E0FF", // Blanco azulado, suave y relajante para la vista nocturna.
      isDarkMode: true,
  };
  const TemaOscuro04/* : ThemeData */ = {
      fondo: "#141414", // Un fondo negro puro.
      contenedorPrincipal: "#1E1E1E", // Negro intenso.
      vistas: "#282828", // Gris oscuro neutro para dar protagonismo al neón.
      texto: "#39FF14", // Verde neón brillante, como luces de neón.
      isDarkMode: true,
  };
  const TemaOscuro05/* : ThemeData */ = {
      fondo: "#1C1C1E", // Negro con un toque de azul oscuro.
      contenedorPrincipal: "#2C2C2E", // Un gris oscuro sofisticado.
      vistas: "#383838", // Gris medianamente oscuro para mayor profundidad.
      texto: "#E0E0E0", // Un blanco suave, clásico y elegante.
      isDarkMode: true,
  };

  const TemaOscuro06/* : ThemeData  */= {
      fondo: "#0B0C10", // Negro con un toque de azul profundo, como las profundidades del océano.
      contenedorPrincipal: "#1F2833", // Gris oscuro con un matiz de agua.
      vistas: "#3C4F5C", // Azul grisáceo, simulando corrientes en el abismo.
      texto: "#66FCF1", // Cian brillante, como luces bajo el agua.
      isDarkMode: true,
  };
  //Refleja lo misterioso e inexplorado, un abismo profundo lleno de secretos.

  const TemaOscuro07/* : ThemeData */ = {
      fondo: "#121212", // Negro puro, como el cielo cubierto durante un eclipse.
      contenedorPrincipal: "#1A1A1A", // Negro intenso, profundo y envolvente.
      vistas: "#2B2B2B", // Gris oscuro, simulando la penumbra de la sombra lunar.
      texto: "#FF4500", // Naranja brillante, como el halo de luz de un eclipse solar.
      isDarkMode: true,
  };
  //Evoca la tensión y la energía del momento en que la luna oculta al sol, dejando un brillo de luz solar en los bordes.

  const TemaOscuro08/* : ThemeData */ = {
      fondo: "#0F0E11", // Negro con un toque de púrpura, casi etéreo.
      contenedorPrincipal: "#232030", // Púrpura oscuro, fantasmal.
      vistas: "#39354F", // Gris púrpura, como una sombra que flota en el aire.
      texto: "#DDA0DD", // Púrpura claro, enigmático y místico.
      isDarkMode: true,
  };
  //Captura lo fantasmal y lo sobrenatural, como si estuvieras en un reino etéreo habitado por espíritus.

  const TemaOscuro09/* : ThemeData */ = {
      fondo: "#1A0000", // Rojo oscuro y profundo, casi negro, evocando las brasas del infierno.
      contenedorPrincipal: "#330000", // Un rojo quemado y ardiente.
      vistas: "#4C0000", // Rojo más claro, como cenizas incandescentes.
      texto: "#FF0000", // Rojo brillante, el fuego y la furia del infierno.
      isDarkMode: true,
  };
  //Un tema ardiente que refleja la intensidad de las llamas y el calor sofocante del inframundo.

  const TemaOscuro10/* : ThemeData */ = {
      fondo: "#1B1B1B", // Negro suave con un toque de gris, como cenizas en el viento.
      contenedorPrincipal: "#2F2F2F", // Gris oscuro, apagado como el polvo de la destrucción.
      vistas: "#474747", // Gris intermedio, como las ruinas de algo olvidado.
      texto: "#A9A9A9", // Gris claro, frío y sombrío como la ceniza.
      isDarkMode: true,
  };
  //Refleja el paisaje post - apocalíptico, un mundo desolado cubierto de polvo y cenizas.

  const CambiarTema = (tema/* : string */) => {
      switch (tema) {
          case "claro00": setThemeData(TemaClaro00);
              break;
          case "claro01": setThemeData(TemaClaro01);
              break;
          case "claro02": setThemeData(TemaClaro02);
              break;
          case "claro03": setThemeData(TemaClaro03);
              break;
          case "claro04": setThemeData(TemaClaro04);
              break;
          case "claro05": setThemeData(TemaClaro05);
              break;
          case "claro06": setThemeData(TemaClaro06);
              break;
          case "claro07": setThemeData(TemaClaro07);
              break;
          case "claro08": setThemeData(TemaClaro08);
              break;
          case "claro09": setThemeData(TemaClaro09);
              break;
          case "claro10": setThemeData(TemaClaro10);
              break;
          case "oscuro00": setThemeData(TemaOscuro00);
              break;
          case "oscuro01": setThemeData(TemaOscuro01);
              break;
          case "oscuro02": setThemeData(TemaOscuro02);
              break;
          case "oscuro03": setThemeData(TemaOscuro03);
              break;
          case "oscuro04": setThemeData(TemaOscuro04);
              break;
          case "oscuro05": setThemeData(TemaOscuro05);
              break;
          case "oscuro06": setThemeData(TemaOscuro06);
              break;
          case "oscuro07": setThemeData(TemaOscuro07);
              break;
          case "oscuro08": setThemeData(TemaOscuro08);
              break;
          case "oscuro09": setThemeData(TemaOscuro09);
              break;
          case "oscuro10": setThemeData(TemaOscuro10);
              break;
      }
  }


  return (
      <ScrollView style={[dynamicStyles.dynamicScrollViewStyle, stylesAppTheme.scrollViewStyle]}>
          <View style={[dynamicStyles.dynamicMainContainer, stylesAppTheme.mainContainer]}>
              <TitleComponent title="Settings" />
              <View style={[dynamicStyles.dynamicViewContainer, stylesAppTheme.viewContainer]}>
                  <Text style={dynamicStyles.dynamicText}>Settings Screen</Text>
                  <Text style={dynamicStyles.dynamicText}>Tema de la aplicacion: </Text>

                  <RNPickerSelect
                      placeholder={{
                          label: 'Selecciona un estado...',
                          value: null, // Esto asegura que no se seleccione ninguna opción inicialmente
                          color: themeData.texto,
                      }}
                      onValueChange={(value) => {
                          setSelectedTheme(value); // Actualiza el tema seleccionado en el estado
                          CambiarTema(value); // Llama a la función para cambiar el tema
                      }}
                      value={selectedTheme} // El valor actual del picker
                      items={[
                          { label: 'Light Clásico', value: 'claro00' },
                          { label: 'Light Coralina del Amanecer', value: 'claro01' },
                          { label: 'Light Pasión Eterna', value: 'claro02' },
                          { label: 'Light Futuro Brillante', value: 'claro03' },
                          { label: 'Light Magia Celestial', value: 'claro04' },
                          { label: 'Light Destello Solar', value: 'claro05' },
                          { label: 'Light Tormenta Eterna', value: 'claro06' },
                          { label: 'Light Acero de los Titanes', value: 'claro07' },
                          { label: 'Light Vida Eterna', value: 'claro08' },
                          { label: 'Light Encanto Kawaii', value: 'claro09' },
                          { label: 'Light Nostalgia Épica', value: 'claro10' },

                          { label: 'Dark Clásico', value: 'oscuro00' },
                          { label: 'Dark Sombras Cibernéticas', value: 'oscuro01' }, // Tema: Eco Metálicos del Silencio
                          { label: 'Dark Cyberpunk, caos urbano', value: 'oscuro02' }, // Tema: Sueños Cyberpunk de Neon
                          { label: 'Dark Cielo Nocturno del Caos', value: 'oscuro03' }, // Tema: Noche Estrellada del Enigma
                          { label: 'Dark Luz del Abismo Esmeralda', value: 'oscuro04' }, // Tema: Luz del Abismo Verde
                          { label: 'Dark Elegancia Sombría', value: 'oscuro05' }, // Tema: Elegancia Sombría
                          { label: 'Dark Aguas Abisales', value: 'oscuro06' }, // Tema: Aguas Misteriosas
                          { label: 'Dark Eclipse de Destrucción', value: 'oscuro07' }, // Tema: Eclipse de Pasión
                          { label: 'Dark Reino de los Espíritus Olvidados', value: 'oscuro08' }, // Tema: Reino de los Espíritus
                          { label: 'Dark Fuego del Inframundo', value: 'oscuro09' }, // Tema: Fuego del Inframundo
                          { label: 'Dark Cenizas de Ruinas Ancestrales', value: 'oscuro10' }, // Tema: Cenizas de la Ruina
                      ]}
                      style={{
                          inputAndroid: {
                              color: themeData.texto,
                              padding: 10,
                              fontSize: 20,
                          },
                          placeholder: {
                              color: themeData.texto, // Color del placeholder
                          },
                      }}
                  />
              </View>
          </View>
      </ScrollView>
  )
}
