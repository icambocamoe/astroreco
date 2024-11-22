import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList, StyleSheet, } from "react-native";
import { TitleComponent } from "../components/TitleComponent";
import { stylesAppTheme } from "../theme/AppTheme";
import { ThemeContext } from "../context/ThemeContext";
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme";
import { HoroscopeContext } from "../context/HoroscopeContext";

export const FavoriteSongsScreen = () => {
  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto

  const { favoriteSongs, setFavoriteSongs } = useContext(HoroscopeContext);
  useEffect(() => {
    console.log("favoritos ", favoriteSongs)
  }, [favoriteSongs])

  const openUrl = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }
  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);
  // Helper function to render individual entries
  const renderItem = (song) => {
    console.log(song.item)
    return (
      <View key={song.item.index} style={styles.card}>
        <Text style={styles.title}>{song.item.name}</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text>Artist: {song.item.artist?.name}</Text>
            <Text>Duration: {song.item.duration} seconds</Text>
          </View>

        </View>

        <View /* style={styles.row} */>
          {/* Touchable link to open the URL */}
          <TouchableOpacity onPress={() => openUrl(song.item.url)}>
            <Text style={styles.link}>Listen on Last.fm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={[stylesAppTheme.scrollViewStyle, dynamicStyles.dynamicScrollViewStyle]}>
      <View style={[stylesAppTheme.mainContainer, dynamicStyles.dynamicMainContainer]}>
        {/* <TitleComponent /> */}
        <View style={[stylesAppTheme.viewContainer, dynamicStyles.dynamicViewContainer]}>
          <Text style={[dynamicStyles.dynamicText]}>Favorite Songs</Text>
          <View
            style={[
              stylesAppTheme.viewContainer,
              dynamicStyles.dynamicViewContainer,
            ]}
          >
            <FlatList
              data={favoriteSongs}
              keyExtractor={(item, index) => `${item.mbid || index}`}
              renderItem={renderItem}
              contentContainerStyle={styles.container}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  link: {
    color: "#0000FF",
  },
  container: {
    padding: 10,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: "red",
    //justifyContent: "center",
    gap: 90,
  },
  column: {
    flexDirection: "column",
    width: 150,
  },

  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 50,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
