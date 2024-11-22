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
import ThumbsUpSvg from "../svg_components/hand-in-thumbs-up-position-svgrepo-com.svg";
import ThumbsDownSvg from "../svg_components/thumb-down-svgrepo-com.svg";
import { stylesAppTheme } from "../theme/AppTheme.js";
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme.js";
import { ThemeContext } from "../context/ThemeContext.js";
import { TitleComponent } from "../components/TitleComponent.js";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HoroscopeContext } from "../context/HoroscopeContext.js";

export default function SongsScreen({ route, onFavorite }) {
  const { user } = route.params;
  const { docRef, songs, favoriteSongs, setFavoriteSongs } = useContext(HoroscopeContext);

  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto

  useEffect( () => {
    const updateDatabase = async () => {
        try {
          await updateDoc(docRef, {
            favoriteSongs: favoriteSongs, // Correcting the key to `favoriteSongs`
            updatedAt: serverTimestamp(), // Update the timestamp as well
          });
        } catch (error) {
          console.error(error);
        }
      };
    
      if (favoriteSongs) {
        updateDatabase();
      }
  }, [favoriteSongs]);
  const handleFavoritePress = (item) => {
    setFavoriteSongs((prevFavorites) => {
      const isFavorite = prevFavorites.some((favorite) => favorite.name === item.name);
      if (isFavorite) {
        // Remove the item from favorites
        return prevFavorites.filter((favorite) => favorite.name !== item.name);
      } else {
        // Add the item to favorites
        return [...prevFavorites, item];
      }
    });
    
  };
  useEffect(() =>{
    console.log(favoriteSongs)
  },[favoriteSongs])
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
  const renderItem = (item, index) => {
    const isFavorite = favoriteSongs.some((favorite) => favorite.name === item.name); // Check if item is in favorites


    return (
      <View key={index} style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text>Artist: {item.artist?.name}</Text>
            <Text>Duration: {item.duration} seconds</Text>
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
          {/* Touchable link to open the URL */}
          <TouchableOpacity onPress={() => openUrl(item.url)}>
            <Text style={styles.link}>Listen on Last.fm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={[
        dynamicStyles.dynamicScrollViewStyle,
        stylesAppTheme.scrollViewStyle,
      ]}
    >
      <View
        style={[
          /* dynamicStyles.dynamicMainContainer,
          stylesAppTheme.mainContainer, */
          dynamicStyles.dynamicMainContainer,
          stylesAppTheme.mainContainer,
        ]}
      >
        {/* <TitleComponent /> */}

        <View
          style={[
            stylesAppTheme.viewContainer,
            dynamicStyles.dynamicViewContainer,
          ]}
        >
          {Object.keys(songs).map((category, index) => (
            <View key={index}>
              <Text style={[styles.categoryTitle, dynamicStyles.dynamicText]}>
                {category.toUpperCase()}
              </Text>
              {songs[category].length > 0 ? (
                songs[category].map(renderItem)
              ) : (
                <Text>No items in this category.</Text>
              )}
            </View>
          ))}
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
