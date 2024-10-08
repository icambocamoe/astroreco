import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Linking, StyleSheet } from 'react-native';
import { auth, db } from '../firebaseConfig.js'; // Import Firebase auth
import Sentiment from 'sentiment';
import axios from 'axios';
import { updateDoc, getFirestore, collection, query, where, getDocs, doc, getDoc, serverTimestamp } from "firebase/firestore";


export default function HoroscopeScreen({ route }) {
  const { user } = route.params;
  const [horoscope, setHoroscope] = useState({});
  const [songs, setSongs] = useState({});
  const [horoscopeFlag, setHoroscopeFlag] = useState(false);
  const [songsFlag, setSongsFlag] = useState(false);
  const [sunSign, setSunSign] = useState('');
  const [docRef, setDocRef] = useState('');

  const [sentimentResult, setSentimentResult] = useState(null);
  const sentiment = new Sentiment();
  // JSON object containing zodiac signs
  const zodiacSigns = {
    "Ari": "aries",
    "Tau": "taurus",
    "Gem": "gemini",
    "Can": "cancer",
    "Leo": "leo",
    "Vir": "virgo",
    "Lib": "libra",
    "Sco": "scorpio",
    "Sag": "sagittarius",
    "Sap": "capricorn",
    "Squ": "aquarius",
    "Pis": "pisces"
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
    const result = sentiment.analyze(horoscope.horoscope);
    setSentimentResult(result);
    console.log(result);

    // Create a dictionary to hold words and their corresponding songs
    const songsDictionary = {};

    // Fetch songs for each word and populate the dictionary
    await Promise.all(
      result.words.map(async (word) => {
        const songsData = await fetchTracksByTheme(word);
        songsDictionary[word] = songsData; // Assign the songs to the word in the dictionary
      })
    );

    // Update state with the songs dictionary
    setSongs(songsDictionary);
    console.log(songsDictionary);
    await updateDoc(docRef, {
      recommendedSongs: songsDictionary,
      updatedAt: serverTimestamp() // Update the timestamp as well
    });
  };


  // Extract themes on component mount
  const getHoroscope = async (options) => {
    try {
      console.log(options.sunsign)
      const response = await axios.request(options);
      setHoroscope(response.data)
      console.log(response.data);
      await updateDoc(docRef, {
        horoscope: response.data,
        updatedAt: serverTimestamp() // Update the timestamp as well
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTracksByTheme = async (theme) => {
    const apiKey = '1d304878f9ecae2fbf33cc85525d0f91';

    try {
      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=tag.getTopTracks&tag=${theme}&api_key=${apiKey}&limit=5&format=json`
      );
      const data = await response.json();
      console.log(data.tracks.track)
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
            console.log(`Document ID: ${doc.id}, Data: `, getZodiacName(doc.data().apiInfo.data.sun.sign));
            // Set state with the document data

            setSunSign(getZodiacName(doc.data().apiInfo.data.sun.sign));
            if (doc.data().horoscope) {
              console.log("hay horoscopo")
              console.log(doc.data().horoscope)
              setHoroscope(doc.data().horoscope)
              setHoroscopeFlag(true)
            } else {
              console.log("no hay horoscopo")
            }
            if (doc.data().recommendedSongs) {
              console.log("hay recommendedsongs")
              console.log(doc.data().recommendedSongs)
              setSongs(doc.data().recommendedSongs)
              setSongsFlag(true)
            } else {
              console.log("no hay recommendedsongs")
            }
            setDocRef(doc.ref)
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
  }, [])

  useEffect(() => {
    if (horoscopeFlag) {
      console.log('ya está el horoscopo');
      return; // Early return to avoid the else
    }
    const options = {
      method: 'GET',
      url: 'https://horoscope-astrology.p.rapidapi.com/horoscope',
      params: {
        day: 'today',
        sunsign: sunSign
      },
      headers: {
        'x-rapidapi-key': '2d2f1d9305mshe94bce5818fa2a9p1a5f00jsn140ed873e2a4',
        'x-rapidapi-host': 'horoscope-astrology.p.rapidapi.com'
      }
    };
    getHoroscope(options);


  }, [sunSign, horoscopeFlag]); // Call extractThemes whenever text changesF

  const updateDocRef = async () => {

    try {
      // Fetching the document using Firestore's getDoc
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(`apiinfo docSnap.data():`);
        console.log(docSnap.data())
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };
  useEffect(() => {
    if (songsFlag) {
      console.log('ya están las canciones');
      return; // Early return to avoid the else
    }
    analyzeSentiment();
  }, [horoscope, songsFlag]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horoscope</Text>
      <Text style={styles.date}>{horoscope.date}</Text>
      <Text style={styles.horoscope}>{horoscope.horoscope}</Text>
      <Text style={styles.luckyNumber}>Lucky Number: {horoscope.lucky_number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
