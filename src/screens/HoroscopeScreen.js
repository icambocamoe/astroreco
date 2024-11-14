import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Linking,
  StyleSheet,
  ScrollView,
} from "react-native";
import { auth, db } from "../../firebaseConfig.js"; // Import Firebase auth
import Sentiment from "sentiment";
import axios from "axios";
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
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme";
import { stylesAppTheme } from "../theme/AppTheme";
import { TitleComponent } from "../components/TitleComponent.js";
import { ThemeContext } from "../context/ThemeContext.js";


export default function HoroscopeScreen({ route }) {
  const { user } = route.params;
  const [horoscope, setHoroscope] = useState({});
  const [songs, setSongs] = useState({});
  const [horoscopeFlag, setHoroscopeFlag] = useState(false);
  const [songsFlag, setSongsFlag] = useState(false);
  const [sunSign, setSunSign] = useState("");
  const [docRef, setDocRef] = useState("");
  const [movies, setMovies] = useState({});

  const [sentimentResult, setSentimentResult] = useState(null);
  const sentiment = new Sentiment();
  // JSON object containing zodiac signs
  const zodiacSigns = {
    Ari: "aries",
    Tau: "taurus",
    Gem: "gemini",
    Can: "cancer",
    Leo: "leo",
    Vir: "virgo",
    Lib: "libra",
    Sco: "scorpio",
    Sag: "sagittarius",
    Sap: "capricorn",
    Aqu: "aquarius",
    Pis: "pisces",
  };

  // Function to get the zodiac name by key
  function getZodiacName(key) {
    // Check if the key exists in the zodiacSigns object
    if (zodiacSigns.hasOwnProperty(key)) {
      return zodiacSigns[key]; // Return the full zodiac name
    } else {
      return "Zodiac sign not found"; // Return a message if the key doesn't exist
    }
  }

  const analyzeSentiment = async () => {
    if (horoscope && Object.keys(horoscope).length > 0) {
      console.log(horoscope);
      const result = sentiment.analyze(horoscope.horoscope);
      setSentimentResult(result);
      console.log(result);

      // Create a dictionary to hold words and their corresponding songs
      const songsDictionary = {};
      const moviesDictionary = {};
      // Fetch songs for each word and populate the dictionary
      await Promise.all(
        result.words.map(async (word) => {
          const songsData = await fetchTracksByTheme(word);
          songsDictionary[word] = songsData; // Assign the songs to the word in the dictionary
        })
      );
      await Promise.all(
        result.words.map(async (word) => {
          const moviesData = await getMovies(word);
          moviesDictionary[word] = moviesData;
        })
      );

      // Update state with the songs dictionary
      setSongs(songsDictionary);
      setMovies(moviesDictionary);
      console.log("canciones ", songsDictionary);
      await updateDoc(docRef, {
        recommendedSongs: songsDictionary,
        recommendedMovies: moviesDictionary,
        updatedAt: serverTimestamp(), // Update the timestamp as well
      });
    }
  };

  const getMovies = async (theme) => {
    const options = {
      method: "GET",
      url: "https://unogs-unogs-v1.p.rapidapi.com/search/titles",
      params: {
        order_by: "rating",
        limit: "3",
        title: theme,
      },
      headers: {
        "x-rapidapi-key": "861cf89b6bmsh5ee992a631165abp122b95jsn5c242c8cd7b8",
        "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      console.log("movies", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  // Extract themes on component mount
  const getHoroscope = async (options, formattedDate) => {
    try {
      //console.log(options.sunsign)
      const response = await axios.request(options);
      setHoroscope({
        horoscope: response.data.message,
        date: formattedDate,
      });
      console.log(response.data);
      await updateDoc(docRef, {
        horoscope: {
          horoscope: response.data.message,
          date: formattedDate,
        },
        updatedAt: serverTimestamp(), // Update the timestamp as well
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTracksByTheme = async (theme) => {
    const apiKey = "1d304878f9ecae2fbf33cc85525d0f91";

    try {
      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&tag=${theme}&api_key=${apiKey}&limit=5&format=json`
      );
      const data = await response.json();
      console.log(data.tracks.track);
      return data.tracks.track;
    } catch (error) {
      console.error(error);
    }
  };

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
            setSunSign(getZodiacName(doc.data().apiInfo.data.sun.sign));
            // Get current date
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
            const day = String(currentDate.getDate()).padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;
            const fbDate = doc.data().horoscope.date;

            let isSameDate = formattedDate == fbDate;

            console.log(
              isSameDate
                ? "The dates are the same!"
                : "The dates are different."
            );
            if (isSameDate) {
              //si la fecha es la de hoy ponemos los datos que son de hoy,
              if (doc.data().horoscope) {
                console.log("hay horoscopo");
                setHoroscopeFlag(true);
                setHoroscope(doc.data().horoscope);
              } else {
                console.log("no hay horoscopo");
              }
              if (Object.keys(doc.data().recommendedSongs).length > 0) {
                console.log("hay recommendedsongs");
                console.log(doc.data().recommendedSongs);
                setSongs(doc.data().recommendedSongs);
                setSongsFlag(true);
              } else {
                console.log("no hay recommendedsongs");
                analyzeSentiment();
              }
            } else {
              console.log("we need to fetch today's horoscope");
            }

            setDocRef(doc.ref);
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

  // make an express api to fetch this
  useEffect(() => {
    if (horoscopeFlag) {
      console.log("ya está el horoscopo");
      return; // Early return to avoid the else
    } else {
      if (sunSign) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const day = String(currentDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        const options = {
          method: "GET",
          url: "https://daily-horoscope8.p.rapidapi.com/daily",
          params: {
            sign: sunSign,
            date: formattedDate,
          },
          headers: {
            "x-rapidapi-key":
              "2d2f1d9305mshe94bce5818fa2a9p1a5f00jsn140ed873e2a4",
            "x-rapidapi-host": "daily-horoscope8.p.rapidapi.com",
          },
        };
        getHoroscope(options, formattedDate);
      }
    }
  }, [sunSign, horoscopeFlag]); // Call extractThemes whenever text changesF

  const updateDocRef = async () => {
    try {
      // Fetching the document using Firestore's getDoc
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(`apiinfo docSnap.data():`);
        console.log(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };
  useEffect(() => {
    if (songsFlag) {
      console.log("ya están las canciones");
      return; // Early return to avoid the else
    }
    analyzeSentiment();
  }, [horoscope, songsFlag]);

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
      <View
        style={[
          dynamicStyles.dynamicMainContainer,
          stylesAppTheme.mainContainer,
        ]}
      >
        <TitleComponent />

        <View
          style={[
            dynamicStyles.dynamicViewContainer,
            stylesAppTheme.viewContainer,
          ]}
        >
          <Text style={styles.title}>Horoscope</Text>
          <Text style={[styles.date, dynamicStyles.dynamicText, styles.text]}>{horoscope.date}</Text>
          <Text style={[styles.horoscope, dynamicStyles.dynamicText, styles.text]}>{horoscope.horoscope}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  text:{
    fontSize: 18,
    //textAlign: "justify",
  },
  date: {
  fontWeight: "bold",
  }
});
