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
import { stylesAppTheme } from "../theme/AppTheme";
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme";
import { ThemeContext } from "../context/ThemeContext";
import { TitleComponent } from "../components/TitleComponent.js";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RecommendationsScreen({ route }) {
  const { user } = route.params;
  const [songs, setSongs] = useState({});

  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto

  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }
  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);

  useEffect(() => {
    const queryUserRefData = async () => {
      try {
        // Reference to the userRefData collection
        const userRefCollection = collection(db, "userRefData");

        // Create a query to filter by userIDRef
        const q = query(userRefCollection, where("userIDRef", "==", user));

        try {
          // Execute the query
          const querySnapshot = await getDocs(q);
          // Iterate through the results
          querySnapshot.forEach((doc) => {
            // Set state with the document data

            if (doc.data().recommendedSongs) {
              console.log("hay recommendedsongs");
              //console.log(doc.data().recommendedSongs)
              setSongs(doc.data().recommendedSongs);
            } else {
              console.log("no hay recommendedsongs");
            }
          });
        } catch (error) {
          console.error("Error fetching user reference data: ", error);
        }
      } catch (err) {
        console.error("Error fetching document: ", err);
      }
    };
    // Calling the function when the screen is loaded
    queryUserRefData();
  }, []);
  const openUrl = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };
  // Helper function to render individual entries
  const renderItem = (item, index) => {
    return (
      <View key={index} style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text>Artist: {item.artist?.name}</Text>
            <Text>Duration: {item.duration} seconds</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="heart" size={30} color="black" />
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
