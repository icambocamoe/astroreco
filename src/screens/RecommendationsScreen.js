import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Linking, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { updateDoc, getFirestore, collection, query, where, getDocs, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig.js'; // Import Firebase auth
import ThumbsUpSvg from '../svg_components/hand-in-thumbs-up-position-svgrepo-com.svg';
import ThumbsDownSvg from '../svg_components/thumb-down-svgrepo-com.svg';

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
                            //console.log(doc.data().recommendedSongs)
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
    const openUrl = (url) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };
    // Helper function to render individual entries
    const renderItem = (item, index) => {
        return (
            <View key={index} style={styles.card}>
                <Text style={styles.title}>{item.name}</Text>
                <Text>Artist: {item.artist?.name}</Text>
                <Text>Duration: {item.duration} seconds</Text>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '' }]} onPress={() => alert('Green button pressed!')}>
                        <ThumbsUpSvg />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '' }]} onPress={() => alert('Red button pressed!')}>
                        <ThumbsDownSvg />
                    </TouchableOpacity>
                </View>
                {/* Touchable link to open the URL */}
                <TouchableOpacity onPress={() => openUrl(item.url)}>
                    <Text style={styles.link}>Listen on Last.fm</Text>
                </TouchableOpacity>

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