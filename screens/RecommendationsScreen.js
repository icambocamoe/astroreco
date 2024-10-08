import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Linking, StyleSheet, ScrollView, Image } from 'react-native';
import { updateDoc, getFirestore, collection, query, where, getDocs, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from '../firebaseConfig.js'; // Import Firebase auth


export default function RecommendationsScreen({ route }) {
    const { user } = route.params;
    const [songs, setSongs] = useState({});


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
                            console.log("hay recommendedsongs")
                            console.log(doc.data().recommendedSongs)
                            setSongs(doc.data().recommendedSongs)
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

    // Helper function to render individual entries
    const renderItem = (item, index) => {
        return (
            <View key={index} style={styles.card}>
                <Text style={styles.title}>{item.name}</Text>
                <Text>Artist: {item.artist?.name}</Text>
                <Text>Duration: {item.duration} seconds</Text>
                <Image source={{ uri: item.image[0]["#text"] }} style={styles.image} />
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            {Object.keys(songs).map((category, index) => (
                <View key={index}>
                    <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
                    {songs[category].length > 0 ? (
                        songs[category].map(renderItem)
                    ) : (
                        <Text>No items in this category.</Text>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    horoscopeText: {
        fontSize: 16,
        marginBottom: 20,
    },
    songItem: {
        marginBottom: 20,
    },
    songTitle: {
        fontSize: 16,
    },
});