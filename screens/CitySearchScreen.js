import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const CitySearch = ({ onCitySelected }) => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [citySelected, setCitySelected] = useState(false); // Flag for city selection

  const API_KEY = '41413ec2792d4c739433a7b0fc9de1d0'; // Replace with your OpenCage API key

  // Debounce logic: Use a delay to prevent too many API requests
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length >= 4 && !citySelected) {  // Check if no city is selected
        fetchCities(query);  // Fetch cities only when 4 or more characters are typed
      }
    }, 500);  // 500ms debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [query, citySelected]);  // Also watch the citySelected flag

  // Fetch city data from API
  const fetchCities = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${API_KEY}&limit=5`
      );
      const cityResults = response.data.results.map(result => ({
        name: result.formatted,
        lat: result.geometry.lat,
        lng: result.geometry.lng
      }));
      setCities(cityResults);  // Set the cities from the API response
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setQuery(city.name);
    setCities([]);
    setCitySelected(true);
    // Pass latitude and longitude to the parent component
    if (onCitySelected) {
      onCitySelected(city);
    }
  };

  const handleInputChange = (input) => {
    setQuery(input); // Update the query as the user types
    setCitySelected(false); // Reset city selection flag when typing
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={query}
        onChangeText={handleInputChange}  // Use handleInputChange to reset flag when typing
      />
      
      {/* Display city suggestions in a dropdown */}
      {cities.length > 0 && (
        <FlatList
          data={cities}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCitySelect(item)}>
              <Text style={styles.cityItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    maxHeight: 200,
  },
  cityItem: {
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  selectedCity: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});

export default CitySearch;
