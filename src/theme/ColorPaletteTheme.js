export const ColorPaletteTheme = (themeName) => {

    const TemaClaro00 /* : ThemeData */ = {
        fondo: "#f0f6fc",
        contenedorPrincipal: "#f0f6fc",
        vistas: "white",
        texto: "#002959",
        isDarkMode: false,
      };
    
      const TemaClaro01 /* : ThemeData */ = {
        fondo: "#fff9e6", // Fondo suave y energético
        contenedorPrincipal: "#ff7f50", // Coral brillante, optimista
        vistas: "#ffe4b5", // Amarillo claro para contraste
        texto: "#c71585", // Magenta oscuro, elegante
        isDarkMode: false,
      }; // Shonen – dinámico y lleno de acción
    
      const TemaClaro02 /* : ThemeData */ = {
        fondo: "#fff0f5", // Fondo rosado suave, romántico
        contenedorPrincipal: "#ff1493", // Rosa vibrante, dulce
        vistas: "#ffb6c1", // Rosa claro
        texto: "#c71585", // Magenta oscuro, elegante
        isDarkMode: false,
      }; // Shojo – tierno, romántico
    
      const TemaClaro03 /* : ThemeData */ = {
        fondo: "#e6f0ff", // Azul muy claro, futurista y limpio
        contenedorPrincipal: "#1e90ff", // Azul brillante, tecnológico
        vistas: "#add8e6", // Azul claro futurista
        texto: "#003366", // Azul oscuro, serio
        isDarkMode: false,
      }; // Sci-fi – frío, tecnológico, futurista
    
      const TemaClaro04 /* : ThemeData */ = {
        fondo: "#f0f8ff", // Fondo suave, etéreo
        contenedorPrincipal: "#9370db", // Púrpura suave, mágico
        vistas: "#e6e6fa", // Lavanda, mágica
        texto: "#4b0082", // Índigo oscuro para el texto
        isDarkMode: false,
      }; // Fantasía – mágico, etéreo
    
      const TemaClaro05 /* : ThemeData */ = {
        fondo: "#fffacd", // Amarillo pálido, cálido
        contenedorPrincipal: "#ffeb3b", // Amarillo vibrante y juvenil
        vistas: "#f0e68c", // Amarillo pastel
        texto: "#9c640c", // Amarillo oscuro
        isDarkMode: false,
      }; // Escolar – cálido, luminoso
    
      const TemaClaro06 /* : ThemeData */ = {
        fondo: "#ffebee", // Fondo suave, con energía
        contenedorPrincipal: "#f44336", // Rojo intenso, enérgico
        vistas: "#ffccbc", // Rosa claro pero vibrante
        texto: "#c62828", // Rojo oscuro, para reflejar la intensidad
        isDarkMode: false,
      }; // Acción – rápido y enérgico
    
      const TemaClaro07 /* : ThemeData */ = {
        fondo: "#f0f3f4", // Azul grisáceo para un toque mecánico
        contenedorPrincipal: "#4682b4", // Azul acero, tecnológico
        vistas: "#b0c4de", // Azul claro para las vistas
        texto: "#2c3e50", // Azul oscuro, firme
        isDarkMode: false,
      }; // Mecha – industrial, metálico
    
      const TemaClaro08 /* : ThemeData */ = {
        fondo: "#f0fff0", // Verde muy claro, naturaleza
        contenedorPrincipal: "#32cd32", // Verde vibrante, lleno de vida
        vistas: "#98fb98", // Verde suave y aventurero
        texto: "#006400", // Verde oscuro, robusto
        isDarkMode: false,
      }; // Aventura – natural, lleno de vida
    
      const TemaClaro09 /* : ThemeData */ = {
        fondo: "#fff0f5", // Rosado suave, adorable
        contenedorPrincipal: "#ff69b4", // Rosa fuerte, kawaii
        vistas: "#ffc0cb", // Rosa pastel, adorable
        texto: "#b00068", // Magenta oscuro para el texto
        isDarkMode: false,
      }; // Kawaii – vibrante y adorable
    
      const TemaClaro10 /* : ThemeData */ = {
        fondo: "#f0f8ff", // Azul claro, retro
        contenedorPrincipal: "#5f9ea0", // Azul clásico, vibrante y limpio
        vistas: "#87ceeb", // Azul cielo suave, nostálgico
        texto: "#2c3e50", // Azul marino para el texto, clásico
        isDarkMode: false,
      }; // Anime Clásico – nostálgico, retro
    
      const TemaTwilight00 = {
        fondo: "#787878", // Un gris suave, el equilibrio entre la luz y la oscuridad.
        contenedorPrincipal: "#8D8D8D", // Gris intermedio.
        vistas: "#A2A2A2", // Gris más claro, representando el atardecer entre la luz y la noche.
        texto: "#1E1E1E", // Gris oscuro para el texto, cercano a la sombra.
        isDarkMode: false,
      }; // Crepúsculo del Amanecer
    
      const TemaOscuro00 /* : ThemeData */ = {
        fondo: "#000000", // Fondo completamente negro.
        contenedorPrincipal: "#1B1B1B", // Negro ligeramente menos intenso.
        vistas: "#2C2C2C", // Un gris oscuro.
        texto: "#FFFFFF", // Blanco puro para máximo contraste.
        isDarkMode: true,
      };
    
      const TemaOscuro01 /* : ThemeData */ = {
        fondo: "#0D0F12", // Un fondo gris oscuro con matices metálicos.
        contenedorPrincipal: "#1D1D1D", // Gris oscuro neutro.
        vistas: "#2A2D33", // Gris más claro con un toque metálico.
        texto: "#B8C6DB", // Azul claro-grisáceo, futurista y de alta tecnología.
        isDarkMode: true,
      };
      const TemaOscuro02 /* : ThemeData */ = {
        fondo: "#0A0A1F", // Fondo casi negro con un toque de púrpura.
        contenedorPrincipal: "#2C2E40", // Gris oscuro con un tono frío.
        vistas: "#3A3D53", // Azul grisáceo para un efecto cyberpunk.
        texto: "#FF66C4", // Un rosa neón vibrante.
        isDarkMode: true,
      };
      const TemaOscuro03 /* : ThemeData */ = {
        fondo: "#101820", // Un negro profundo y azulado para simular la noche.
        contenedorPrincipal: "#172336", // Azul oscuro, como el cielo nocturno.
        vistas: "#1F3A5B", // Azul más claro, cercano al tono de la luna.
        texto: "#D3E0FF", // Blanco azulado, suave y relajante para la vista nocturna.
        isDarkMode: true,
      };
      const TemaOscuro04 /* : ThemeData */ = {
        fondo: "#141414", // Un fondo negro puro.
        contenedorPrincipal: "#1E1E1E", // Negro intenso.
        vistas: "#282828", // Gris oscuro neutro para dar protagonismo al neón.
        texto: "#39FF14", // Verde neón brillante, como luces de neón.
        isDarkMode: true,
      };
      const TemaOscuro05 /* : ThemeData */ = {
        fondo: "#1C1C1E", // Negro con un toque de azul oscuro.
        contenedorPrincipal: "#2C2C2E", // Un gris oscuro sofisticado.
        vistas: "#383838", // Gris medianamente oscuro para mayor profundidad.
        texto: "#E0E0E0", // Un blanco suave, clásico y elegante.
        isDarkMode: true,
      };
    
      const TemaOscuro06 /* : ThemeData  */ = {
        fondo: "#0B0C10", // Negro con un toque de azul profundo, como las profundidades del océano.
        contenedorPrincipal: "#1F2833", // Gris oscuro con un matiz de agua.
        vistas: "#3C4F5C", // Azul grisáceo, simulando corrientes en el abismo.
        texto: "#66FCF1", // Cian brillante, como luces bajo el agua.
        isDarkMode: true,
      };
      //Refleja lo misterioso e inexplorado, un abismo profundo lleno de secretos.
    
      const TemaOscuro07 /* : ThemeData */ = {
        fondo: "#121212", // Negro puro, como el cielo cubierto durante un eclipse.
        contenedorPrincipal: "#1A1A1A", // Negro intenso, profundo y envolvente.
        vistas: "#2B2B2B", // Gris oscuro, simulando la penumbra de la sombra lunar.
        texto: "#FF4500", // Naranja brillante, como el halo de luz de un eclipse solar.
        isDarkMode: true,
      };
      //Evoca la tensión y la energía del momento en que la luna oculta al sol, dejando un brillo de luz solar en los bordes.
    
      const TemaOscuro08 /* : ThemeData */ = {
        fondo: "#0F0E11", // Negro con un toque de púrpura, casi etéreo.
        contenedorPrincipal: "#232030", // Púrpura oscuro, fantasmal.
        vistas: "#39354F", // Gris púrpura, como una sombra que flota en el aire.
        texto: "#DDA0DD", // Púrpura claro, enigmático y místico.
        isDarkMode: true,
      };
      //Captura lo fantasmal y lo sobrenatural, como si estuvieras en un reino etéreo habitado por espíritus.
    
      const TemaOscuro09 /* : ThemeData */ = {
        fondo: "#1A0000", // Rojo oscuro y profundo, casi negro, evocando las brasas del infierno.
        contenedorPrincipal: "#330000", // Un rojo quemado y ardiente.
        vistas: "#4C0000", // Rojo más claro, como cenizas incandescentes.
        texto: "#FF0000", // Rojo brillante, el fuego y la furia del infierno.
        isDarkMode: true,
      };
      //Un tema ardiente que refleja la intensidad de las llamas y el calor sofocante del inframundo.
    
      const TemaOscuro10 /* : ThemeData */ = {
        fondo: "#1B1B1B", // Negro suave con un toque de gris, como cenizas en el viento.
        contenedorPrincipal: "#2F2F2F", // Gris oscuro, apagado como el polvo de la destrucción.
        vistas: "#474747", // Gris intermedio, como las ruinas de algo olvidado.
        texto: "#A9A9A9", // Gris claro, frío y sombrío como la ceniza.
        isDarkMode: true,
      };
      //Refleja el paisaje post - apocalíptico, un mundo desolado cubierto de polvo y cenizas.
    
      
        switch (themeName) {
          case "claro00":
            return TemaClaro00;
          case "claro01":
            return TemaClaro01;
          case "claro02":
            return TemaClaro02;
          case "claro03":
            return TemaClaro03;
          case "claro04":
            return TemaClaro04;
          case "claro05":
            return TemaClaro05;
          case "claro06":
            return TemaClaro06;
          case "claro07":
            return TemaClaro07;
          case "claro08":
            return TemaClaro08;
          case "claro09":
            return TemaClaro09;
          case "claro10":
            return TemaClaro10;
          case "oscuro00":
            return TemaOscuro00;
          case "oscuro01":
            return TemaOscuro01;
          case "oscuro02":
            return TemaOscuro02;
          case "oscuro03":
            return TemaOscuro03;
          case "oscuro04":
            return TemaOscuro04;
          case "oscuro05":
            return TemaOscuro05;
          case "oscuro06":
            return TemaOscuro06;
          case "oscuro07":
            return TemaOscuro07;
          case "oscuro08":
            return TemaOscuro08;
          case "oscuro09":
            return TemaOscuro09;
          case "oscuro10":
            return TemaOscuro10;
        }
      
  /* return (
    <div>ColorPaletteTheme</div>
  ) */
}
