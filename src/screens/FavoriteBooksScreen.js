import React, { useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList, StyleSheet, Image, } from "react-native";
import { TitleComponent } from "../components/TitleComponent";
import { stylesAppTheme } from "../theme/AppTheme";
import { ThemeContext } from "../context/ThemeContext";
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme";
import { HoroscopeContext } from "../context/HoroscopeContext";

export const FavoriteBooksScreen = () => {
  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto
  const { favoriteBooks, setFavoriteBooks } = useContext(HoroscopeContext);
  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }
  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);
  // Helper function to render individual entries
   // Helper function to render individual entries
   const renderItem = (item, index) => {
    const isFavorite = favoriteBooks.some((favorite) => favorite.name === item.name); // Check if item is in favorites


    return (
      <View key={index} style={styles.card}>
        
        <Image source={{ uri: item.imgUrl }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text>Author: {item.author}</Text>
            <Text>Genre: {item.genre} </Text>
            <Text>Format: {item.format}</Text>
          </View>
          <TouchableOpacity onPress={() => handleFavoritePress(item)}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={30}
              color={isFavorite ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "" }]}
            onPress={() => alert("Green button pressed!")}
          >
            <ThumbsUpSvg />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "" }]}
            onPress={() => alert("Red button pressed!")}
          >
            <ThumbsDownSvg />
          </TouchableOpacity>
        </View> */}
        <View /* style={styles.row} */>
          {/* Touchable link to open the URL *
          <TouchableOpacity onPress={() => openUrl(item.imgUrl)}>
            <Text style={styles.link}>Download book</Text>
          </TouchableOpacity>*/}
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={[stylesAppTheme.scrollViewStyle, dynamicStyles.dynamicScrollViewStyle]}>
      <View style={[stylesAppTheme.mainContainer, dynamicStyles.dynamicMainContainer]}>
        {/* <TitleComponent /> */}
        <View style={[stylesAppTheme.viewContainer, dynamicStyles.dynamicViewContainer]}>
          <Text style={[dynamicStyles.dynamicText]}>Favorite Books</Text>
          <FlatList
            data={favoriteBooks}
            keyExtractor={(item, index) => `${item.title || index}`}
            renderItem={renderItem}
            contentContainerStyle={styles.container}
          />
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
