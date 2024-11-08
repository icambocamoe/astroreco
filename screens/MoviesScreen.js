import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Linking, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { updateDoc, getFirestore, collection, query, where, getDocs, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from '../firebaseConfig.js'; // Import Firebase auth


export default function MoviesScreen({ route }) {
    const { user } = route.params;
    const [movies, setMovies] = useState({});
    //https://unogs-unogs-v1.p.rapidapi.com/search/titles?order_by=rating&title=avoid

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

                        if (doc.data().recommendedMovies) {
                            console.log("hay recommendedsongs")
                            console.log(doc.data().recommendedMovies)
                            setMovies(doc.data().recommendedMovies)
                        } else {
                            console.log("no hay recommendedsongs")
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
    }, [])
    const openUrl = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };
    // Helper function to render individual entries
    const renderItem = (item, index) => {
        return (
            <View key={index} style={styles.card}>
                <Image source={{ uri: item.img }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text>Type: {item.title_type}</Text>
                <TouchableOpacity onPress={() => openUrl(`https://www.netflix.com/watch/${item.netflix_id}`)}>
                    <Text style={styles.link}>Watch in Netflix</Text>
                </TouchableOpacity>
                <Text>Synopsis: {item.synopsis}</Text>
                <Text>Rating: {item.rating}</Text>
                <Text>Year: {item.year}</Text>
                <Text>Runtime: {Math.floor(item.runtime / 60)} minutes</Text>
                <TouchableOpacity onPress={() => openUrl(`https://www.imdb.com/title/${item.imdb_id}`)}>
                    <Text style={styles.link}>See in IMDB</Text>
                </TouchableOpacity>
                <Text></Text>
                <Text>Top 250: {item.top250}</Text>
                <Text>Top 250 TV: {item.top250tv}</Text>
                <Text>Title Date: {item.title_date}</Text>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
        {Object.keys(movies).map((category, catIndex) => (
            <View key={catIndex}>
                <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
                {movies[category].results.length > 0 ? (
                    movies[category].results.map((item, itemIndex) => renderItem(item, itemIndex))
                ) : (
                    <Text>No items in this category.</Text>
                )}
            </View>
        ))}
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    link:{
        color: '#0000FF',
    },
    container: {
        padding: 10,
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    button: {
        flex: 1,
        padding: 10,
        marginHorizontal: 50,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

