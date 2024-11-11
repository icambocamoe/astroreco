import React, { useState, useEffect } from "react";
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
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

export default function HomeScreen({ navigation, route }) {
  const { user } = route.params;
  console.log("home", user);
  // Initialize state to store the documents
  const [aspects, setAspects] = useState({});
  const [chart, setChart] = useState({});
  const [astrologicalData, setAstrologicalData] = useState({});

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
            console.log(`Document ID: ${doc.id}, Data: `, doc.data().apiInfo);
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
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Firebase sign out
      // After signing out, navigate back to the Login screen
      navigation.replace("Login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  const PlanetCard = ({ planet }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.emoji}>{planet?.emoji}</Text>
        <Text style={styles.planetName}>{planet?.name}</Text>
        <Text>{`Sign: ${planet?.sign}`}</Text>
        <Text>{`Element: ${planet?.element}`}</Text>
        <Text>{`House: ${planet?.house?.replace(/_/g, " ")}`}</Text>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcome}>Welcome to Astromedia!</Text>

      <View>
        <Image
          source={require("../../assets/logos astromedia.jpg")} // Replace with your own image
          style={styles.image}
        />
      </View>

      <Text style={styles.text}>
        Get personalized media recommendations based on your astrological
        profile and horoscope.
      </Text>
      <View>
        <Text style={styles.header}>
          Astrology Data for {astrologicalData.name}
        </Text>
        <Text style={styles.subheader}>Birth Info</Text>
        <Text style={styles.info}>
          Date: {astrologicalData.year}-{astrologicalData.month}-
          {astrologicalData.day}
        </Text>
        <Text style={styles.info}>
          Time: {astrologicalData.hour}:{astrologicalData.minute}
        </Text>
        <Text style={styles.info}>City: {astrologicalData.city}</Text>

    

        <Text style={styles.subheader}>Planets</Text>
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

        {/* Add more PlanetCard components for other planets */}
      </View>

      {/* You can keep the sign out button here */}
      <Button
        title="Sign Out"
        onPress={() => {
          // Call your sign out function or navigate to login
          navigation.replace("Login");
        }}
        color="red"
      />
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
