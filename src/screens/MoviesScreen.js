import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Linking,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  updateDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig.js"; // Import Firebase auth
import { stylesAppTheme } from "../theme/AppTheme.js";
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme.js";
import { ThemeContext } from "../context/ThemeContext.js";
import { TitleComponent } from "../components/TitleComponent.js";
import { HoroscopeContext } from "../context/HoroscopeContext.js";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MoviesScreen({ route }) {
  const { user } = route.params;

  //const { movies, favoriteMovies, setFavoriteMovies } =
    //useContext(HoroscopeContext);

  const { docRef, movies, favoriteMovies, setFavoriteMovies } = useContext(HoroscopeContext);

  useEffect( () => {
    const updateDatabase = async () => {
      try {
        await updateDoc(docRef, {
          favoriteMovies: favoriteMovies, // Correcting the key to `favoriteMovies`
          updatedAt: serverTimestamp(), // Update the timestamp as well
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (favoriteMovies) {
      updateDatabase();
    }
  }, [favoriteMovies]);


  const handleFavoritePress = (item) => {
    setFavoriteMovies((prevFavorites) => {
      const isFavorite = prevFavorites.some(
        (favorite) => favorite.imdb_id === item.imdb_id
      );
      if (isFavorite) {
        // Remove the item from favorites
        return prevFavorites.filter(
          (favorite) => favorite.imdb_id !== item.imdb_id
        );
      } else {
        // Add the item to favorites
        return [...prevFavorites, item];
      }
    });

  };
  //https://unogs-unogs-v1.p.rapidapi.com/search/titles?order_by=rating&title=avoid

  const openUrl = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto

  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }
  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);

  // Helper function to render individual entries
  const renderItem = (item, index) => {
    const isFavorite = favoriteMovies.some(
      (favorite) => favorite.imdb_id === item.imdb_id
    ); // Check if item is in favorites

    return (
      <View key={index} style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={{ uri: item.img }} style={styles.image} />
        <Text>Type: {item.title_type}</Text>
        
        <Text>Synopsis: {item.synopsis}</Text>
        <Text>Rating: {item.rating}</Text>
        <Text>Year: {item.year}</Text>
        <Text>Runtime: {Math.floor(item.runtime / 60)} minutes</Text>
        
        <Text></Text>
        <Text>Top 250: {item.top250}</Text>
        <Text>Top 250 TV: {item.top250tv}</Text>
        <Text>Title Date: {item.title_date}</Text>
        <TouchableOpacity
          onPress={() => openUrl(`https://www.imdb.com/title/${item.imdb_id}`)}
        >
          <Ionicons name="information-circle" size={30} color={themeData.texto} />
          {/* <Text style={styles.link}>See in IMDB</Text> */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFavoritePress(item)}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={30}
            /* color={isFavorite ? "red" : "black"} */
            color={themeData.texto}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openUrl(`https://www.netflix.com/watch/${item.netflix_id}`)
          }
        >
          <Ionicons name="play" size={30} color={themeData.texto} />
          {/* <Text style={styles.link}>Watch in Netflix</Text> */}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView
      style={[
        stylesAppTheme.scrollViewStyle,
        dynamicStyles.dynamicScrollViewStyle,
      ]}
    >
      <View
        style={[
          stylesAppTheme.mainContainer,
          dynamicStyles.dynamicMainContainer,
        ]}
      >
        {/*  <TitleComponent /> */}
        <View
          style={[
            stylesAppTheme.viewContainer,
            dynamicStyles.dynamicViewContainer,
          ]}
        >
          {Object.keys(movies || {}).length > 0 ? (
            Object.keys(movies).map((category, catIndex) => (
              <View key={catIndex}>
                <Text style={[styles.categoryTitle, dynamicStyles.dynamicText]}>
                  {category.toUpperCase()}
                </Text>
                {Array.isArray(movies[category]?.results) &&
                movies[category].results.length > 0 ? (
                  movies[category].results.map((item, itemIndex) =>
                    renderItem(item, itemIndex)
                  )
                ) : (
                  <Text style={dynamicStyles.dynamicText}>
                    No items in this category.
                  </Text>
                )}
              </View>
            ))
          ) : (
            <Text style={dynamicStyles.dynamicText}>No data available.</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

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
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 150,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: "red",
    width: "auto",
    //justifyContent: "center",
    gap: 23,
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
