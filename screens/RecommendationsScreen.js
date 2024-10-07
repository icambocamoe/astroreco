import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Linking, StyleSheet } from 'react-native';

export default function RecommendationsScreen({ route }) {
    const { user } = route.params;
    

    // Get Spotify Access Token using fetch
    const getSpotifyAccessToken = async () => {
        const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
        const clientSecret = 'YOUR_SPOTIFY_CLIENT_SECRET';
        const credentials = btoa(`${clientId}:${clientSecret}`); // Base64 encode clientId:clientSecret

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'grant_type=client_credentials', // Body as a string
            });

            const data = await response.json();
            return data.access_token;
        } catch (error) {
            console.error('Error fetching Spotify access token:', error);
        }
    };

    // Search for Songs Based on Horoscope Theme using fetch
    const searchSpotifySongs = async (theme) => {
        const token = await getSpotifyAccessToken();

        try {
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${theme}&type=track&limit=5`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();
            setSongs(data.tracks.items); // Set the songs in state
        } catch (error) {
            console.error('Error fetching songs from Spotify:', error);
        }
    };

    // Fetch Horoscope and Songs on Mount
    useEffect(() => {
        (async () => {
            const horoscopeText = await getHoroscope();
            searchSpotifySongs('motivation');  // You can extract themes from horoscopeText here
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Horoscope for {zodiacSign}</Text>
            <Text style={styles.horoscopeText}>{horoscope}</Text>

            <FlatList
                data={songs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.songItem}>
                        <Text style={styles.songTitle}>
                            {item.name} by {item.artists[0].name}
                        </Text>
                        <Button
                            title="Play Preview"
                            onPress={() => {
                                Linking.openURL(item.preview_url);
                            }}
                        />
                    </View>
                )}
            />
        </View>
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