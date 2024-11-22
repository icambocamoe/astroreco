import React, { useContext, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { TitleComponent } from "../components/TitleComponent";
import { stylesAppTheme } from "../theme/AppTheme";
import { ThemeContext } from "../context/ThemeContext";
import { dynamicStylesAppTheme } from "../theme/DynamicAppTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LanguajeContext } from "../context/LanguageContext";
import { HoroscopeContext } from "../context/HoroscopeContext";
import Sentiment from "sentiment";
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
import axios from "axios";


export const HomeScreen = ({ route }) => {
  const { user } = route.params;
  const context = useContext(ThemeContext); // Obtiene el contexto
  const themeData = context?.themeData; // Obtiene themeData del contexto
  const setThemeData = context?.setThemeData;

  const contextLang = useContext(LanguajeContext);
  const languageData = contextLang?.languageData;
  const setLanguageData = contextLang?.setLanguageData;

  if (!themeData) {
    return null; // Puedes manejar la carga o estado por defecto aquí
  }
  // Genera los estilos dinámicos pasando themeData
  const dynamicStyles = dynamicStylesAppTheme(themeData);

  /*   const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem("themeColors");
      if (storedTheme) {
        return JSON.parse(storedTheme);
      }
      return null; // Si no hay tema guardado, devuelve null
    } catch (error) {
      console.error("Error loading theme:", error);
      return null;
    }
 }; */

  //const handleThemeChange = (themeName) => {
  //const newTheme = ColorPaletteTheme(themeName); // Obtén el tema basado en el nombre
  //setThemeData(newTheme); // Actualiza el contexto con el nuevo tema
  //setSelectedTheme(themeName); // Actualiza el picker
  //saveTheme(newTheme);
  //};
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const {
    horoscope,
    setHoroscope,
    songs,
    setSongs,
    horoscopeFlag,
    setHoroscopeFlag,
    songsFlag,
    setSongsFlag,
    sunSign,
    setSunSign,
    docRef,
    setDocRef,
    movies,
    setMovies,
    sentimentResult,
    setSentimentResult,
    books,
    setBooks,
  } = useContext(HoroscopeContext);

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

    try {
      if (horoscope && Object.keys(horoscope).length > 0) {
        console.log(docRef);

        const result = sentiment.analyze(horoscope.horoscope);// Analyze the sentiment
        setSentimentResult(result);
        console.log(result);

        // Create dictionaries for songs and movies
        const songsDictionary = {};
        const moviesDictionary = {};
        const booksDictionary = {};

        try {
          // Reference to the userRefData collection
          const userRefCollection = collection(db, "userRefData");

          // Create a query to filter by userIDRef
          const q = query(userRefCollection, where("userIDRef", "==", user));

          try {
            // Execute the query
            const querySnapshot = await getDocs(q);
            // Iterate through the results
            querySnapshot.forEach(async (doc) => {
              // Set state with the document data

              if (Object.keys(doc.data().recommendedMovies).length > 0) {
                console.log("hay recommended movies");
                //console.log(doc.data().recommendedMovies);
                setMovies(doc.data().recommendedMovies);
              } else {
                console.log("no hay recommended movies");
                // Fetch movies and populate the dictionary
                await Promise.all(
                  result.words.map(async (word) => {
                    try {
                      const moviesData = await getMovies(word);
                      moviesDictionary[word] = moviesData;
                    } catch (err) {
                      console.error(`Failed to fetch movies for word "${word}":`, err);
                    }
                  })
                );
                setMovies(moviesDictionary);
                console.log("Movies Dictionary:", moviesDictionary);
                try {
                  // Update the Firestore document
                  await updateDoc(docRef, {
                    recommendedMovies: moviesDictionary,
                    updatedAt: serverTimestamp(), // Update the timestamp as well
                  });
                } catch (error) {
                  console.error("Error in firebase:", error);
                }
              }
              if (Object.keys(doc.data().recommendedSongs).length > 0) {
                console.log("hay recommendedsongs");
                //console.log(doc.data().recommendedSongs)
                setSongs(doc.data().recommendedSongs);
              } else {
                console.log("no hay recommendedsongs");
                // Fetch songs and populate the dictionary
                await Promise.all(
                  result.words.map(async (word) => {
                    try {
                      const songsData = await getSongs(word);
                      songsDictionary[word] = songsData;
                    } catch (err) {
                      console.error(`Failed to fetch songs for word "${word}":`, err);
                    }
                  })
                );
                // Update state with the dictionaries
                setSongs(songsDictionary);
                console.log("Songs Dictionary:", songsDictionary);
                try {
                  // Update the Firestore document
                  await updateDoc(docRef, {
                    recommendedSongs: songsDictionary,
                    updatedAt: serverTimestamp(), // Update the timestamp as well
                  });
                } catch (error) {
                  console.error("Error in firebase:", error);
                }

              }
              if (Object.keys(doc.data().recommendedBooks).length > 0) {
                console.log("hay recommended Books");
                //console.log(doc.data().recommendedBooks);
                setBooks(doc.data().recommendedBooks);
              } else {
                console.log("no hay recommended Books");
                // Fetch Books and populate the dictionary
                await Promise.all(
                  result.words.map(async (word) => {
                    try {
                      const booksData = await getBooks(word);
                      if (booksData == null) {
                        const retryData = await getBooks(word);
                        booksDictionary[word] = retryData;
                      } else {
                        booksDictionary[word] = booksData;
                      }
                    } catch (err) {
                      console.error(`Failed to fetch Books for word "${word}":`, err);
                    }
                  })
                );
                console.log("Books Dictionary:", booksDictionary);
                setBooks(booksDictionary);
                try {
                  // Update the Firestore document
                  await updateDoc(docRef, {
                    recommendedBooks: booksDictionary,
                    updatedAt: serverTimestamp(), // Update the timestamp as well
                  });
                } catch (error) {
                  console.error("Error in firebase:", error);
                }
              }
            });

          } catch (error) {
            console.error("Error fetching user reference data: ", error);
          }
        } catch (err) {
          console.error("Error fetching document: ", err);
        }

      }
    } catch (error) {
      console.error("Error in analyzeSentiment function:", error);
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

  const getSongs = async (theme) => {
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

  const getBooks = async (theme) => {

    await delay(5000); // Adjust delay based on the rate limit
    const options = {
      method: 'GET',
      url: 'https://annas-archive-api.p.rapidapi.com/search',
      params: {
        q: theme,
        limit: '5',
        sort: 'mostRelevant',
      },
      headers: {
        'x-rapidapi-key': '2d2f1d9305mshe94bce5818fa2a9p1a5f00jsn140ed873e2a4',
        'x-rapidapi-host': 'annas-archive-api.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }/*
    const url = `https://annas-archive-api.p.rapidapi.com/search?q=${theme}&limit=5&sort=mostRelevant`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '2d2f1d9305mshe94bce5818fa2a9p1a5f00jsn140ed873e2a4',
        'x-rapidapi-host': 'annas-archive-api.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      return result
    } catch (error) {
      console.error(error);
      return null
    }*/
  };
  useEffect(() => {
    const queryUserRefData = async () => {
      try {
        const userRefCollection = collection(db, "userRefData");// Reference to the userRefData collection
        const q = query(userRefCollection, where("userIDRef", "==", user));// Create a query to filter by userIDRef
        try {
          const querySnapshot = await getDocs(q);// Execute the query
          // Iterate through the results
          querySnapshot.forEach((doc) => {

            setDocRef(doc.ref);
            setSunSign(getZodiacName(doc.data().apiInfo.data.sun.sign));
            const currentDate = new Date();// Get current date
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

            } else {
              console.log("we need to fetch today's horoscope");
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

  /*
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
*/

  useEffect(() => {
    if (horoscope) {
      analyzeSentiment();
    }
  }, [horoscope]);

  useEffect(() => {
    // Carga el tema al iniciar la app
    const loadStoredTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("themeColors");
      if (storedTheme) {
        //setTheme(JSON.parse(storedTheme));
        setThemeData(JSON.parse(storedTheme));
        console.log("Theme loaded!");
      }
    };
    loadStoredTheme();
  }, []);

  useEffect(() => {
    console.log("Updated languageData in context: ", languageData);
  }, [languageData]); // Esto se ejecutará cuando `languageData` cambie

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("appLanguage");
        console.log("Trying to load language");
        console.log("storeLanguaje", storedLanguage);
        if (storedLanguage) {
          console.log("Language found:", storedLanguage);
          console.log("LanguageContext => ", languageData);

          setLanguageData({ language: storedLanguage }); // Corrige el estado del contexto
          console.log("LanguageContext => ", languageData);
        }
      } catch (error) {
        console.error("Error loading language:", error);
      }
    };
    loadLanguage();
  }, []);

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
        <TitleComponent />
        <View
          style={[
            stylesAppTheme.viewContainer,
            dynamicStyles.dynamicViewContainer,
          ]}
        >
          <Text style={[dynamicStyles.dynamicText]}>Home Screen</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 20,
    padding: 50, // Combining padding from both containers
    backgroundColor: "#fff",
  },
};
