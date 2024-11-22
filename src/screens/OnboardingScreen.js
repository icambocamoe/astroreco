import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig.js'; // Import your Firebase configuration 
import { updateDoc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import timezones from '../../assets/objects/timezones.js';
import RNPickerSelect from 'react-native-picker-select';
import months from '../../assets/objects/months.js';
import CitySearch from './CitySearchScreen.js';
import { HoroscopeContext } from "../context/HoroscopeContext";
import axios from "axios";

const OnboardingScreen = ({ navigation, route }) => {
    const { docRef } = route.params; // Get email and password from navigation params
    const { sunSign, setSunSign, setHoroscope } = useContext(HoroscopeContext); 
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
    };  // Function to get the zodiac name by key
    function getZodiacName(key) {
      // Check if the key exists in the zodiacSigns object
      if (zodiacSigns.hasOwnProperty(key)) {
        return zodiacSigns[key]; // Return the full zodiac name
      } else {
        return "Zodiac sign not found"; // Return a message if the key doesn't exist
      }
    }
    let username;
    let userUID;
    const [user, setUser] = useState([]);//userCredential.user.uid;

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                // Fetching the document using Firestore's getDoc
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    //console.log(docSnap.data());
                    userUID = docSnap.data().userIDRef
                    username = docSnap.data().name;
                    // Update the `name` field in the form's values
                    setValue('name', username);
                    setUser(userUID);
                    //console.log("useEffect userIDRefser", user);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };

        // Calling the function when the screen is loaded
        fetchDocument();
    }, []); // Empty dependency array ensures this runs only once when the screen loads

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
    useEffect(() => {
        console.log("fetching horoscope")
        const currentDate = new Date();// Get current date
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const day = String(currentDate.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        if (sunSign) {
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
            try {
                getHoroscope(options, formattedDate);
            } catch (error) {
                console.error(error)
            }
        }
    }, [sunSign]);
    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            year: '2024',
            month: '1',
            day: '1',
            hour: '00',
            minute: '00',
            longitude: '', // Add longitude field
            latitude: '',  // Add latitude field
            city: '',
            nation: '',
            timezone: '',
            name: '',
            zodiac_type: "Tropic",
            sidereal_mode: null
        },
    });
    const [days, setDays] = useState(Array.from({ length: 31 }, (_, i) => (i + 1).toString()));

    const years = Array.from({ length: 125 }, (_, i) => ({
        label: (1900 + i).toString(),
        value: (1900 + i).toString(),
    }));

    const hours = Array.from({ length: 24 }, (_, i) => ({
        label: i < 10 ? '0' + i : i.toString(),
        value: i < 10 ? '0' + i : i.toString(),
    }));

    const minutes = Array.from({ length: 60 }, (_, i) => ({
        label: i < 10 ? '0' + i : i.toString(),
        value: i < 10 ? '0' + i : i.toString(),
    }));


    const isLeapYear = (year) => {
        return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
    };

    const updateDays = (month, year) => {
        let daysInMonth;
        if (month === '2') {
            daysInMonth = isLeapYear(year) ? 29 : 28;
        } else if (['4', '6', '9', '11'].includes(month)) {
            daysInMonth = 30;
        } else {
            daysInMonth = 31;
        }
        setDays(Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()));
    };

    // Handle city selection with latitude and longitude update
    const handleCitySelection = (city) => {
        setValue('city', city.name);  // Update input with city name
        setValue('latitude', city.lat);   // Store latitude
        setValue('longitude', city.lng);  // Store longitude
        setValue('timezone', city.timezone);  // Store longitude
        setValue('nation', city.nation);  // Store longitude

        // console.log(`City: ${city.name}, Latitude: ${city.lat}, Longitude: ${city.lng}`);
    };

    useEffect(() => {
        const subscription = watch(({ month, year }) => {
            updateDays(month, year);
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = async (data) => {
        const formData = {
            ...data,
        };
        //console.log('Collected data:', formData);
        // You can now handle this data (e.g., send it to your backend, navigate, etc.)
        await updateDoc(docRef, {
            subject: formData,
            updatedAt: serverTimestamp() // Update the timestamp as well
        });
        try {
            // Fetching the document using Firestore's getDoc
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(`subject docSnap.data():`);
                console.log(docSnap.data())
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        }

        const url = 'https://astrologer.p.rapidapi.com/api/v4/birth-chart';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': '861cf89b6bmsh5ee992a631165abp122b95jsn5c242c8cd7b8',
                'x-rapidapi-host': 'astrologer.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subject: {
                    name: data.name, // Use the name from the form
                    year: parseInt(data.year), // Ensure year is a number
                    month: parseInt(data.month), // Ensure month is a number
                    day: parseInt(data.day), // Ensure day is a number
                    hour: parseInt(data.hour), // Ensure hour is a number
                    minute: parseInt(data.minute), // Ensure minute is a number
                    longitude: parseFloat(data.longitude), // Ensure longitude is a number
                    latitude: parseFloat(data.latitude), // Ensure latitude is a number
                    city: data.city,
                    nation: data.nation,
                    timezone: data.timezone,
                    zodiac_type: data.zodiac_type // Use the zodiac type from the form
                }
            })
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            // console.log(`result: ${JSON.stringify(result)}`);
            setSunSign(getZodiacName(result.data.sun.sign)) <
                await updateDoc(docRef, {
                    apiInfo: result,
                    updatedAt: serverTimestamp() // Update the timestamp as well
                });

        } catch (error) {
            console.error(error);
        }
        console.log("userIDRefser", user);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second delay
        navigation.navigate('Home', { user });
    };
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <Text style={styles.header1}>Welcome to Astromedia!</Text>
                <Text style={styles.headers}>Let's get your birth chart done!</Text>

                <Text style={styles.sectionLabel}>Fecha de Nacimiento</Text>
                <View style={styles.pickerGroup}>
                    <View style={styles.pickerItem}>
                        <Text style={styles.label}>Dia</Text>
                        <Controller
                            control={control}
                            name="day"
                            render={({ field: { onChange, value } }) => (
                                <RNPickerSelect
                                    value={value}
                                    onValueChange={onChange}
                                    items={days.map((day) => ({ label: day, value: day }))}
                                    style={pickerSelectStyles}
                                />
                            )}
                        />
                    </View>

                    <View style={styles.pickerItem}>
                        <Text style={styles.label}>Mes</Text>
                        <Controller
                            control={control}
                            name="month"
                            render={({ field: { onChange, value } }) => (
                                <RNPickerSelect
                                    value={value}
                                    onValueChange={onChange}
                                    items={months}
                                    style={pickerSelectStyles}
                                />
                            )}
                        />
                    </View>

                    <View style={styles.pickerItem}>
                        <Text style={styles.label}>Año</Text>
                        <Controller
                            control={control}
                            name="year"
                            render={({ field: { onChange, value } }) => (
                                <RNPickerSelect
                                    value={value}
                                    onValueChange={onChange}
                                    items={years}
                                    style={pickerSelectStyles}
                                />
                            )}
                        />
                    </View>
                </View>

                <Text style={styles.sectionLabel}>Hora y Minuto</Text>
                <View style={styles.pickerGroup}>
                    <View style={styles.pickerItem}>
                        <Text style={styles.label}>Hora</Text>
                        <Controller
                            control={control}
                            name="hour"
                            render={({ field: { onChange, value } }) => (
                                <RNPickerSelect
                                    value={value}
                                    onValueChange={onChange}
                                    items={hours}
                                    style={pickerSelectStyles}
                                />
                            )}
                        />
                    </View>

                    <View style={styles.pickerItem}>
                        <Text style={styles.label}>Minuto</Text>
                        <Controller
                            control={control}
                            name="minute"
                            render={({ field: { onChange, value } }) => (
                                <RNPickerSelect
                                    value={value}
                                    onValueChange={onChange}
                                    items={minutes}
                                    style={pickerSelectStyles}
                                />
                            )}
                        />
                    </View>
                </View>
                <Text style={styles.sectionLabel}>Lugar de Nacimiento</Text>
                <CitySearch onCitySelected={handleCitySelection} />

                <View style={styles.buttonContainer}>
                    <Button title="Finish Onboarding" onPress={handleSubmit(onSubmit)} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: '90%',
        padding: 20,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    header1: {
        fontSize: 36,
        marginBottom: 8,
    },
    headers: {
        fontSize: 18,
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    sectionLabel: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    pickerGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
    },
    pickerItem: {
        width: '30%',
    },
    buttonContainer: {
        margin: 20,
        width: '100%',
    },
});

const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
};

export default OnboardingScreen;
