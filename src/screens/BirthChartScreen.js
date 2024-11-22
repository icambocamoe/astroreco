import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { auth, db } from "../../firebaseConfig.js"; // Import Firebase auth
import { signOut } from "firebase/auth"; // Import Firebase signOut method
import { stylesAppTheme } from "../theme/AppTheme";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme";
import { ThemeContext } from "../context/ThemeContext";
import { TitleComponent } from "../components/TitleComponent.js";
import { LanguageContext } from "../context/LanguageContext.js";
import Languages from "../lang/Languages.json";

export function BirthChartScreen({ navigation, route }) {
  const { user } = route.params;
  console.log("home", user);
  // Initialize state to store the documents
  const [aspects, setAspects] = useState({});
  const [chart, setChart] = useState({});
  const [astrologicalData, setAstrologicalData] = useState({});

  const contextLang = useContext(LanguageContext);
  const languageData = contextLang?.languageData;
  const currentLanguage = languageData?.language || "spanish";

/*   const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    setRenderKey((prevKey) => prevKey + 1); // Cambia el estado para forzar el re-render
  }, [currentLanguage]); // Solo se ejecuta cuando cambia el idioma */

  const t = (keyPath) => {
    return keyPath
      .split(".")
      .reduce((obj, key) => obj?.[key], Languages?.[currentLanguage]);
  };

  useEffect(() => {
    const queryUserRefData = async () => {
      try {
        // Reference to the userRefData collection
        const userRefCollection = collection(db, "userRefData");

        // Create a query to filter by userIDRef
        const q = query(userRefCollection, where("userIDRef", "==", user));
        console.log(q);
        try {
          // Execute the query
          const querySnapshot = await getDocs(q);
          console.log(querySnapshot.docs);
          // Iterate through the results
          querySnapshot.forEach((doc) => {
            //console.log(`Document ID: ${doc.id}, Data: `, doc.data().apiInfo);
            // Set state with the document data
            setAstrologicalData(doc.data().apiInfo.data);
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

  // Logging the state after updates
  /*useEffect(() => {
    console.log("Astrological Data: ", astrologicalData);
  }, [astrologicalData]); // Logs state changes
*/

  // Function to handle sign out
  /* const handleSignOut = async () => {
    try {
      await signOut(auth); // Firebase sign out
      // After signing out, navigate back to the Login screen
      navigation.replace("Login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  }; */
  const PlanetCard = ({ planet }) => {
    return (
      <View style={[styles.card]}>
        <Text style={styles.emoji}>{planet?.emoji}</Text>
        <Text style={styles.planetName}>{planet?.name}</Text>
        <Text>{`Sign: ${planet?.sign}`}</Text>
        <Text>{`Element: ${planet?.element}`}</Text>
        <Text>{`House: ${planet?.house?.replace(/_/g, " ")}`}</Text>
        <Text>{`Quality: ${planet?.quality?.replace(/_/g, " ")}`}</Text>
      </View>
    );
  };
  const HouseCard = ({ planet }) => {
    return (
      <View style={[styles.card]}>
        <Text style={styles.emoji}>{planet?.emoji}</Text>
        <Text style={styles.planetName}>{planet?.name}</Text>
        <Text>{`Sign: ${planet?.sign}`}</Text>
        <Text>{`Element: ${planet?.element}`}</Text>
        <Text>{`Quality: ${planet?.quality?.replace(/_/g, " ")}`}</Text>
      </View>
    );
  };
  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto

  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }
  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);

  return (
    <ScrollView 
      style={[
        dynamicStyles.dynamicScrollViewStyle,
        stylesAppTheme.scrollViewStyle,
      ]}
    >
      <View /* key={renderKey} */
        style={[
          /* dynamicStyles.dynamicMainContainer,
          stylesAppTheme.mainContainer, */
          dynamicStyles.dynamicMainContainer,
          stylesAppTheme.mainContainer,
        ]}
      >
        <TitleComponent />
        {/* <View>
        <Image
          source={require("../../assets/logos astromedia.jpg")} // Replace with your own image
          style={styles.image}
        />
      </View> */}
        {/* <View style={stylesAppTheme.viewContainer}> */}
        <View
          style={[
            dynamicStyles.dynamicViewContainer,
            stylesAppTheme.viewContainer,
          ]}
        >
          <View>
            <Text style={[[styles.header, dynamicStyles.dynamicText]]}>
              {t("birthchart.title")} {astrologicalData.name}
            </Text>
            <Text style={[styles.subheader, dynamicStyles.dynamicText]}>
              {t("birthchart.subtitle")}
            </Text>
            <Text style={[styles.info, dynamicStyles.dynamicText]}>
              {t("birthchart.date")} {astrologicalData.year}-
              {astrologicalData.month}-{astrologicalData.day}
            </Text>
            <Text style={[styles.info, dynamicStyles.dynamicText]}>
              {t("birthchart.time")} {astrologicalData.hour}:
              {astrologicalData.minute}
            </Text>
            <Text style={[styles.info, dynamicStyles.dynamicText]}>
              {t("birthchart.city")} {astrologicalData.city}
            </Text>

            <Text
              style={[
                styles.subheader,
                dynamicStyles.dynamicText,
                { fontSize: 24 },
              ]}
            >
              {t("birthchart.planets")}
            </Text>
            <PlanetCard planet={astrologicalData.sun} />
            <PlanetCard planet={astrologicalData.moon} />
            <PlanetCard planet={astrologicalData.mercury} />
            <PlanetCard planet={astrologicalData.venus} />
            <PlanetCard planet={astrologicalData.mars} />
            <PlanetCard planet={astrologicalData.jupiter} />
            <PlanetCard planet={astrologicalData.saturn} />
            <PlanetCard planet={astrologicalData.uranus} />
            <PlanetCard planet={astrologicalData.neptune} />
            <PlanetCard planet={astrologicalData.pluto} />
            <Text
              style={[
                styles.subheader,
                dynamicStyles.dynamicText,
                { fontSize: 24 },
              ]}
            >
              {t("birthchart.houses")}
            </Text>
            <HouseCard planet={astrologicalData.first_house} />
            <HouseCard planet={astrologicalData.second_house} />
            <HouseCard planet={astrologicalData.third_house} />
            <HouseCard planet={astrologicalData.fourth_house} />
            <HouseCard planet={astrologicalData.fifth_house} />
            <HouseCard planet={astrologicalData.sixth_house} />
            <HouseCard planet={astrologicalData.seventh_house} />
            <HouseCard planet={astrologicalData.eighth_house} />
            <HouseCard planet={astrologicalData.ninth_house} />
            <HouseCard planet={astrologicalData.tenth_house} />
            <HouseCard planet={astrologicalData.eleventh_house} />
            <HouseCard planet={astrologicalData.twelfth_house} />

            {/* Add more PlanetCard components for other planets */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 20,
    padding: 50, // Combining padding from both containers
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subheader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  card: {
    backgroundColor: "#f0f8ff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },
  emoji: {
    fontSize: 40,
  },
  planetName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    alignSelf: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
};
