import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Linking, StyleSheet } from 'react-native';

export default function HoroscopeScreen() {
    const [horoscope, setHoroscope] = useState('');
    const [songs, setSongs] = useState([]);

    const zodiacSign = 'leo';  // You can make this dynamic

    // Get Horoscope Data
    const url = 'https://horoscopes-ai.p.rapidapi.com/get_horoscope/aries/today/general/es';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2d2f1d9305mshe94bce5818fa2a9p1a5f00jsn140ed873e2a4',
            'x-rapidapi-host': 'horoscopes-ai.p.rapidapi.com'
        }
    };

    
    const getHoroscope = async () => {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
       
    };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horoscope</Text>
      <Text style={styles.content}>
        Check out your daily horoscope and astrological predictions here.
      </Text>
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
