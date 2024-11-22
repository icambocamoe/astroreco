import React, { useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList, StyleSheet, Image, Linking } from "react-native";
import { TitleComponent } from "../components/TitleComponent";
import { stylesAppTheme } from "../theme/AppTheme";
import { ThemeContext } from "../context/ThemeContext";
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme";
import { HoroscopeContext } from "../context/HoroscopeContext";

export const FavoriteMoviesScreen = () => {
  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto
  const { favoriteMovies, setFavoriteMovies } = useContext(HoroscopeContext);
  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }
  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);
  const openUrl = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  // Helper function to render individual entries
  const renderItem = (movie, index) => {
    const isFavorite = favoriteMovies.some((favorite) => favorite.imdb_id === movie.item.imdb_id); // Check if movie.item is in favorites

    return (
      <View key={index} style={styles.card}>
        <Image source={{ uri: movie.item.img }} style={styles.image} />
        <Text style={styles.title}>{movie.item.title}</Text>
        <Text>Type: {movie.item.title_type}</Text>
        <TouchableOpacity
          onPress={() =>
            openUrl(`https://www.netflix.com/watch/${movie.item.netflix_id}`)
          }
        >
          <Text style={styles.link}>Watch in Netflix</Text>
        </TouchableOpacity>
        <Text>Synopsis: {movie.item.synopsis}</Text>
        <Text>Rating: {movie.item.rating}</Text>
        <Text>Year: {movie.item.year}</Text>
        <Text>Runtime: {Math.floor(movie.item.runtime / 60)} minutes</Text>
        <TouchableOpacity
          onPress={() => openUrl(`https://www.imdb.com/title/${movie.item.imdb_id}`)}
        >
          <Text style={styles.link}>See in IMDB</Text>
        </TouchableOpacity>
        <Text></Text>
        <Text>Top 250: {movie.item.top250}</Text>
        <Text>Top 250 TV: {movie.item.top250tv}</Text>
        <Text>Title Date: {movie.item.title_date}</Text>

      </View>
    );
  };
  return (
    <ScrollView style={[stylesAppTheme.scrollViewStyle, dynamicStyles.dynamicScrollViewStyle]}>
      <View style={[stylesAppTheme.mainContainer, dynamicStyles.dynamicMainContainer]}>
        {/* <TitleComponent /> */}
        <View style={[stylesAppTheme.viewContainer, dynamicStyles.dynamicViewContainer]}>
          <Text style={[dynamicStyles.dynamicText]}>Favorite Movies</Text>
          <FlatList
            data={favoriteMovies}
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
