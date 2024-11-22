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

export default function BooksScreen({ route, onFavorite }) {
    const { user } = route.params;
    const { docRef, books, favoriteBooks, setFavoriteBooks } = useContext(HoroscopeContext);

    const context = useContext(ThemeContext); // Obtiene el contexto
    const themeData = context?.themeData; // Obtiene themeData del contexto
    useEffect( () => {
        const updateDatabase = async () => {
            try {
              await updateDoc(docRef, {
                favoriteBooks: favoriteBooks, // Correcting the key to `favoriteBooks`
                updatedAt: serverTimestamp(), // Update the timestamp as well
              });
            } catch (error) {
              console.error(error);
            }
          };
        
          if (favoriteBooks) {
            updateDatabase();
          }
      }, [favoriteBooks]);
    const handleFavoritePress = (item) => {
        setFavoriteBooks((prevFavorites) => {
            const isFavorite = prevFavorites.some((favorite) => favorite.title === item.title);
            if (isFavorite) {
                // Remove the item from favorites
                return prevFavorites.filter((favorite) => favorite.title !== item.title);
            } else {
                // Add the item to favorites
                return [...prevFavorites, item];
            }
        });

    };
    useEffect(() => {
        console.log(books)
    }, [books])
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
        const isFavorite = favoriteBooks.some((favorite) => favorite.title === item.title); // Check if item is in favorites


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
                    {Object.keys(books || {}).length > 0 ? (
                        Object.keys(books).map((category, catIndex) => (
                            <View key={catIndex}>
                                <Text style={[styles.categoryTitle, dynamicStyles.dynamicText]}>
                                    {category.toUpperCase()}
                                </Text>
                                {Array.isArray(books[category]?.books) && books[category].books.length > 0 ? (
                                    books[category].books.map((item, itemIndex) =>
                                        renderItem(item, itemIndex)
                                    )
                                ) : (

                                    <Text style={ dynamicStyles.dynamicText}>No items in this category.</Text>
                                )}
                            </View>
                        ))
                    ) : (
                        <Text style={ dynamicStyles.dynamicText}>No data available.</Text>
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
